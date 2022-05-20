import React from "react";
import {Link} from "react-router-dom";
import {RouteName} from "../../../App";
import {logo} from "../../../icons";
import {boxFullXpIngredients} from "../../../utils";
import {NumberedCircle} from "../../../components/misc/NumberedCircle";
import {Helmet} from "react-helmet";
import ModalLogGreenit from "../../../components/layout/ModalLogGreenit/ModalLogGreenit";


const QRFullXp = () => {
    return (
        <>
            <Helmet>
                {/*Todo : Fill titles and SEO attributes*/}
                <title>Connecte-toi pour débuter en DIY | Box Premiers Pas | Greenit Community</title>
                <meta name="description" content=""/>
            </Helmet>

            <div className="h-screen flex flex-col text-center">
                <div className="flex flex-row align-start mt-2 md:ml-6 md:mt-6">
                    <Link to={RouteName.accueil}>
                        <img
                            src={logo}
                            className="h-10 w-10 md:h-12 md:w-12"
                            alt="Greenit Logo"
                            loading="lazy"
                            id="home"
                        />
                    </Link>
                    <h5 className="text-green font-semibold text-xl md:text-2xl mt-1">
                        Greenit
                    </h5>
                </div>
                <h2 className="text-green text-xl font-semibold mt-10 mb-4 md:mt-20 md:text-2xl">Bienvenu.e !</h2>
                <h1 className="text-2xl font-semibold mx-8 mb-3">C’est le moment de se lancer dans le fait-maison !</h1>

                <h3 className="text-base font-medium mx-8 mb-6">
                    Retrouve les recettes ainsi que la video d’accompagnement dans ton profil👇
                </h3>

                <div className="self-center flex flex-col md:flex-row md:mt-6 md:space-x-8">
                    <div className="flex flex-col mb-5">
                        <span className="mb-1">tu n’as pas encore de compte</span>
                        <ModalLogGreenit
                            btn={
                                <>
                                    <button id="" className="h-10 rounded-md bg-green w-72 md:w-60 drop-shadow-lg">
                                        <h2 id="" className="text-white">
                                            Créer un compte
                                        </h2>
                                    </button>
                                </>
                            }
                        ></ModalLogGreenit>
                    </div>
                    <div className="flex flex-col">
                        <span className="mb-1">tu as déjà un compte</span>
                        <ModalLogGreenit
                            btn={
                                <>
                                    <button id="" className="h-10 rounded-md bg-blue w-72 md:w-60 drop-shadow-lg">
                                        <h2 id="" className="text-white">
                                            Se connecter
                                        </h2>
                                    </button>
                                </>
                            }
                            isModalLogin={true}
                        ></ModalLogGreenit>
                    </div>
                </div>
                <div className={`flex flex-wrap justify-center mt-8 md:mt-14 md:space-x-8 lg:space-x-4 lg:px-8`}>
                    {boxFullXpIngredients.map((item) => (
                        <NumberedCircle quantity={1} name={item.title} icon={item.icon} key={item.id}/>
                    ))}
                </div>
                <div className="mt-8 font-medium text-sm md:text-base">Vos 3 produits 100% Made in chez vous 🙂</div>
            </div>
        </>
    );
};

export default QRFullXp;
