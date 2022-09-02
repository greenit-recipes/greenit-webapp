import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT } from "../../services/auth.service";
import { filter, isEmpty } from "lodash";
import { rondIcon } from "../../icons";
import { getLogoAndNameByUrl } from "../../helpers/social-media.helper";
import { PellGreenit } from "../../components/layout/Editor/PellEditor";
import HTMLReactParser from "html-react-parser";
import useIsMobile from "../../hooks/isMobile";
import Personalization from "../../components/personalization/Personalization";

interface IModalShoppingListPurchase {
  btn: any;
  show?: boolean;
  parentFunction?: any;
}

//Todo: Load the component lazily
export const ModalShoppingListPurchase: React.FC<
  IModalShoppingListPurchase
> = ({ btn, parentFunction }) => {
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();
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
      <div
        className="justify-items-center flex flex-col"
        onClick={() => setShowModal(true)}
      >
        {btn}
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className="flex flex-col items-center py-4 md:py-8 text-center md:w-[460px]">
          <h2 className="px-6 md:px-8 mb-5">
            Nous travaillons avec nos partenaires pour te proposer l’achat{" "}
            {isMobile && <br />} d’ingrédients !
          </h2>

          <h3 className="px-7">
            Nous espérons le rendre disponible très vite !
          </h3>
        </div>
      </Modal>
    </div>
  );
};
