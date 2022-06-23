import { BackgroundImage, Button, Container, Footer, Navbar } from "components";
import { MailIcon } from "icons";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const DeleteProfil: React.FC = () => {
  return (
    <div className="flex flex-col | items-center self-center">
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Supprimer votre compte et vos données.</title>
        <meta
          name="supprimer-compte"
          content="Supprimer votre compte et vos données."
        />
      </Helmet>
      <BackgroundImage />
      <Navbar />
      <Container className="flex flex-col | items-center | md:w-2/3 mt-16 lg:mt-28 px-8 mb-40">
        <h3 className="text-2xl md:text-3xl | text-center">
          Tu veux quitter la communauté Greenit ? 🥺
        </h3>

        <h3 className="mt-2 text-xl md:text-2xl | mt-10 mb-10 text-center">
          Merci d'en faire la demande par email 👇 , <br /> et n'hesite pas à
          nous exprimer ce qui te déplaît chez Greenit !
        </h3>

        <div className="flex p-6 bg-white border border-black rounded-lg">
          <a
            href="mailto:hello@greenitcommunity.com"
            className="inline-flex cursor-pointer gap-x-2"
          >
            <img
              src={MailIcon}
              alt="greenit mail"
              className="self-center w-6 h-6"
            />
            <h3 className="self-center md:text-xl">
              hello@greenitcommunity.com
            </h3>
          </a>
        </div>

        <h3 className="mt-2 text-lg md:text-xl | mt-10 mb-10 text-center md:w-2/3">
          Dès la réception du mail nous nous engageons à supprimer ton compte
          ainsi que toutes informations personnelles liées.
        </h3>

        <Link to="/">
          <Button className="mt-5" type="blue">
            Revenir à la page d'accueil
          </Button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
};

export default DeleteProfil;
