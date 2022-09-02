import { Button, Container, Footer, Navbar } from "components";
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
      <Navbar />
      <Container className="flex flex-col | items-center | md:w-2/3 mt-16 lg:mt-28 px-8 mb-40 gap-4">
        <h2 className="text-2xl md:text-3xl | text-center">
          Tu veux quitter la communauté Greenit ? 🥺
        </h2>

        <h4 className="mt-2 text-lg md:text-xl | text-center">
          Merci d'en faire la demande par email 👇 <br /> et n'hésite pas à nous
          exprimer ce qui te déplaît chez Greenit !
        </h4>

        <div className="flex p-6 border-1 rounded hover:text-blue cursor-pointer">
          <a
            href="mailto:hello@greenitcommunity.com"
            className="flex items-center gap-x-2"
          >
            <i className="bx bx-envelope text-3xl"></i>
            <h3 className="text-lg md:text-xl">hello@greenitcommunity.com</h3>
          </a>
        </div>

        <h3 className="text-md md:text-lg text-center font-regular my-10 md:w-1/2">
          Dès la réception du mail nous nous engageons à supprimer ton compte
          ainsi que toutes informations personnelles liées.
        </h3>

        <Link to="/">
          <Button className="h-10" type="darkBlue">
            Revenir à la page d'accueil
          </Button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
};

export default DeleteProfil;
