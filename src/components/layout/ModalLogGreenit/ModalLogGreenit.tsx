import Modal from "components/layout/Modal/Modal";
import {LoginModal} from "pages/Login/LoginModal";
import {RegisterModal} from "pages/Register/register-modal";
import React, {useEffect, useState} from "react";
import "./ModalLogGreenit.css";


interface IModalLogGreenit {
    btn: any;
    isModalLogin?: boolean;
    show?: boolean;
}

export const ModalLogGreenit: React.FC<IModalLogGreenit> = ({btn, isModalLogin, show}) => {
    const [showModal, setShowModal] = useState(false);
    //Todo : Investigate the massive render cycle at the modal level
    // const [showModal, setShowModal] = useState(show || false);
    const [isOpenLogin, setIsOpenLogin] = useState(isModalLogin || false);

    console.log("showMod" + showModal);
    console.log("show" + show);

    useEffect(() => {
        if (showModal) {
            // à voir
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, []);
    return (
        <div>
            <div className="justify-items-center flex flex-col"
                 onClick={() => setShowModal(true)}
            >
                {btn}
            </div>
            <Modal
                onClose={() => setShowModal(false)}
                show={showModal && !isOpenLogin}
            >

                <RegisterModal loginOpen={setIsOpenLogin}></RegisterModal>
            </Modal>

            <Modal
                onClose={() => setShowModal(false)}
                isCenter={true}
                show={showModal && (isOpenLogin || isModalLogin)}
            >
                <LoginModal loginOpen={setIsOpenLogin}></LoginModal>
            </Modal>

        </div>
    );
};
