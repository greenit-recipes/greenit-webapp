export const Personalization = () => {
  return (
    <div className="flex flex-col justify-center text-center -mt-8 mx-12">
      <div className="flex justify-center space-x-2 mb-3">
        <i className="bx bx-category-alt text-2xl"></i>
        <h3>Définir mes particularités</h3>
      </div>
      <div className="hidden">
        {/*Todo: Store the data in an object*/}
        <h4>Quel est ton type de peau ?</h4>
        <div className="mt-4 mx-10 mb-6">
          {/*Todo: convert to grid*/}
          <div className="flex space-x-6">
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-square text-xl"></i>
              <p>Sèche</p>
            </div>
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-square-rounded text-xl"></i>
              <p>Mixte</p>
            </div>
          </div>
          <div className="mt-5 flex space-x-6">
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-circle text-xl"></i>
              <p>Grasse</p>
            </div>
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-polygon text-xl"></i>
              <p>Normale</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        {/*Todo: Store the data in an object*/}
        <h4>Quel est ton type de cheveux ?</h4>
        <div className="mt-4 mx-10 mb-6">
          {/*Todo: convert to grid*/}
          <div className="flex space-x-6">
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-square text-xl"></i>
              <p>Sec</p>
            </div>
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-square-rounded text-xl"></i>
              <p>Gras</p>
            </div>
          </div>
          <div className="mt-5 flex space-x-6">
            <div className="flex flex-col justify-center w-20 h-20 border-darkBlue border-2 rounded-md">
              <i className="bx bx-circle text-xl"></i>
              <p>Normal</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/*Todo: Store the data in an object*/}
        <h4>As-tu des particularités précises ?</h4>
        <div className="mt-4 mx-10 mb-6 | space-y-4">
          {/*Todo: convert to grid*/}
          <div className="flex flex-col">
            <h4>Visage</h4>
            <div className="flex flex-col justify-center | mt-2 space-y-3">
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Acné
              </div>
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Rides
              </div>
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Rougeurs
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h4>Cheveux</h4>
            <div className="flex flex-col justify-center | mt-2 space-y-3">
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Pellicule
              </div>
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Cuir chevelu irrité
              </div>
              <div className="w-56 py-2 border-darkBlue border-2 rounded-md shadow-md">
                Perte de cheveux
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        {/*Todo: Store the data in an object*/}
        <h4 className="text-base">Des recettes pour la maison, ça te dit ?</h4>
        <p className="font-diy text-xl">
          lessive, liquide vaiselle, nettoyant . . .
        </p>
        <div className="mt-4 mx-10 mb-6 | space-y-4">
          {/*Todo: convert to grid*/}
          <div className="flex flex-col justify-center | mt-2 space-y-3">
            <div className="w-56 py-3 border-darkBlue border-2 rounded-md shadow-md">
              Pourquoi pas !
            </div>
            <div className="w-56 py-3 border-darkBlue border-2 rounded-md shadow-md">
              Non, pas pour le moment
            </div>
          </div>
        </div>
      </div>
      {/*Stepper*/}
      <div className="flex justify-center space-x-6">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default Personalization;
