import React, { createRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useHistory, useLocation } from "react-router-dom";
import { useRecipeQuery } from "../../graphql";
import { Container, Grid, Footer, Loading, Navbar } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import { getSecondsFromDuration } from "../../utils";
import { isEmpty } from "lodash";
import HTMLReactParser from "html-react-parser";
import authService from "services/auth.service";
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_FAVORITE_RECIPE,
  ADD_OR_REMOVE_LIKE_RECIPE,
} from "pages/CreateRecipe/CreateRecipeRequest";

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

const RecipeSinglePage = () => {
  // @ts-ignore
  const location = useLocation<{ recipeId: string }>();
  const { recipeId } = location.state;
  const isMobile = useIsMobile();
  const history = useHistory();
  const { error, loading, data } = useRecipeQuery({
    variables: {
      id: recipeId ?? "",
    },
  });
  // Favorites
  const [isFavorite, setFavorite] = useState(
    data?.recipe?.isAddToFavoriteByCurrentUser
  );
  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE
  );

  // Like
  const [isLiked, setLiked] = useState(data?.recipe?.isLikedByCurrentUser);
  const [nbrLiked, setNbrLiked] = useState(data?.recipe?.numberOfLikes);
  const isLoggedIn = authService.isLoggedIn();
  const [addOrRemoveLikeRecipe] = useMutation(ADD_OR_REMOVE_LIKE_RECIPE);

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
    setLiked(data?.recipe?.isLikedByCurrentUser);
    setNbrLiked(data?.recipe?.numberOfLikes);

    setFavorite(data?.recipe?.isAddToFavoriteByCurrentUser);
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

  if (loading || !data) {
    return <Loading />;
  }
  const { recipe } = data;
  return (
    <div className="flex flex-col | items-center">
      <Navbar />
      <div className="w-5/6 md:w-4/6 mb-10">
        <Container
          className="mt-10 md:mt-20 flex"
          title={recipe?.name}
          itemsCenter
        >
          {isMobile ? (
            <>
              <div className="flex justify-center">
                {
                  // @ts-ignore: Object is possibly 'null'.
                  recipe && HTMLReactParser(recipe?.textAssociate)
                }
              </div>
              <div className="text-xl">nombre like === {nbrLiked}</div>
              <div>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setLiked(!isLiked);
                      // @ts-ignore: Object is possibly 'null'.
                      setNbrLiked(!isLiked ? nbrLiked + 1 : nbrLiked - 1);
                      addOrRemoveLikeRecipe({
                        variables: {
                          recipeId: recipe?.id,
                        },
                      });
                    }}
                  >
                    {isLiked ? "dislike" : "like batard"}
                  </button>
                )}
              </div>
              <div>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setFavorite(!isFavorite);
                      // @ts-ignore: Object is possibly 'null'.
                      addOrRemoveFavoriteRecipe({
                        variables: {
                          recipeId: recipe?.id,
                        },
                      });
                    }}
                  >
                    {isFavorite ? "Enlever des favoris" : "Ajouter au favoris"}
                  </button>
                )}
              </div>
              <div>
                <img
                  src={`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}
                  className="h-96 w-5/6 rounded-3xl mt-10"
                />
                <div className="w-full mt-10 whitespace-pre break-all flex-wrap inline-flex h-auto">
                  {recipe?.tags.map((item, index) => (
                    <div
                      key={index}
                      className="m-1 mb-2 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center h-8 cursor-pointer"
                      style={{ backgroundColor: "#888888" }}
                      onClick={() => {
                        history.push(`/recipes?tags=${item.name}`);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-col self-start">
                  <h3 className="pb-1 text-2xl">Ingredients</h3>
                  {recipe?.ingredients.map((item, index) => (
                    <h3 className="text-xl pt-2" key={index}>
                      {item.amount} {item.name}
                    </h3>
                  ))}
                </div>
                <div className="mt-5 flex flex-col self-start">
                  <h3 className="pb-1 text-2xl">Ustensiles</h3>
                  {recipe?.utensils.map((item, index) => (
                    <h3 className="text-xl pt-2" key={index}>
                      {item.name}
                    </h3>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-auto">
              <div className="flex justify-center">
                {
                  // @ts-ignore: Object is possibly 'null'.
                  recipe && HTMLReactParser(recipe?.textAssociate)
                }
              </div>
              <div className="text-xl">nombre like === {nbrLiked}</div>
              <div>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setLiked(!isLiked);
                      // @ts-ignore: Object is possibly 'null'.
                      setNbrLiked(!isLiked ? nbrLiked + 1 : nbrLiked - 1);
                      addOrRemoveLikeRecipe({
                        variables: {
                          recipeId: recipe?.id,
                        },
                      });
                    }}
                  >
                    {isLiked ? "dislike" : "like batard"}
                  </button>
                )}
              </div>
              <div>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setFavorite(!isFavorite);
                      // @ts-ignore: Object is possibly 'null'.
                      addOrRemoveFavoriteRecipe({
                        variables: {
                          recipeId: recipe?.id,
                        },
                      });
                    }}
                  >
                    {isFavorite ? "Enlever des favoris" : "Ajouter au favoris"}
                  </button>
                )}
              </div>
              <div className="flex flex-row">
                <img
                  src={`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}
                  className="w-1/4 rounded-3xl mt-10 self-start"
                  style={{ height: "28rem", minWidth: "320px" }}
                />
                <div className="flex flex-col ml-10 mt-10 w-full">
                  <div className="w-full whitespace-pre break-all flex-wrap inline-flex h-11">
                    {recipe?.tags.map((item, index) => (
                      <div
                        key={index}
                        className="m-1 mb-2 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center cursor-pointer"
                        style={{ backgroundColor: "#888888" }}
                        onClick={() => {
                          history.push(`/recipes?tags=${item.name}`);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row w-full mt-10">
                    <div className="mt-5 flex flex-col self-start w-1/2">
                      <h3 className="pb-1 text-2xl">Ingredients</h3>
                      {/* @ts-ignore*/}
                      {recipe.ingredients.map((item, index) => (
                        <h3 className="text-xl pt-2" key={index}>
                          {item.amount} {item.name}
                        </h3>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-col self-start">
                      <h3 className="pb-1 text-2xl">Ustensiles</h3>
                      {recipe?.utensils.map((item, index) => (
                        <h3 className="text-xl pt-2" key={index}>
                          {item.name}
                        </h3>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
        <div className="mt-10 flex flex-col">
          <h3 className="pb-2 text-2xl lg:text-3xl">Description</h3>
          {!isEmpty(recipe?.description) ? (
            <div className="text-lg lg:text-xl leading-relaxed">
              {
                // @ts-ignore: Object is possibly 'null'.
                recipe && HTMLReactParser(recipe?.description)
              }
            </div>
          ) : (
            ""
          )}
          <h3 className="pt-5 pb-2 text-2xl lg:text-3xl">Conservation</h3>
          <p className="text-lg lg:text-xl">{recipe?.expiry}</p>
        </div>
        <Grid
          type="col"
          size={{ default: 1, lg: 2 }}
          gap={isMobile ? "0" : "20"}
          className="mt-10"
        >
          <div className="h-96 w-full">
            <ReactPlayer
              url={recipe?.videoUrl}
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
          <div className="mt-10 lg:mt-0">
            <h3 className="text-2xl lg:text-3xl">Instructions</h3>
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
        <div className="pt-14 flex flex-col">
          <h3 className="pb-2 text-2xl lg:text-3xl">Conseils de l'auteur</h3>
          <p className="text-md lg:text-lg">{recipe?.notesFromAuthor}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default RecipeSinglePage;
