import React from "react";
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";
import {RouteName} from "../../../App";
import {logo} from "../../../icons";


const QRFullXp = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <Helmet>
                {/*Todo : Fill titles and SEO attributes*/}
                <title></title>
                <meta name="description" content=""/>
            </Helmet>
            <div className="flex flex-row items-center justify-items-center mt-2">
                <Link to={RouteName.accueil}>
                    <img
                        src={logo}
                        className="h-10 w-10"
                        alt="Greenit Logo"
                        loading="lazy"
                        id="home"
                    />
                </Link>
                <h5 className="text-green font-semibold text-xl mt-1">
                    Greenit
                </h5>
            </div>
            <h2 className="text-green text-xl font-semibold mt-10 mb-4">Bienvenu.e !</h2>
            <h1 className="text-2xl font-semibold mx-8 mb-3">C’est le moment de se lancer dans le fait-maison !</h1>

            <h3 className="text-sm font-medium md:font-normal mb-6">
                Retrouve les recettes ainsi que la video d’accompagnement dans ton profil👇
            </h3>

            <div>
                <div></div>
                <div></div>
            </div>
            <div>Pictures</div>
            <div>Span with message</div>
        </div>
    );
};

export default QRFullXp;
