
interface ISectionUstensil {
  className?: string;
}

export const SectionUstensil: React.FC<ISectionUstensil> = ({ className }) => {

  return (
    <>
      <div className="flex items-center btn-single-page ingredient-shadow h-12 mt-4">
        <div className="flex justify-between items-center w-1/6">
          <div className="flex p-5 items-center justify-center rounded-l-md ustensil-section w-full h-12">
            1
          </div>
          <img
            className="h-12 rounded"
            src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/768x492_tous-trolls.jpg"
          ></img>
        </div>
        <div className="w-4/6 ml-14">Fouet</div>
        <div className="w-1/6"></div>
      </div>
    </>
  );
};
