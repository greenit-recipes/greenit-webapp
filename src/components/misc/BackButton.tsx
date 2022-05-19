import {previousPath} from "../../helpers/route-helper";
import {retourIcon} from "../../icons";
import React from "react";

interface BackButtonProps {
    styleCSS?: string;
}

//Todo : Make the button customizable with custom props
export const BackButton: React.FC<BackButtonProps> = ({
    styleCSS
                                     }) => {
    return (
        <div
            className={`absolute left-0 z-20 grid w-10 h-10 ${styleCSS} top-0 p-2 rounded-full cursor-pointer ml-6 md:w-10 md:w-8 md:h-10 md:p-2 md:ml-14 bg-white shadow-md`}
            onClick={() => {
                previousPath();
            }}
        >
            <img alt="Retour icon" loading="lazy" src={retourIcon} />
        </div>
    )
}