import { Loading } from "components";
import { previousPath } from "helpers/route-helper";
import { retourIcon } from "icons";
import { findIndex } from "lodash";
import HeadBand from "pages/GreenitFullXp/headband";
import MenuFullXp from "pages/GreenitFullXp/MenuFullXp/MenuFullXp";
import {menuFullXp} from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, {Suspense, useState} from "react";
import {Helmet} from "react-helmet";
import useIsMobile from "../../hooks/isMobile";
import {useHistory} from "react-router-dom";
import {getMenuStep} from "../../helpers/beginnerbox.helper";


const RecipeFullXp = React.lazy(() => import("./RecipeFullXp/RecipeFullXp"));
const IngredientUsentilFullXp = React.lazy(
    () =>
        import(
            "pages/GreenitFullXp/IngredientUstensilFullXp/IngredientUsentilFullXp"
            )
);

const ConfirmationFullXp = React.lazy(
    () => import("pages/GreenitFullXp/ConfirmationFullXp/ConfirmationFullXp")
);

//Todo : Refactor
const GenericFullXp = () => {

    //Initialize default state of the menu
    const paymentMenu = menuFullXp[3].name
    const startMenu =
        (getMenuStep() === paymentMenu)
            ? paymentMenu
            : menuFullXp[0].name

    //Delete previous cookie from payment on confirmation
    if (startMenu === paymentMenu) {
        localStorage.removeItem("currentMenuGreenitFullXp")
    }
    const currentMenuStorage = localStorage.getItem("currentMenuGreenitFullXp") || localStorage.setItem('currentMenuGreenitFullXp', startMenu)

    //Bug when the user comes back to the UI after first setup
    const menuStorage =
        currentMenuStorage !== "undefined"
            ? currentMenuStorage
            : null;


    const [menu, setMenu] = useState(menuStorage || startMenu);

    const setMenuWithCoockie = (menu: string) => {
        setMenu(menu);
        // menu !== "undefined" || localStorage.setItem("currentMenuGreenitFullXp", menu);
        localStorage.setItem("currentMenuGreenitFullXp", menu);
    };

    const isMobile = useIsMobile();
    const history = useHistory();

    return (
        <div className="mb-24">
            <Helmet>
                <title>Coffret DIY débutants - Réalisez vos produits maison</title>
                <meta
                    name="description"
                    content="Coffret pour les débutants en fait-maison. Une box spécialement conçue pour les premiers pas en DIY. Réalisez tous vos produits hygiènes, cosmétiques et ménagers. Greenit vous livre des ingrédients et vous réalisez !"
                />
            </Helmet>
            <div className="flex flex-row items-center mt-6 relative">
                <div
                    className="absolute z-20 grid w-10 h-10 p-2 rounded-full cursor-pointer ml-6 md:w-10 md:w-8 md:h-10 md:p-2 mt-10 md:ml-16 bg-white shadow-md"
                    onClick={() => {
                        if (menu !== menuFullXp[3].name) {
                            const currentIndexNavigation = findIndex(menuFullXp, {
                                name: menu,
                            });
                            //Todo : Investigate the behavior of this logical expression
                            if (menuFullXp[0].name === menu || !currentIndexNavigation)
                                previousPath();
                            setMenuWithCoockie(menuFullXp[currentIndexNavigation - 1]?.name);
                        } else {
                            //Redirect to landing page after confirmation
                            history.push('/')
                        }
                    }}
                >
                    <img alt="Retour icon" loading="lazy" src={retourIcon}/>
                    {menu === menuFullXp[3].name &&
                        <span className="absolute z-20 top-2 md:top-2 left-12">Acceuil</span>}
                </div>


                {!isMobile && (
                    <div className="flex grow justify-center mt-10 w-full">
                        <MenuFullXp setNavigation={setMenuWithCoockie}/>
                    </div>
                )}
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
                    case menuFullXp[3].name:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <ConfirmationFullXp/>
                            </Suspense>
                        );
                    default:
                        return (
                            <Suspense fallback={<Loading/>}>
                                <RecipeFullXp/>
                            </Suspense>
                        );
                }
            })()}
            {menu !== menuFullXp[3].name && (
                <div className="fixed bottom-0 h-10 mb-16 sm:mb-0">
                    <HeadBand
                        setNavigation={setMenuWithCoockie}
                        currentPositionMenu={findIndex(menuFullXp, {name: menu})}
                    />
                </div>
            )}
        </div>
    );
};

export default GenericFullXp;
