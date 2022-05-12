import React from "react";
import {RouteName} from "App";
import useIsMobile from "../../../hooks/isMobile";

import {Link} from "react-router-dom";
import {boxFullXpIngredients} from "utils"
import {NumberedCircle} from "../../../components/misc/NumberedCircle";

//Todo (zack) create UI breakpoint variables for programmatic responsiveness
//Ingredients are hard coded for now since the box we're selling is fixed
const ConfirmationFullXp: React.FC = () => {

    const isMobile = useIsMobile();
    //Todo: (zack) create custom themes for fonts (should it be pixel perfect ?)
    return (
        <div className="flex flex-col lg:flex-row items-center justify-around">
            <div className="flex flex-col mlg:text-center mx-9 mt-11 md:mt-16 lg:ml-32">
                <div>
                    <h1 className="text-2xl font-semibold mb-3">Confirmation de commande</h1>
                    <h2 className="text-green text-base md:text-xl font-semibold mb-4">N’oublie pas d’activer ton compte
                        pour avoir
                        accès {!isMobile && <br/>}à
                        l’espace Premiers Pas !</h2>

                    <h3 className="text-base font-medium md:font-normal mb-6">Tu recevras un email de confirmation de ta
                        commande dans les
                        prochaines minutes.
                        <br/>
                        Regarde également tes spams 😉
                    </h3>
                </div>

                {/*Todo (zack) Refactor later*/}
                {!isMobile && (<>
                        <h3 className="text-base font-normal mb-6">
                            Une question ? Écris nous à
                            <a
                                href="mailto:hello@greenitcommunity.com"
                                className="inline-block ml-1 hover:text-green"
                            >
                                hello@greenitcommunity.com
                            </a>
                        </h3>

                        <Link to={RouteName.accueil}>
                            <button id="" className="h-10 rounded-md bg-green md:w-72 drop-shadow-lg">
                                <h2 id="" className="text-white">
                                    Retour à la page d’accueil
                                </h2>
                            </button>
                        </Link>
                    </>
                )}


            </div>
            <div

                className="flex mlg:items-center justify-center flex-col w-full md:mt-6 lg:w-4/12 bg-blueL lg:rounded-3xl lg:mr-24 py-6">

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

                    <Link to={RouteName.accueil}>
                        <button id="" className="h-10 rounded-md bg-green w-72 drop-shadow-lg">
                            <h2 id="" className="text-white">
                                Retour à la page d’accueil
                            </h2>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};


export default ConfirmationFullXp;