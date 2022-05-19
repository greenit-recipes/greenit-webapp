import {getImagePath} from "helpers/image.helper";

interface ISectionUstensil {
    className?: string;
    data: any;
}


export const SectionUstensil: React.FC<ISectionUstensil> = ({data, className}) => {
    return (
        <>
            <div className="flex flex-start items-center btn-single-page ingredient-shadow h-12 mt-4">
                <div className="flex justify-between items-center">
                    <img
                        className="h-12 w-12 rounded"
                        alt={data?.name}
                        src={getImagePath(data?.image)}
                        loading="lazy"
                    ></img>
                </div>
                <div className="flex-grow ml-4">{data?.amount} &nbsp; {data?.name} {data?.subName && (
                    <span className="text-xs">{data?.subName}</span>)}</div>
                <div className=""></div>
            </div>
        </>
    );
};
