import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "components/misc/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UPDATE_IMAGE_ACCOUNT } from "services/auth.service";
import { imageValidation } from "helpers/yup-validation.helper";

interface ModalImageProfil {
  parentFunction?: any;
  hasImageProfile?: boolean;
}

export const ModalImageProfil: React.FC<ModalImageProfil> = ({
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
        className="absolute h-32 w-32 md:h-40 md:w-40 rounded-full ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {!hasImageProfile && (
          <div className="grid w-full h-full rounded-full justify-items-center items-center">
            <h1 className="text-xs text-grey-700 bg-white p-2 rounded-3xl opacity-75">
              Ajoute ta photo
            </h1>
          </div>
        )}
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-3/4 md:w-1/3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="text-xl p-4">Change ta photo</h1>
                {/*header*/}
                <form
                  className=" p-4 mb-4"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <div>
                    <label className="block text-gray-700 text-base">
                      Upload l'image ici 👇
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-4 px-2 my-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                      type="file"
                      {...register("image")}
                    ></input>
                  </div>
                  <p className="text-red-500 text-xs italic">
                    {errors?.image?.message}
                  </p>
                  <Button type="blue">Valider</Button>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red bg-emerald-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
