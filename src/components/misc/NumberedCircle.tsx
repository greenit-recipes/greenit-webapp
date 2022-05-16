import {CircleProps} from "./Circle";
import React from "react";

export interface NumberedCircleProps extends CircleProps {
    quantity: number;
}

//Todo (zack) Parameterize circle's size
export const NumberedCircle: React.FC<NumberedCircleProps> = ({
                                                  name,
                                                  icon,
                                                  quantity
                                              }) => {

    return (
        <>
            <div className="flex cursor-pointer flex-col | items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white mx-4 relative | rounded-full shadow-lg">
                    <img
                        loading="lazy"
                        className=" max-h-full max-w-full | ml-auto mr-auto | flex place-self-center rounded-full"
                        src={icon}
                        alt={name}
                    ></img>
                    { quantity > 1 && <span className="absolute bottom-0 right-0 px-2 py-1 w-7 h-7 text-sm font-semibold bg-white rounded-full">x{quantity}</span>}
                </div>
                <div className="w-28">
                    <div className="pt-2 text-sm md:text-base text-center"> {name} </div>
                </div>
            </div>
        </>
    );
};