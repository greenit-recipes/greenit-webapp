import React, { useState, useEffect } from "react";
import "./Modal.css";
import { LoginModal } from "pages/Login/LoginModal";
import { RegisterModal } from "pages/Register/register-modal";
import { Button } from "components";

interface IModal {
  btn: any;
  isModalLogin?: boolean;
}

export const Modal: React.FC<IModal> = ({ btn, isModalLogin }) => {
  const [showModal, setShowModal] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(isModalLogin || false);
  useEffect(() => {
    if (showModal) {
      // à voir
      document.body.classList.add("no-scroll");

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  });
  return (
    <>
      <div className="rounded-full ease-linear transition-all duration-150 cursor-pointer" onClick={() => setShowModal(true)}>
      {btn}
      </div>
      {showModal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed cont z-50 outline-none focus:outline-none flex flex-col">

          <div className="opacity-25 fixed inset-0 z-50 bg-black"></div>
          <button
            className="container-modal text-white text-xl"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Fermer
          </button>
          {   /* @ts-ignore */ }
          <div className="container-modal ">
          {isOpenLogin ? (<LoginModal loginOpen={setIsOpenLogin}></LoginModal>) : <RegisterModal loginOpen={setIsOpenLogin}></RegisterModal>}
          </div>
          <button
            className="container-modal text-white font-bold mt-10 text-3xl"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Fermer
          </button>
        </div>
      ) : null}
    </>
  );
};
