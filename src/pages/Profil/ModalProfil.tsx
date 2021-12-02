import React from "react";
import { Button } from "components/misc/Button";
import authService, { ME, UPDATE_IMAGE_ACCOUNT } from "services/auth.service";
import { MailIcon } from "icons";

export const Modal: React.FC = ({ children }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <Button
        className="w-26 ease-linear transition-all duration-150 mt-2"
        type="grey"
        onClick={() => setShowModal(true)}
      >
        Paramètres
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-1/3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h1 className="text-xl">Paramètres</h1>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <button
                    className={
                      "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue"
                    }
                    onClick={() => authService.logout()}
                  >
                    <h1>Déconnexion</h1>
                  </button>
                </div>
                <div className="relative flex-auto w-4/5 py-2 text-start mb-8 ml-6 border-b-4 | hover:border-blue">
                  <h1 className="text-xl cursor-default">Supprimer mon compte</h1>
                  <h3 className="text-base cursor-default">
                    Merci d'en faire la demande par email
                  </h3>
                  <a
                    href="mailto:hello@greenitcommunity.com"
                    className="inline-flex gap-x-2 cursor-pointer"
                  >
                    <img src={MailIcon} className="w-4 h-4 self-center" />
                    <h3 className="text-xs md:text-base self-center">
                      hello@greenitcommunity.com
                    </h3>
                  </a>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
