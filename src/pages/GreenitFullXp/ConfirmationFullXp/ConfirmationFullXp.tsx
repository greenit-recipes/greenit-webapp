import React from "react";
import {RouteName} from "App";
import useIsMobile from "../../../hooks/isMobile";

import {Link} from "react-router-dom";
import {boxFullXpIngredients} from "utils"
import {NumberedCircle} from "../../../components/misc/NumberedCircle";
import Auth from "../../../services/auth.service";
const ModalLogGreenit = React.lazy(() => import("components/layout/ModalLogGreenit/ModalLogGreenit"));

//Todo (zack) create UI breakpoint variables for programmatic responsiveness
/*Todo (zack) Refactor later */
//Ingredients are hard coded for now since the box we're selling is fixed
const ConfirmationFullXp: React.FC = () => {

    const isMobile = useIsMobile();
    const isLoggedIn = Auth.isLoggedIn();
    //Todo: (zack) create custom themes for fonts (should it be pixel perfect ?)
    return (
        <div className="flex flex-col lg:flex-row items-start justify-around">
            <div className="flex flex-col mlg:self-center mlg:text-center mx-9 mt-11 md:mt-16 lg:ml-32">
                <div>
                    <h1 className="text-2xl font-semibold mb-3">Confirmation de commande</h1>

                    {isLoggedIn ? (
                        <h2 className="text-green text-base md:text-xl font-semibold mb-4">Merci</h2>) : (
                        <h2 className="text-green text-base md:text-xl font-semibold mb-4">N’oublie pas d’activer ton
                            compte
                            pour avoir
                            accès {!isMobile && <br/>}à
                            l’espace Premiers Pas !</h2>)}

                    <h3 className="text-base font-medium md:font-normal mb-6">Tu recevras un email de confirmation de ta
                        commande dans les
                        prochaines minutes.
                        <br/>
                        Regarde également tes spams 😉
                    </h3>
                </div>

                {isLoggedIn ? (!isMobile && <>
                        <h3 className="text-base font-medium md:font-normal mb-6">
                            Une fois que tu as reçu ta box, rendez-vous sur ton profil pour avoir
                            {!isMobile && <br/>}
                            accès aux recettes et aux vidéos d’accompagnement !
                        </h3>
                        <Link to={RouteName.profil}>
                            <button id="" className="h-10 rounded-md bg-green md:w-72 drop-shadow-lg">
                                <h2 id="" className="text-white">
                                    Mon espace DIY
                                </h2>
                            </button>
                        </Link></>)
                    :
                    <div className="flex flex-col">
                        <h2 className="text-blue text-base md:text-xl font-semibold mb-4">
                            Crée-toi un compte pour avoir accès aux recettes
                            {!isMobile && <br/>}
                            et aux vidéos d’accompagnement !
                        </h2>
                        <ModalLogGreenit
                            btn={
                                <>
                                    <button id=""
                                            className="self-center md:self-start h-10 rounded-md bg-blue w-72 md:w-44 drop-shadow-lg mb-6">
                                        <h2 id="" className="text-white">
                                            Créer un compte
                                        </h2>
                                    </button>
                                </>
                            }
                        ></ModalLogGreenit>
                        {/* Image placeholder */}
                        <div className="w-52 h-36 self-center md:self-start rounded-lg bg-blueL mb-7 md:mb-6">
                        </div>
                    </div>}


                {!isMobile && (<>
                        <h3 className="text-base font-normal mt-11 mb-6">
                            Une question ? Écris nous à
                            <a
                                href="mailto:hello@greenitcommunity.com"
                                className="inline-block ml-1 hover:text-green"
                            >
                                hello@greenitcommunity.com
                            </a>
                        </h3>
                    </>
                )}


            </div>
            <div

                className="flex mlg:items-center justify-center flex-col w-full md:mt-12 lg:w-4/12 bg-blueL lg:rounded-3xl lg:mr-24 py-6">

                <h1 className="text-lg md:text-2xl font-semibold mb-3 px-10">Bientôt chez toi 😉</h1>

                <div className={`flex flex-wrap justify-center mt-4 md:space-x-8 lg:space-x-4 lg:px-8`}>
                    {boxFullXpIngredients.map((item) => (
                        <NumberedCircle quantity={item.quantity} name={item.title} icon={item.icon}/>
                    ))}
                </div>
            </div>
            {/*Todo : Find a better alternative*/}
            {isMobile && (<div className="text-center mt-10">
                    <h3 className="text-base font-normal mb-6">
                        Une question ? Écris nous à
                        <a
                            href="mailto:hello@greenitcommunity.com"
                            className="inline-block ml-1 hover:text-green"
                        >
                            hello@greenitcommunity.com
                        </a>
                    </h3>
                    {isLoggedIn && <Link to={RouteName.profil}>
                        <button id="" className="h-10 rounded-md bg-green w-72 drop-shadow-lg">
                            <h2 id="" className="text-white">
                                Mon espace DIY
                            </h2>
                        </button>
                    </Link>}

                </div>
            )}
        </div>
    );
};


export default ConfirmationFullXp;