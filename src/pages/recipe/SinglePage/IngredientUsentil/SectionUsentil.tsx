import { getImagePath } from "helpers/image.helper";

interface ISectionUstensil {
  className?: string;
  data: any;
}


export const SectionUstensil: React.FC<ISectionUstensil> = ({ data, className }) => {
  return (
    <>
      <div className="flex items-center btn-single-page ingredient-shadow h-12 mt-4">
        <div className="flex justify-between items-center w-1/6">
          <div className="flex p-5 items-center justify-center rounded-l-md ustensil-section w-full h-12">
            {data?.amount}
          </div>
          <img
            className="h-12 w-12 rounded"
            alt={data?.name}
            src={getImagePath(data?.image)}
            loading="lazy"
          ></img>
        </div>
        <div className="w-4/6 ml-14">{data?.name}</div>
        <div className="w-1/6"></div>
      </div>
    </>
  );
};
