import { Footer, Navbar, RecipeCard } from "components";
import useIsMobile from "hooks/isMobile";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import { getSecondsFromDuration } from "utils";
import { tutoFullXpBeginner } from "pages/Profil/TutoFullXpBeginner/tutoFullXpBeginnerHelper";
import { Instruction } from "pages/recipe/SinglePage/Instructions/Instructions";
import { createRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";
import Modal from "components/layout/Modal/Modal";
import ModalHelp from "components/layout/modalHelp";

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

const TutoFullXpBeginner = () => {
  const isMobile = useIsMobile();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const player = createRef<ReactPlayer>();
  const getPlayer = () => {
    return player;
  };

  const [showModalHelp, setShowModalHelp] = useState(false);
  const [showModalSos, setShowModalSos] = useState(false);

  useEffect(() => {
    const timeoutID = window.setInterval(() => {
      setVideoDuration(getPlayer().current?.getCurrentTime() ?? 0);
    }, 2000);
    return () => window.clearInterval(timeoutID);
  }, [getPlayer]);

  return (
    <div>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-start lg:pl-32">
        <div>
          <div className="flex flex-col justify-between lg:ml-0 mt-4">
            <h1 className="text-2xl font-medium text-center w-3/5 lg:w-full lg:text-left m-auto">
              C’est le moment de tambouiller !
            </h1>
            <p className="text-center lg:text-left mt-4">
              Clique sur les recettes pour commencer !
            </p>
          </div>
          <div className="flex flex-wrap justify-center mt-6">
            {recipesBegginerFullXp.map((recipe, index) => (
              <RecipeCard
                disabledFavoriteRecipe={true}
                isLikeDisabled={true}
                recipe={recipe}
                key={recipe?.name}
              />
            ))}
          </div>
        </div>

        {!isMobile && (
          <div className="flex ml-20">
            <button
              className={`btn-single-page justify-center mt-2 mb-4 p-2 h-10 flex w-62 bg-white`}
              onClick={() => setShowModalSos(true)}
            >
              👋 SOS, j’ai besoin d’aide !
            </button>
            <button
              className={`btn-single-page justify-center ml-5 mt-2 mb-4 p-2 h-10 flex w-62 bg-white`}
              onClick={() => setShowModalHelp(true)}
            >
              J’envoie mes retours !
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:w-full h-full lg:pl-32">
        <h2 className="text-xl text-center lg:text-left w-4/5 m-auto lg:w-full mb-2 mt-8">
          Andréa t’accompagne pour tes premiers pas !
        </h2>
        <h3 className="mb-5 text text-center lg:text-left">
          Découvre les astuces et les conseils 🙂
        </h3>{" "}
        <div className="flex flex-col lg:flex-row items-center ml-0  mb-10">
          <div className="h-60 lg:h-96 lg:w-2/6 rounded-2xl w-4/5">
            <ReactPlayer
              // @ts-ignore
              url={tutoFullXpBeginner?.videoUrl}
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
          </div>
          {isMobile && (
            <div className={`flex flex-wrap justify-center w-4/5`}>
              {tutoFullXpBeginner?.instructions.map(
                (item: any, index: number) => {
                  const timestamp = getSecondsFromDuration(item.timestamp);
                  const time = closest(
                    videoDuration,
                    tutoFullXpBeginner.instructions.map((item: any) => {
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
                }
              )}
            </div>
          )}
          <div className="lg:ml-10 ml-4 mr-4 mb-10">
            {!isMobile && (
              <>
                <h2 className="text-xl lg:text-2xl">Instructions</h2>
                <h3 className="text-xs lg:text-sm">
                  ⤹ Clique sur les numéros pour faire avancer la vidéo
                </h3>{" "}
              </>
            )}
            {tutoFullXpBeginner?.instructions.map(
              (item: any, index: number) => {
                const timestamp = getSecondsFromDuration(item.timestamp);
                const time = closest(
                  videoDuration,
                  tutoFullXpBeginner.instructions.map((item: any) => {
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
              }
            )}
          </div>
          {isMobile && (
            <div className="w-4/5">
              <button
                className={`btn-single-page justify-center mt-2 mb-4 p-2 h-10 flex w-full bg-white`}
                onClick={() => setShowModalSos(true)}
              >
                👋 SOS, j’ai besoin d’aide !
              </button>
              <button
                className={`btn-single-page justify-center mt-2 mb-4 p-2 h-10 flex w-full bg-white`}
                onClick={() => setShowModalHelp(true)}
              >
                J’envoie mes retours !
              </button>
            </div>
          )}
        </div>
        <Modal
          isCenter={true}
          onClose={() => setShowModalHelp(false)}
          show={showModalHelp}
        >
          <ModalHelp
            messageModal={"J’envoie mes retours !"}
            subMessageModal={"Envoies-nous tes retours !"}
          ></ModalHelp>
        </Modal>
        <Modal
          isCenter={true}
          onClose={() => setShowModalSos(false)}
          show={showModalSos}
        >
          <ModalHelp
            messageModal={"👋 SOS, j’ai besoin d’aide !"}
            subMessageModal={
              "Un problème avec la réalisation des recettes ? Besoin de conseils pour une étape ou d’informations sur les ingrédients ?"
            }
          ></ModalHelp>
        </Modal>
      </div>
      <Footer />

    </div>
  );
};

export default TutoFullXpBeginner;