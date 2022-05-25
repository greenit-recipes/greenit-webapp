import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button, Footer, Loading, Navbar } from "components";
import { FavouriteField } from "components/layout/FavouriteField";
import { LikeComment } from "components/layout/LikeComment";
import { MadeRecipe } from "components/layout/MadeRecipe";
import Modal from "components/layout/Modal/Modal";
import { UserBadge } from "components/layout/UserBadge";
import { getImagePath } from "helpers/image.helper";
import { getObjectSession } from "helpers/session-helper";
import { momentGreenit } from "helpers/time.helper";
import { getUuidFromId } from "helpers/user.helper";
import useIsMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import { isEmpty } from "lodash";
import moment from "moment";
import { IngredientUsentil } from "pages/recipe/SinglePage/IngredientUsentil/IngredientUsentil";
import { Instruction } from "pages/recipe/SinglePage/Instructions/Instructions";
import { ModalKpi } from "pages/recipe/SinglePage/modalKpi/modalKpi";
import { checkUserAlreadyViewRecipe } from "pages/recipe/SinglePage/SinglePage-helper";
import { HelmetRecipe } from "pages/recipe/SinglePage/SinglePageHelmet";
import { ADD_COMMENT_TO_RECIPE } from "pages/recipe/SinglePage/SinglePageRequest";
import React, { createRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTimeFive } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { IoEarthOutline, IoFlaskOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import ReactPlayer from "react-player/lazy";
import { useHistory, useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import authService from "services/auth.service";
import * as yup from "yup";
import { useRecipeQuery } from "../../../graphql";
import { noVideo, retourIcon } from "../../../icons";
import { getSecondsFromDuration } from "../../../utils";
import { CircleGreenit } from "./CircleGreenit/CircleGreenit";
import { HeaderRecipe } from "./HeaderRecipe/HeaderRecipe";
import { SimilarRecipe } from "./SimilarRecipe/SimilarRecipe";
import "./SinglePage.css";

const ModalLogGreenit = React.lazy(() => import("components/layout/ModalLogGreenit/ModalLogGreenit"));

const closest = (needle: number, haystack: any[]) => {
  return haystack.reduce((r: any, b: any) => {
    let aDiff = Math.abs(r - needle);
    let bDiff = Math.abs(b - needle);
    if (aDiff === bDiff) {
      return r > b ? r : b;
    } else {
      return bDiff < aDiff ? b : r;
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

  const [showModal, setShowModal] = useState(false);
  // @ts-ignore
  const [typeModal, setTypeModal] = useState<"plastic" | "money" | "substance">(null);
  const [numberModal, setNumberModal] = useState(0);

  // Comments
  const [addCommentToRecipe] = useMutation(ADD_COMMENT_TO_RECIPE);
  const [nbrComment, setNbrComment] = useState(data?.recipe?.numberOfComments);
  const [sizeCretorHeader, setSizeCretorHeader] = useState(0);

  const isLoggedIn = authService.isLoggedIn();
  const [videoDuration, setVideoDuration] = useState<number>(0);

  useEffect(() => {
    setNbrComment(data?.recipe?.numberOfComments);
    checkUserAlreadyViewRecipe(data?.recipe?.id);
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

  const isMobile = useIsMobile();

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
      <HelmetRecipe recipe={recipe} />
      <div className="flex flex-col | items-center">
        <Navbar />
        <div
          className="absolute left-0 z-20 grid w-8 h-8 ml-3 rounded-full cursor-pointer top-14 lg:w-14 lg:h-14 lg:p-2 lg:top-24 lg:ml-8 lg:bg-white lg:shadow-md"
          onClick={() => {
            if (getObjectSession("pathname")) history.goBack(); // need to have previous path
            else history.push(RouteName.recipes);
          }}
        >
          <img alt="Retour icon" loading="lazy" src={retourIcon} />
        </div>
        <HeaderRecipe
          parentFcn={setSizeCretorHeader}
          recipe={recipe}
          className=""
        />
        <div
          className="w-full flex flex-col | items-center pt-10 z-20 bg-white rounded-singlePage"
          style={{ marginTop: sizeCretorHeader / 16 - 9 + "rem" }}
        >
          <div className="w-5/6 mb-10 lg:w-4/6">
            <div className="w-full h-auto">
              <div className="justify-center">
                <h1 className="mb-5 text-xl text-center lg:text-2xl fontQSsemibold">
                  {recipe?.name}
                </h1>
                <div className="flex items-center justify-center mb-10">
                  <FavouriteField
                    isToltipActif={false}
                    isRecipePage={true}
                    isBtnDesing={true}
                    customClassName="flex w-28"
                    recipe={data?.recipe}
                  ></FavouriteField>
                  <MadeRecipe
                    customClassName="ml-3 lg:ml-10"
                    recipe={data?.recipe}
                  />
                  <div className="flex h-10 ml-3 lg:ml-10 w-28 btn-single-page">
                    <RWebShare
                      data={{
                        text: recipe?.titleSeo,
                        url: window.location.href,
                        title: recipe?.name,
                      }}
                    >
                      <button
                        className="flex items-center justify-center"
                        id="shared-recipe"
                      >
                        <RiShareForwardLine
                          id="shared-recipe"
                          className="ml-1 justify-self-center w-7 h-7"
                        />
                        <h2 id="shared-recipe" className="ml-2 text-center">
                          {" "}
                          partage{" "}
                        </h2>
                      </button>
                    </RWebShare>
                  </div>
                </div>
              </div>
              <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
              >
                <ModalKpi substances={recipe?.substances} nameKpi={typeModal} number={numberModal}></ModalKpi>
              </Modal>
              {!isMobile && (
                <div className="flex items-center justify-center mt-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setTypeModal("substance");
                      setNumberModal(recipe?.substances?.length || 0);
                      setShowModal(true);
                    }}
                  >
                    <CircleGreenit
                      colorCircle="bg-orange"
                      icon={
                        <IoFlaskOutline className="absolute w-8 h-8 icon-position-circle rotate-singlePage-chimie" />
                      }
                      symbol=""
                      number={recipe?.substances?.length}
                      text="Substances épargnées"
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setTypeModal("money");
                      setNumberModal(recipe?.moneySaved || 0);
                      setShowModal(true);
                    }}
                  >
                    <CircleGreenit
                      colorCircle="bg-yellow"
                      icon={
                        <BsWallet2 className="absolute h-7 w-7 icon-position-circle rotate-singlePage-wallet" />
                      }
                      customClassName="ml-16"
                      symbol="€"
                      number={recipe?.moneySaved}
                      text="Argent économisé"
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setTypeModal("plastic");
                      setNumberModal(recipe?.plasticSaved || 0);
                      setShowModal(true);
                    }}
                  >
                    <CircleGreenit
                      colorCircle="bg-green"
                      icon={
                        <IoEarthOutline className="absolute w-8 h-8 icon-position-circle" />
                      }
                      customClassName="ml-16"
                      symbol="g"
                      number={recipe?.plasticSaved}
                      text="Plastiques évités"
                    />
                  </div>
                </div>
              )}
              {/* Description + image */}
              <div className="flex flex-col mt-8 lg:flex-row md">
                <img
                  // @ts-ignore
                  src={getImagePath(recipe?.image)}
                  alt={recipe?.name}
                  loading="lazy"
                  className="object-cover h-64 m-auto w-52 lg:w-64 lg:h-80 rounded-3xl"
                />
                {isMobile && (
                  <div className="flex items-center justify-center mt-8">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setTypeModal("substance");
                        setNumberModal(recipe?.substances?.length || 0);
                        setShowModal(true);
                      }}
                    >
                      <CircleGreenit
                        colorCircle="bg-orange"
                        icon={
                          <IoFlaskOutline className="absolute w-6 h-6 icon-position-circle-mobile rotate-singlePage-chimie" />
                        }
                        symbol=""
                        number={recipe?.substances?.length}
                        text="Substances épargnées"
                      />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setTypeModal("money");
                        setNumberModal(recipe?.moneySaved || 0);
                        setShowModal(true);
                      }}
                    >
                      <CircleGreenit
                        colorCircle="bg-yellow"
                        icon={
                          <BsWallet2 className="absolute w-6 h-6 icon-position-circle-mobile rotate-singlePage-wallet" />
                        }
                        customClassName="ml-16"
                        symbol="€"
                        number={recipe?.moneySaved}
                        text="Argent économisé"
                      />
                    </div>{" "}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setTypeModal("plastic");
                        setNumberModal(recipe?.plasticSaved || 0);
                        setShowModal(true);
                      }}
                    >
                      <CircleGreenit
                        colorCircle="bg-green"
                        icon={
                          <IoEarthOutline className="absolute w-6 h-6 icon-position-circle-mobile" />
                        }
                        customClassName="ml-16"
                        symbol="g"
                        number={recipe?.plasticSaved}
                        text="Plastiques évités"
                      />
                    </div>
                  </div>
                )}
                {isMobile && <h2 className="mt-8 text-xl">Description</h2>}

                <div className="flex flex-col mt-5 lg:ml-12">
                  {!isEmpty(recipe?.description) ? (
                    <div className="w-full lg:w-5/6">
                      {
                        // @ts-ignore: Object is possibly 'null'.
                        recipe && HTMLReactParser(recipe?.description)
                      }
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pt-5 pb-2 fontQSemibold ">Conservation</div>
                  <p>{recipe?.expiry}</p>
                  <div className="flex mt-6 black">
                    <div className="h-16">
                      <div className="mt-1 mb-1 text-center"> Temps</div>
                      <div className="flex items-center justify-center">
                        <BiTimeFive className="w-6 h-6 mr-2" />
                        <div>{recipe?.duration} m</div>
                      </div>
                    </div>
                    <div
                      className="
                  px-1.5 h-16 ml-6"
                    >
                      <div className="mt-1 mb-1 text-center"> Prix</div>
                      <div className="flex items-center justify-center">
                        <GrMoney className="w-6 h-6 mr-2" />
                        <div>
                          {recipe?.priceMin} € - {recipe?.priceMax} €
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <IngredientUsentil recipe={recipe} />
            <div className="flex flex-col w-full h-full lg:flex-row">
              {isMobile && (
                <>
                  <h2 className="text-xl">Instructions</h2>
                  <h3 className="mb-5 text-xs">
                    ⤹ Clique sur les numéros pour faire avancer la vidéo
                  </h3>{" "}
                </>
              )}
              <div className="h-60 lg:h-96 lg:w-2/6 rounded-2xl">
                {isEmpty(recipe?.videoUrl) && isEmpty(recipe?.video) ? (
                  <div className="grid items-center w-full h-full bg-white justify-items-center">
                    <img
                      src={noVideo}
                      loading="lazy"
                      alt={"Pas de vidéo"}
                      className="object-cover rounded-lg h-60 lg:h-80"
                    ></img>
                  </div>
                ) : (
                    //@ts-ignore
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
              {isMobile && (
                <div className={`flex flex-wrap justify-center`}>
                  {recipe?.instructions.map((item: any, index: number) => {
                    const timestamp = getSecondsFromDuration(item.timestamp);
                    const time = closest(
                      videoDuration,
                      recipe.instructions.map((item: any) => {
                        return getSecondsFromDuration(item.timestamp);
                      })
                    );
                    return (
                      <div
                        key={index}
                        className={`flex cursor-pointer mt-5 ${
                          time > timestamp ? "opacity-in" : "opacity-out"
                        }`}
                        onClick={() => {
                          setVideoDuration(timestamp);
                          player.current?.seekTo(timestamp);
                          player.current?.getInternalPlayer().playVideo();
                        }}
                      >
                        <div
                          className={`h-10 text-xl mr-5 w-10 rounded-full inline-flex items-center justify-center bg-greyL`}
                          style={{ minWidth: "2.5rem" }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="lg:ml-10 lg:w-4/6">
                {!isMobile && (
                  <>
                    <h2 className="text-xl lg:text-2xl">Instructions</h2>
                    <h3 className="text-xs lg:text-sm">
                      ⤹ Clique sur les numéros pour faire avancer la vidéo
                    </h3>{" "}
                  </>
                )}
                {recipe?.instructions.map((item: any, index: number) => {
                  const timestamp = getSecondsFromDuration(item.timestamp);
                  const time = closest(
                    videoDuration,
                    recipe.instructions.map((item: any) => {
                      return getSecondsFromDuration(item.timestamp);
                    })
                  );
                  return (
                    <div
                      key={index}
                      className={`flex cursor-pointer ${
                        isMobile && time > timestamp ? "hidden" : ""
                      }`}
                      onClick={() => {
                        setVideoDuration(timestamp);
                        player.current?.seekTo(timestamp);
                        player.current?.getInternalPlayer().playVideo();
                      }}
                    >
                      <div className={`mt-5 flex inline-flex `}>
                        <Instruction
                          index={index + 1}
                          text={`${item.content}`}
                          isSelected={time > timestamp}
                          isHighlighted={time === timestamp}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <h2 className="pb-2 text-xl lg:text-2xl">Conseils de l'auteur</h2>
              <p className="text-md lg:text-lg">{recipe?.notesFromAuthor}</p>
            </div>
            <div className="flex flex-col mt-8">
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
            {recipe && (
              <div className="flex flex-col mt-6 mb-5">
                <h2 className="text-xl lg:text-2xl">Recettes similaires</h2>
                <SimilarRecipe data={recipe}></SimilarRecipe>
              </div>
            )}
            <div className="flex flex-col mt-6" ref={fieldRef}>
              <h2 className="text-xl lg:text-2xl">Discussion</h2>
              {recipe?.comments?.map((comment: any, index: number) => {
                // @ts-ignore
                return (
                  <div className="flex flex-col mt-3" key={index}>
                    <div className="relative p-4 bg-orange bg-opacity-10 rounded-xl">
                      <UserBadge
                        facebookImg={comment?.author?.photoUrl}
                        isSinglePage={true}
                        image={comment?.author?.imageProfile}
                        name={comment?.author?.username}
                        className="mb-2"
                      ></UserBadge>
                      {comment?.author?.id === recipe?.author?.id && (
                        <div> (créateur de la recette) </div>
                      )}
                      <div className="text-md">
                        <h3 className=""> {comment?.comment} </h3>
                      </div>
                      <h3 className="absolute top-0 right-0 m-6 | ">
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
              className="p-4 mt-10 mb-4 filter drop-shadow-xl rounded-xl bg-blue bg-opacity-10"
              // @ts-ignore
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 lg:text-lg">
                  Partage tes retours et tes astuces !
                </label>
              </div>
              <div className="flex items-center justify-between">
                {isLoggedIn ? (
                  <div className="w-full mb-4">
                    <textarea
                      className="w-full p-4 mb-4 leading-tight text-gray-700 rounded appearance-none sm:w-3/4 focus:outline-none focus:shadow-outline"
                      id="comment"
                      placeholder="Commentaire"
                      {...register("comment")}
                    ></textarea>
                    <p className="text-xs italic text-red-500">
                      {errors.comment?.message}
                    </p>

                    <Button
                      className="w-24 rounded focus:outline-none focus:shadow-outline"
                      type="blue"
                    >
                      Publier
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </form>
            {!isLoggedIn && (
              <ModalLogGreenit
                btn={
                  <Button
                    className="rounded focus:outline-none focus:shadow-outline w-52"
                    type="blue"
                  >
                    Se connecter pour discuter
                  </Button>
                }
              ></ModalLogGreenit>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default RecipeSinglePage;
