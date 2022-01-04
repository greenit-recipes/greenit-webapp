import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentField } from "components/layout/CommentField";
import { FavouriteField } from "components/layout/FavouriteField";
import { LikeComment } from "components/layout/LikeComment";
import { LikeField } from "components/layout/LikeField";
import { UserBadge } from "components/layout/UserBadge";
import { getImagePath } from "helpers/image.helper";
import { momentGreenit } from "helpers/time.helper";
import { getUuidFromId } from "helpers/user.helper";
import HTMLReactParser from "html-react-parser";
import { isEmpty } from "lodash";
import moment from "moment";
import { ADD_COMMENT_TO_RECIPE } from "pages/recipe/SinglePage/SinglePageRequest";
import React, { createRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import authService from "services/auth.service";
import * as yup from "yup";
import {
  Button,
  Container,
  Footer,
  Grid,
  Loading,
  Navbar,
} from "../../../components";
import { useRecipeQuery } from "../../../graphql";
import { partageIcon, noVideo } from "../../../icons";
import { getSecondsFromDuration } from "../../../utils";
import "./SinglePage.css";
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
  comment: yup.string().min(2, "Commentaire trop court"),
});

const RecipeSinglePage = () => {
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
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { error, loading, data } = useRecipeQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id ?? "",
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

  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

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
    <div className="flex flex-col | items-center">
      <Navbar />
      <div className="w-5/6 md:w-4/6 mb-10">
        <Container className="mt-10 md:mt-16 flex" itemsCenter>
          <div className="w-full h-auto">
            <div className="grid grid-flow-row justify-center">
              <h1 className="text-2xl md:text-5xl text-center">
                {recipe?.name}
              </h1>
              <h3 className="text-base md:text-lg mt-2 text-center">
                {
                  // @ts-ignore: Object is possibly 'null'.
                  recipe && HTMLReactParser(recipe?.textAssociate)
                }
              </h3>
              <div className="flex justify-center mt-5">
                <UserBadge
                  image={recipe?.author?.imageProfile}
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
                className="row-span-3 md:col-span-2 lg:col-span-1 h-96 min-w-64 w-64 rounded-3xl | object-cover flex justify-self-center md:justify-self-start"
              />
              <div className="col-span-1 lg:col-span-2 w-full whitespace-pre break-all flex-wrap inline-flex">
                {recipe?.tags.map((item, index) => (
                  <div
                    key={index}
                    className="m-1 mb-1 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center cursor-pointer"
                    style={{ backgroundColor: "#888888" }}
                    onClick={() => {
                      history.push(`/recipes?tags=${item.name}`);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col self-start mr-10">
                <h1 className="pb-1 text-xl md:text-2xl">Ingredients</h1>
                {/* @ts-ignore*/}
                {recipe.ingredients.map((item, index) => (
                  <h3 className="text-lg md:text-xl pt-2" key={index}>
                    {item.amount} {item.name}
                  </h3>
                ))}
              </div>
              <div className="mt-5 flex flex-col self-start">
                <h1 className="pb-1 text-xl md:text-2xl">Ustensiles</h1>
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
          <h1 className="pb-2 text-xl md:text-2xl">Description</h1>
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
          <h1 className="pt-5 pb-2 text-xl md:text-2xl">Conservation</h1>
          <p className="text-lg md:text-xl">{recipe?.expiry}</p>
        </div>
        <Grid type="col" size={{ default: 1, lg: 2 }} className="mt-10">
          <div className="h-60 md:h-80 w-auto rounded-2xl">
            {isEmpty(recipe?.videoUrl) && isEmpty(recipe?.video) ? (
              <div className="grid w-full h-full bg-white justify-items-center items-center">
                <img
                  src={noVideo}
                  className="h-60 md:h-80 object-cover rounded-lg opacity-25"
                ></img>
                <h1 className="absolute text-xs md:text-sm text-grey-600">
                  L'auteur.e n'a pas encore mis de vidéo
                </h1>
              </div>
            ) : (
              <ReactPlayer
                // @ts-ignore
                url={recipe?.video ? getImagePath(recipe?.video) : recipe?.videoUrl}
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
            <h1 className="text-xl md:text-2xl">Instructions</h1>
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
          <h1 className="pb-2 text-xl md:text-2xl">Conseils de l'auteur</h1>
          <p className="text-md lg:text-lg">{recipe?.notesFromAuthor}</p>
        </div>
        <div className="mt-8 flex flex-col">
          <p className="text-xs text-grey">
            Quelques précautions sont à prendre lors de la confection de vos
            produits. Pour chaque recette postée, nous passons du temps à les
            vérifier (et modifier si nécessaire). Toutefois, certaines personnes
            peuvent réagir différemment. Il est recommandé de tester les
            produits sur votre poignet 48 h avant l’utilisation sur votre peau.
            Greenit n’est pas responsable en cas d’allergies ou problèmes liés à
            l’exécution et application de la recette.
          </p>
        </div>
        <div className="grid justify-items-center w-full">
          <div className="grid grid-cols-2 gap-2 lg:gap-10 m-10 justify-center md:w-52">
            <div className="grid justify-items-center">
              <FavouriteField recipe={data?.recipe}></FavouriteField>
              <h1 className="text-center text-base" ref={fieldRef}>
                {" "}
                Ajouter au favoris
              </h1>
            </div>
            <button className="grid justify-items-center" onClick={copy}>
              <img
                src={partageIcon}
                className="justify-self-center w-10 h-10 lg:w-12 lg:h-12"
              />
              {!copied ? (
                <h1 className="text-center text-base"> Partager </h1>
              ) : (
                <h1 className="text-center text-base"> Lien copié ! </h1>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <h1 className="text-xl md:text-2xl">Discussion</h1>
          {recipe?.comments?.map((comment: any, index: number) => {
            // @ts-ignore
            return (
              <div className="mt-5 flex flex-col" key={index}>
                <div className="relative bg-orange bg-opacity-10 rounded-3xl px-4 py-4">
                  <UserBadge
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
  );
};
export default RecipeSinglePage;
