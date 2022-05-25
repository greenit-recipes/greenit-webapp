import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/misc/Button';
import { imageValidation } from 'helpers/yup-validation.helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UPDATE_IMAGE_ACCOUNT } from 'services/auth.service';
import * as yup from 'yup';

interface IModalImageProfil {
  parentFunction?: any;
  parentFunctionOpenModal?: any;
}

export const ModalImageProfil: React.FC<IModalImageProfil> = ({
  parentFunction,
  parentFunctionOpenModal,
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
      errorPolicy: 'all',
    },
  );
  const onSubmitHandler = (dataForm: { image: string[] }) => {
    updatePhoto({
      variables: {
        imageProfile: dataForm.image,
      },
    }).then(() => {
      reset();
      parentFunction().then(() => parentFunctionOpenModal(false));
    });
  };
  return (
    <>
      {/*content*/}
      <div className="relative flex flex-col w-full bg-white border-0">
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
              {...register('image')}
            ></input>
          </div>
          <p className="text-xs italic text-red-500">
            {errors?.image?.message}
          </p>
          <Button type="blue">Valider</Button>
        </form>
      </div>
    </>
  );
};
