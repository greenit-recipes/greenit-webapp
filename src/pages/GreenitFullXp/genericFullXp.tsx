import {retourIcon} from "icons";
import HeadBand from "pages/GreenitFullXp/headband";
import MenuFullXp from "pages/GreenitFullXp/MenuFullXp/MenuFullXp";
import {menuFullXp} from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, {Suspense, useState} from "react";
import {Helmet} from "react-helmet";
import {useHistory} from "react-router-dom";
import {findIndex} from "lodash";
import {Loading} from "components";
import {previousPath} from "helpers/route-helper";

//Todo : Integrate the component with UI later
import CheckoutFullXp from "pages/GreenitFullXp/CheckoutFullXp/CheckoutFullXp";
import useIsMobile from "../../hooks/isMobile";


const RecipeFullXp = React.lazy(() => import("./RecipeFullXp/RecipeFullXp"));
const IngredientUsentilFullXp = React.lazy(
    () =>
        import(
            "pages/GreenitFullXp/IngredientUstensilFullXp/IngredientUsentilFullXp"
            )
);

const DeliveryGreenitFullXp = React.lazy(
    () => import("pages/GreenitFullXp/Delivery/Delivery")
);

const ConfirmationFullXp = React.lazy(
    () => import("pages/GreenitFullXp/ConfirmationFullXp/ConfirmationFullXp")
)

const GenericFullXp = () => {
    console.log(localStorage.getItem("currentMenuGreenitFullXp"));
    const [menu, setMenu] = useState(
        localStorage.getItem("currentMenuGreenitFullXp") || menuFullXp[0].name
    );
    const [isloginOpen, setIsloginOpen] = useState(false);

    const setMenuWithCoockie = (menu: string) => {
        setMenu(menu);
        localStorage.setItem("currentMenuGreenitFullXp", menu);
    };

    const history = useHistory();
    const isMobile = useIsMobile();

    return (
        <div className="mb-24">
            <Helmet>
                <title></title>
                <meta name="" content=""/>
            </Helmet>
            <div className="flex flex-row items-center mt-10 relative">
                {localStorage.getItem("currentMenuGreenitFullXp") !== 'Confirmation'
                    && <div
                        className="absolute z-20 grid w-8 h-8 rounded-full cursor-pointer md:w-10 md:h-10 lg:p-2 md:ml-16 md:bg-white lg:shadow-md"
                        onClick={() => {
                            const currentIndexNavigation = findIndex(menuFullXp, {name: menu});
                            if (menuFullXp[0].name === menu || !!currentIndexNavigation) previousPath()
                            setMenuWithCoockie(menuFullXp[currentIndexNavigation - 1]?.name);
                        }}>
                        <img alt="Retour icon" loading="lazy" src={retourIcon}/>
                    </div>}

                {!isMobile && <div className="flex grow justify-center mt-10 w-full">
                    <MenuFullXp setNavigation={setMenuWithCoockie}/>
                </div>}
            </div>
            {(() => {
                switch (menu) {
                    case menuFullXp[0].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <RecipeFullXp/>
                            </Suspense>
                        );
                    case menuFullXp[1].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <IngredientUsentilFullXp/>
                            </Suspense>
                        );
                    case menuFullXp[2].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <DeliveryGreenitFullXp setNavigation={setMenuWithCoockie}/>
                            </Suspense>
                        );
                    case menuFullXp[3].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <CheckoutFullXp/>
                            </Suspense>
                        );
                    case menuFullXp[4].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <ConfirmationFullXp/>
                            </Suspense>
                        );
                    default:
                        return <p>Recettes</p>;
                }
            })()}
            {localStorage.getItem("currentMenuGreenitFullXp") !== 'Confirmation'
                && <div className="fixed bottom-0 h-10 mb-16 sm:mb-0">
                    <HeadBand
                        setNavigation={setMenuWithCoockie}
                        currentPositionMenu={findIndex(menuFullXp, {name: menu})}
                    /></div>}
        </div>
    );
};

export default GenericFullXp;
