import { RouteName } from "App";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { BackButton } from "../../../components/misc/BackButton";
import useIsMobile from "../../../hooks/isMobile";

const steps = [
    {
        section1: "🎁 Commande ta box en 2 minutes !",
        section2: "🧼 Recettes naturelles et 100% Made in home",
        imgSrc:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
        complementText:
            "3 recettes simples, rapides et validées par notre communauté. 🙂",
    },
    {
        section1: "🚴‍♀️ Reçois tes ingrédients en une semaine ",
        section2: "🌿 Garantie sans gâchis et stock d’ingrédients",
        section3: "🤭 Des contenants en verre réutilisables",
        imgSrc:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
    },
    {
        section1: "😇 Réalise tes produits en étant accompagné.e",
        section2: "🎥 Accompagnement vidéos ",
        section3: "🆘 On répond à vos questions !",
        imgSrc:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
    },
];
const FindOutMoreBoxGreentilFullXP = () => {
    const isMobile = useIsMobile();
    const history = useHistory();
    return (
        <div className="flex flex-col bg-white">
            <Helmet>
                <title>
                    Votre Box Premiers Pas - le DIY accessible conçu pour les débutants !
                </title>
                <meta
                    name="description"
                    content="Envie de réaliser vos produits DIY mais vous ne savez pas par où commencer ? Greenit a conçu une box Premiers Pas, avec 3 recettes simplissimes pour débuter dans le fait-maison. Au menu, une recette de produits ménagers, cosmétiques et hygiènes."
                />
            </Helmet>

            <div className="relative flex flex-col md:justify-around items-center">
                <BackButton styleCSS="mt-6 md:mt-16"/>
                <div className="flex flex-col mb-6 mt-20 md:mt-32 md:ml-40 msm:text-center md:self-start">
                    {" "}
                    <h1 className="text-2xl font-semibold ">La formule Premiers Pas</h1>
                    <p className="">
                        en <span className="text-blue">3 </span>étapes
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row items-center m-auto lg:mt-2">
                    {steps.map((item, index) => (
                        <div key={index} className="text-center mx-8 lg:ml-10 lg:mr-10 lg:mt-5">
                            <div
                                className={`h-10 lg:h-16 text-xl mr-5 w-10 lg:w-16 rounded-full inline-flex items-center justify-center bg-blueL`}
                                style={{minWidth: "2.5rem"}}
                            >
                                <b>{index + 1}</b>
                            </div>
                            <p className="mt-2">{item?.section1}</p>
                            <p>{item?.section2}</p>
                            <p>{item?.section3}</p>
                            <img
                                className={`w-16 h-16 m-auto mt-4 ${
                                    item?.complementText ? "mb-2" : "mb-14"
                                } `}
                                alt="lessive"
                                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
                                loading="lazy"
                            />
                            <p className="mb-10">{item?.complementText}</p>
                        </div>
                    ))}
                </div>


                <div className="mt-0 md:mt-16 md:ml-40 md:self-start msm:text-center">
                    <p>Alors, tenté.e ?</p>
                    {!isMobile && <Link to={RouteName.greenitFullXp}>
                        <button
                            onClick={() => {
                                localStorage.setItem('currentMenuGreenitFullXp', menuFullXp[0]?.name)
                            }}
                            className={`btn-single-page mt-2 p-2 h-10 w-72 bg-green text-white`}
                        >
                            Je commande
                        </button>
                    </Link>}
                </div>
            </div>
            {isMobile &&
                <div className="headband flex justify-center h-16 pb-2 bg-white w-full fixed bottom-0 h-10 sm:mb-0">
                    <button
                        onClick={() => {
                            localStorage.setItem('currentMenuGreenitFullXp', menuFullXp[0]?.name)
                            history.push(RouteName.greenitFullXp);
                        }}
                        className={`btn-single-page mt-2 p-2 h-10 w-5/6 bg-green text-white`}
                    >
                        Je commande ma box Premiers Pas
                    </button>
                </div>}

        </div>
    );
};

export default FindOutMoreBoxGreentilFullXP;
