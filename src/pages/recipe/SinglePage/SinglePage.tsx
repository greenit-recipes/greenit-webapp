import React, { createRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useHistory, useLocation } from "react-router-dom";
import { useRecipeQuery } from "../../../graphql";
import { Container, Grid, Footer, Loading, Navbar } from "../../../components";
import useIsMobile from "../../../hooks/isMobile";
import { getSecondsFromDuration } from "../../../utils";
import { isEmpty } from "lodash";
import HTMLReactParser from "html-react-parser";
import authService from "services/auth.service";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ADD_OR_REMOVE_FAVORITE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './SinglePage.css'
import {
  ADD_COMMENT_TO_RECIPE,
  ADD_OR_REMOVE_LIKE_COMMENT,
} from "pages/recipe/SinglePage/SinglePageRequest";
import { getImagePath } from "helpers/image.helper";
import { getUuidFromId } from "helpers/user.helper";
import moment from "moment";
import { momentGreenit } from "helpers/time.helper";
import { LikeField } from "components/layout/LikeField";
import { FavouriteField } from "components/layout/FavouriteField";
import { CommentField } from "components/layout/CommentField";
import { UserBadge } from "components/layout/UserBadge";
import  {shareIcon } from "../../../icons"

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

const schema = yup.object().shape({});

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

  // @ts-ignore
  const location = useLocation<{ recipeId: string }>();
  const recipeId = location.state?.recipeId;
  const isMobile = useIsMobile();
  const history = useHistory();
  const { error, loading, data } = useRecipeQuery({
    variables: {
      id: recipeId ?? "",
    },
  });

  const [addOrRemoveLikeComment] = useMutation(ADD_OR_REMOVE_LIKE_COMMENT);

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
              <div className="flex mt-4 justify-center">
                <UserBadge recipe={data?.recipe}></UserBadge>
                <LikeField
                  recipe={data?.recipe}
                  isRecipeCard={false}
                ></LikeField>
                <CommentField>{nbrComment}</CommentField>
              </div>
            </div>
            <Grid
              type="col"
              size={{ default: 1, lg: 2 }}
              className="gap-2 md:gap-10 mt-4"
            >
              <div className="flex justify-center">
                <img
                  // @ts-ignore
                  src={getImagePath(recipe?.image)}
                  className="h-96 rounded-3xl"
                />
              </div>
              <div className="w-full whitespace-pre break-all flex-wrap inline-flex h-11">
                {recipe?.tags.map((item, index) => (
                  <div
                    key={index}
                    className="m-1 mt-2 bg-black text-white pl-3 pr-3 text-md rounded flex items-center cursor-pointer"
                    style={{ backgroundColor: "#888888" }}
                    onClick={() => {
                      history.push(`/recipes?tags=${item.name}`);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="flex flex-col self-start mt-5">
                <h1 className="pb-1 text-xl md:text-2xl">Ingredients</h1>
                {/* @ts-ignore*/}
                {recipe?.ingredients?.map((item, index) => (
                  <h3 className="text-lg md:text-xl pt-2" key={index}>
                    {item.amount} {item.name}
                  </h3>
                ))}
              </div>
              <div className="flex flex-col self-start mt-5">
                <h1 className="pb-1 text-xl md:text-2xl">Ustensiles</h1>
                {recipe?.utensils?.map((item, index) => (
                  <h3 className="text-lg md:text-xl pt-2" key={index}>
                    {item.name}
                  </h3>
                ))}
              </div>
            </Grid>
          </div>
        </Container>
        <div className="mt-10 flex flex-col">
          <h1 className="pb-2 text-xl md:text-2xl">Description</h1>
          {!isEmpty(recipe?.description) ? (
            <div className="text-lg md:text-xl md:text-xl leading-relaxed">
              {
                // @ts-ignore: Object is possibly 'null'.
                recipe && HTMLReactParser(recipe?.description)
              }
            </div>
          ) : (
            ""
          )}
          <h1 className="pt-5 pb-2 text-xl md:text-2xl">Conservation</h1>
          <p className="text-lg lg:text-xl">{recipe?.expiry}</p>
        </div>
        <Grid
          type="col"
          size={{ default: 1, lg: 2 }}
          className="mt-10"
        >
          <div className="h-60 md:h-80 w-auto rounded-2xl">
            <ReactPlayer
              // @ts-ignore
              url={recipe?.videoUrl}
              className='react-player'
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
          </div>
          <div className="mt-5 lg:mt-0">
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
        <div className="grid justify-center w-full">
          <div className="grid grid-cols-2 gap-2 m-10 justify-center">
            <div className="grid">
              <FavouriteField recipe={data?.recipe}></FavouriteField>
              <h1 className="text-center text-base"> Ajouter au favoris</h1>
            </div>
            <div className="grid">
              <img src={shareIcon} className="grid justify-self-center w-9 h-9 lg:w-12 lg:h-12"/>
              <h1 className="text-center text-base"> Partager </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <h1 className="text-xl md:text-2xl">Discussion</h1>
          {recipe?.comments?.map((comment: any, index: number) => {
            // @ts-ignore
            const canLike = comment?.author?.id !== getUuidFromId(data?.me?.id);
            return (
              <div className="mt-5 flex flex-col" key={index}>
                <img
                  src={getImagePath(comment?.author?.imageProfile)}
                  className="w-1/4 rounded-3xl self-start"
                  style={{ height: "4rem", width: "4rem", minWidth: "20px" }}
                />
                <p className="text-md lg:text-lg">
                  Par: {comment?.author?.username}
                </p>

                <p className="text-md lg:text-lg">
                  Commentaire: {comment?.comment}
                </p>
                <p className="text-md lg:text-lg">
                  Date de publication: {momentGreenit(comment?.createdAt)}
                </p>
                <p className="text-md lg:text-lg">
                  Nombre de like par commentaire: {comment?.numberOfLikes}
                </p>
                {isLoggedIn ? (
                  // @ts-ignore
                  canLike && (
                    <button
                      className="text-md lg:text-lg"
                      onClick={() => {
                        addOrRemoveLikeComment({
                          variables: {
                            commentId: comment?.id,
                          },
                        });
                      }}
                    >
                      Like moi grand fou
                    </button>
                  )
                ) : (
                  <Link to="/connexion">
                    <h1>Like (pas connecté à changer a la place de l'icon)</h1>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nom de la recette
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              placeholder="comment"
              type="text"
              {...register("comment")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {isLoggedIn ? (
              <button
                className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Envoyer le commentaire
              </button>
            ) : (
              <button
                className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Se connecter pour envoyer un commentaire (rajouter le lien)
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default RecipeSinglePage;
