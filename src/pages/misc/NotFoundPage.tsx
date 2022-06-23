import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Navbar } from "../../components";
import useIsMobile from "../../hooks/isMobile";

const NotFoundPage = () => {
  const isMobile = useIsMobile();
  return (
    <div className="h-screen w-full">
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div
        className="h-auto w-auto flex items-center flex-col text-gray-600"
        style={{
          marginTop: isMobile ? "50%" : "15%",
        }}
      >
        <h2 className="text-3xl lg:text-8xl mb-2">404</h2>
        <h1 className="text-2xl lg:text-3xl">Cette page n’existe pas</h1>

        <Link to="/">
          <Button className="mt-5" type="blue">
            Revenir à la page d'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
