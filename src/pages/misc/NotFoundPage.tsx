import React from "react";
import { Navbar } from "../../components";
import useIsMobile from "../../hooks/isMobile";

const NotFoundPage = () => {
  const isMobile = useIsMobile();
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div
        className="h-auto w-auto flex items-center flex-col text-gray-600"
        style={{
          marginTop: isMobile ? "50%" : "15%",
        }}
      >
        <h1 className="text-3xl lg:text-8xl mb-2">404</h1>
        <h1 className="text-2xl lg:text-3xl">Cette page n’existe pas</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
