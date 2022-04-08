import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/misc/Button";
import { imageValidation } from "helpers/yup-validation.helper";
import React from "react";
import { useForm } from "react-hook-form";
import { UPDATE_IMAGE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";

interface IModalImageProfil {
  parentFunction?: any;
  hasImageProfile?: boolean;
}

export const ModalImageProfil: React.FC<IModalImageProfil> = ({
  parentFunction,
  hasImageProfile = true,
}) => {
  const schema = yup.object().shape({
    image: imageValidation(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [updatePhoto, { data: dataImageUpdate }] = useMutation(
    UPDATE_IMAGE_ACCOUNT,
    {
      errorPolicy: "all",
    }
  );
  const onSubmitHandler = (dataForm: { image: string[] }) => {
    updatePhoto({
      variables: {
        imageProfile: dataForm.image,
      },
    }).then(() => {
      reset();
      parentFunction().then(() => setShowModal(false));
    });
  };
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div
        className="absolute w-32 h-32 transition-all duration-150 ease-linear rounded-full cursor-pointer md:h-40 md:w-40"
        onClick={() => setShowModal(true)}
      >
        {!hasImageProfile && (
          <div className="grid items-center w-full h-full rounded-full justify-items-center">
            <h2 className="p-2 text-xs bg-white opacity-75 text-grey-700 rounded-3xl">
              Ajoute ta photo
            </h2>
          </div>
        )}
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto w-3/4 mx-auto my-6 md:w-1/3">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <h2 className="p-4 text-xl">Change ta photo</h2>
                {/*header*/}
                <form
                  className="p-4 mb-4 "
                              // @ts-ignore
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <div>
                    <label className="block text-gray-700 ">
                      Upload l'image ici 👇
                    </label>
                    <input
                      className="w-full px-2 py-1-4 my-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="file"
                      {...register("image")}
                    ></input>
                  </div>
                  <p className="text-xs italic text-red-500">
                    {errors?.image?.message}
                  </p>
                  <Button type="blue">Valider</Button>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none text-red bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};
