import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentField } from "components/layout/CommentField";
import { FavouriteField } from "components/layout/FavouriteField";
import { LikeComment } from "components/layout/LikeComment";
import { LikeField } from "components/layout/LikeField";
import { UserBadge } from "components/layout/UserBadge";
import { getImagePath } from "helpers/image.helper";
import { momentGreenit, momentGreenitUs } from "helpers/time.helper";
import { getUuidFromId } from "helpers/user.helper";
import HTMLReactParser from "html-react-parser";
import { isEmpty, map } from "lodash";
import moment from "moment";
import { ADD_COMMENT_TO_RECIPE } from "pages/recipe/SinglePage/SinglePageRequest";
import React, { createRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import authService from "services/auth.service";
import { SimilarRecipe } from "./SimilarRecipe/SimilarRecipe";
import * as yup from "yup";
import { Button, Container, Footer, Grid, Loading, Navbar } from "components";
import { useRecipeQuery } from "../../../graphql";
import { noVideo, partageIcon, retourIcon } from "../../../icons";
import { getSecondsFromDuration } from "../../../utils";
import "./SinglePage.css";
import { RWebShare } from "react-web-share";
import { checkUserAlreadyViewReipe } from "pages/recipe/SinglePage/SinglePage-helper";
import { RouteName } from "App";

interface InstructionProps {
  index: number;
  text: string;
  isHighlighted: boolean;
}
const Instruction: React.FC<InstructionProps> = ({
  index,
  text,
  isHighlighted,
}) => {
  return (
    <div className="mt-5 flex inline-flex">
      <div
        className={`h-10 text-xl mr-5 rounded-full inline-flex items-center justify-center ${
          isHighlighted ? "text-white bg-black" : "text-black bg-gray-200"
        }`}
        style={{ minWidth: "2.5rem" }}
      >
        {index}
      </div>
      <h3 className="text-lg lg:text-xl">{text}</h3>
    </div>
  );
};

const closest = (needle: number, haystack: any[]) => {
  return haystack.reduce((a: any, b: any) => {
    let aDiff = Math.abs(a - needle);
    let bDiff = Math.abs(b - needle);
    if (aDiff === bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
};

const schema = yup.object().shape({
  comment: yup.string().min(2, "Commentaire trop court."),
});

const RecipeSinglePage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const { name } = useParams<{ name: string }>();

  const { error, loading, data } = useRecipeQuery({
    fetchPolicy: "no-cache",
    variables: {
      urlId: name,
    },
  });

  // Comments
  const [addCommentToRecipe] = useMutation(ADD_COMMENT_TO_RECIPE);
  const [nbrComment, setNbrComment] = useState(data?.recipe?.numberOfComments);

  const isLoggedIn = authService.isLoggedIn();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    setNbrComment(data?.recipe?.numberOfComments);
    checkUserAlreadyViewReipe(data?.recipe?.id)
  }, [data]);

  const player = createRef<ReactPlayer>();
  const getPlayer = () => {
    return player;
  };

  const scrollIntoComment = () => {
    if (!fieldRef) return;
    // @ts-ignore
    fieldRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeoutID = window.setInterval(() => {
      setVideoDuration(getPlayer().current?.getCurrentTime() ?? 0);
    }, 2000);
    return () => window.clearInterval(timeoutID);
  }, [getPlayer]);

  const onSubmitHandler = (dataForm: { comment: string }) => {
    const newCommentAddedByCurrentUser = {
      comment: dataForm?.comment,
      numberOfLikes: 0,
      createdAt: moment().locale("fr"),
      isNewComment: true,
      author: {
        // @ts-ignore
        id: getUuidFromId(data?.me?.id),
        imageProfile: data?.me?.imageProfile,
        username: data?.me?.username,
      },
    };
    // @ts-ignore
    recipe?.comments?.unshift(newCommentAddedByCurrentUser);
    // @ts-ignore: Object is possibly 'null'.
    setNbrComment(nbrComment + 1);
    addCommentToRecipe({
      variables: {
        recipeId: data?.recipe?.id,
        comment: dataForm?.comment,
      },
    }).then(() => {
      // @ts-ignore
      scrollIntoComment();
      reset();
    });
  };

  if (loading || !data) {
    return <Loading />;
  }
  const { recipe } = data;
  return (
    <>
      <Helmet>
        <title>{data?.recipe?.titleSeo}</title>
        <meta name="description" content={data?.recipe?.metaDescriptionSeo} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Recipe",
            name: recipe?.name,
            image: [getImagePath(recipe?.image)],
            author: {
              "@type": "Person",
              name: recipe?.author?.username,
            },
            datePublished: momentGreenitUs(recipe?.createdAt),
            description: recipe?.description
              ?.replace(/<\/?[^>]+(>|$)/g, "")
              .replace(/\n/g, " ")
              .replace(/\r/g, ""),
            totalTime: "PT" + recipe?.duration + "M",
            recipeCuisine: "Diy",
            recipeCategory: "Diy",
            keywords: "Recette " + recipe?.name + " diy",
            recipeYield: "1",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "18",
            },
            recipeIngredient: map(recipe?.ingredients, (x) => {
              return x.amount + " " + x.name;
            }),
            recipeInstructions: map(recipe?.instructions, (x) => {
              return { "@type": "HowToStep", text: x.content };
            }),
          })}
        </script>
      </Helmet>
      <body>
        <div className="flex flex-col | items-center">
          <Navbar />
          <div
            className="grid absolute cursor-pointer rounded-full left-0 top-14 w-8 h-8 z-20 ml-3 | lg:w-14 lg:h-14 lg:p-2 lg:top-24 lg:ml-8 lg:bg-white lg:shadow-md"
            onClick={() => history.goBack()}
          >
            <img alt="Retour icon" src={retourIcon} />
          </div>
          <div className="w-5/6 md:w-4/6 mb-10">
            <Container className="mt-10 md:mt-8 flex" itemsCenter>
              <div className="w-full h-auto">
                <div className="grid grid-flow-row justify-center">
                  <h1 className="text-2xl md:text-4xl text-center font-medium">
                    {recipe?.name}
                  </h1>
                  <h3 className="text-base md:text-lg text-center">
                    {
                      // @ts-ignore: Object is possibly 'null'.
                      recipe && HTMLReactParser(recipe?.textAssociate)
                    }
                  </h3>
                  <div className="flex justify-center mt-5">
                    <UserBadge
                      image={recipe?.author?.imageProfile}
                      // @ts-ignore
                      facebookImg={recipe?.author?.photoUrl}
                      name={recipe?.author?.username}
                    ></UserBadge>
                    <LikeField
                      recipe={data?.recipe}
                      isRecipeCard={false}
                    ></LikeField>
                    <CommentField
                      // @ts-ignore
                      parentFunction={scrollIntoComment}
                    >
                      {nbrComment}
                    </CommentField>
                  </div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row auto-rows-max md:grid-cols-3 gap-6 mt-8">
                  <img
                    // @ts-ignore
                    src={getImagePath(recipe?.image)}
                    alt={recipe?.name}
                    loading="lazy"
                    className="row-span-3 md:col-span-2 lg:col-span-1 h-96 min-w-64 w-64 rounded-3xl | object-cover flex justify-self-center md:justify-self-start"
                  />
                  <div className="col-span-1 lg:col-span-2 w-full whitespace-pre break-all flex-wrap inline-flex">
                    {recipe?.tags.map((item, index) => (
                      <div
                        key={index}
                        className="m-1 mb-1 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center cursor-pointer"
                        style={{ backgroundColor: "#888888" }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col self-start mr-10">
                    <h2 className="pb-1 text-xl md:text-2xl">Ingredients</h2>
                    {/* @ts-ignore*/}
                    {recipe.ingredients.map((item, index) => (
                      <h3 className="text-lg md:text-xl pt-2" key={index}>
                        {item.amount} {item.name}
                      </h3>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-col self-start">
                    <h2 className="pb-1 text-xl md:text-2xl">Ustensiles</h2>
                    {recipe?.utensils.map((item, index) => (
                      <h3 className="text-lg md:text-xl pt-2" key={index}>
                        {item.name}
                      </h3>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
            <div className="mt-10 flex flex-col">
              <h2 className="pb-2 text-xl md:text-2xl">Description</h2>
              {!isEmpty(recipe?.description) ? (
                <div className="text-lg md:text-xl leading-relaxed">
                  {
                    // @ts-ignore: Object is possibly 'null'.
                    recipe && HTMLReactParser(recipe?.description)
                  }
                </div>
              ) : (
                ""
              )}
              <h2 className="pt-5 pb-2 text-xl md:text-2xl">Conservation</h2>
              <p className="text-lg md:text-xl">{recipe?.expiry}</p>
            </div>
            <Grid type="col" size={{ default: 1, lg: 2 }} className="mt-10">
              <div className="h-60 md:h-80 w-auto rounded-2xl">
                {isEmpty(recipe?.videoUrl) && isEmpty(recipe?.video) ? (
                  <div className="grid w-full h-full bg-white justify-items-center items-center">
                    <img
                      src={noVideo}
                      alt={"Pas de vidéo"}
                      className="h-60 md:h-80 object-cover rounded-lg"
                    ></img>
                  </div>
                ) : (
                  <ReactPlayer
                    // @ts-ignore
                    url={
                      recipe?.video
                        ? getImagePath(recipe?.video)
                        : recipe?.videoUrl
                    }
                    className="react-player"
                    controls={true}
                    ref={player}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1, rel: 0 },
                      },
                    }}
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
              <div className="mt-5 lg:mt-0 md:ml-10">
                <h2 className="text-xl md:text-2xl">Instructions</h2>
                <h3 className="text-xs md:text-sm">
                  ⤹ Clique sur les numéros pour faire avancer la vidéo
                </h3>
                {recipe?.instructions.map((item: any, index: number) => {
                  const timestamp = getSecondsFromDuration(item.timestamp);
                  return (
                    <div
                      key={index}
                      className="flex flex-col cursor-pointer"
                      onClick={() => {
                        setVideoDuration(timestamp);
                        player.current?.seekTo(timestamp);
                        player.current?.getInternalPlayer().playVideo();
                      }}
                    >
                      <Instruction
                        index={index + 1}
                        text={`${item.content}`}
                        isHighlighted={
                          closest(
                            videoDuration,
                            recipe.instructions.map((item: any) => {
                              return getSecondsFromDuration(item.timestamp);
                            })
                          ) === timestamp
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </Grid>
            <div className="mt-8 flex flex-col">
              <h2 className="pb-2 text-xl md:text-2xl">Conseils de l'auteur</h2>
              <p className="text-md lg:text-lg">{recipe?.notesFromAuthor}</p>
            </div>
            <div className="mt-8 flex flex-col">
              <p className="text-xs text-grey">
                Quelques précautions sont à prendre lors de la confection de vos
                produits. Pour chaque recette postée, nous passons du temps à
                les vérifier (et modifier si nécessaire). Toutefois, certaines
                personnes peuvent réagir différemment. Il est recommandé de
                tester les produits sur votre poignet 48 h avant l’utilisation
                sur votre peau. Greenit n’est pas responsable en cas d’allergies
                ou problèmes liés à l’exécution et application de la recette.
              </p>
            </div>
            <div className="grid justify-items-center w-full">
              <div className="grid grid-cols-2 gap-2 lg:gap-10 m-10 justify-items-center w-2/3 md:w-80">
                <div className="grid justify-items-center">
                  <FavouriteField recipe={data?.recipe}></FavouriteField>
                  <h2 className="text-center text-base" ref={fieldRef}>
                    {" "}
                    Ajouter au favoris
                  </h2>
                </div>
                <div>
                  <RWebShare
                    data={{
                      text: recipe?.titleSeo,
                      url: window.location.href,
                      title: recipe?.name,
                    }}
                  >
                    <button className="grid justify-items-center"
                                            id="shared-recipe"                                            >
                      <img
                        src={partageIcon}
                        alt="Partager"
                        loading="lazy"
                        className="justify-self-center w-10 h-10 lg:w-12 lg:h-12"
                      />
                      <h2 className="text-center text-base"> Partager </h2>
                    </button>
                  </RWebShare>
                </div>
              </div>
            </div>
            {recipe && (
              <div className="mt-6 flex flex-col mb-5">
                <h2 className="text-xl md:text-2xl">Recettes similaires</h2>
                <SimilarRecipe data={recipe}></SimilarRecipe>
              </div>
            )}
            <div className="mt-6 flex flex-col">
              <h2 className="text-xl md:text-2xl">Discussion</h2>
              {recipe?.comments?.map((comment: any, index: number) => {
                // @ts-ignore
                return (
                  <div className="mt-3 flex flex-col" key={index}>
                    <div className="relative bg-orange bg-opacity-10 rounded-xl p-4">
                      <UserBadge
                        facebookImg={comment?.author?.photoUrl}
                        image={comment?.author?.imageProfile}
                        name={comment?.author?.username}
                        className="mb-2"
                      ></UserBadge>
                      {comment?.author?.id === recipe?.author?.id && (
                        <div> (créateur de la recette) </div>
                      )}
                      <div className="text-md lg:text-lg">
                        <h3 className="text-base"> {comment?.comment} </h3>
                      </div>
                      <h3 className="absolute top-0 right-0 m-6 | text-base">
                        {momentGreenit(comment?.createdAt)}
                      </h3>
                      <div className="absolute -bottom-1 -right-1">
                        {/* @ts-ignore */}
                        <LikeComment
                          isMyComment={
                            // @ts-ignore
                            getUuidFromId(data?.me?.id) === comment?.author?.id
                          }
                          comment={comment}
                        ></LikeComment>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form
              className="filter drop-shadow-xl rounded-xl bg-blue bg-opacity-10 p-4 mb-4 mt-10"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-base md:text-lg mb-2">
                  Partage tes retours et tes astuces !
                </label>
              </div>
              <div className="flex items-center justify-between">
                {isLoggedIn ? (
                  <div className="mb-4 w-full">
                    <textarea
                      className="appearance-none rounded w-full sm:w-3/4 mb-4 p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="comment"
                      placeholder="Commentaire"
                      {...register("comment")}
                    ></textarea>
                    <p className="text-red-500 text-xs italic">
                      {errors.comment?.message}
                    </p>

                    <Button
                      className="w-24 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Publier
                    </Button>
                  </div>
                ) : (
                  <Link to={RouteName.register}>
                    <Button
                      className="rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Se connecter pour discuter
                    </Button>
                  </Link>
                )}
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </body>
    </>
  );
};
export default RecipeSinglePage;
