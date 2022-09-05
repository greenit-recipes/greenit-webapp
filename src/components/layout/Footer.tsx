import { RouteName } from "App";
import React from "react";
import { Link } from "react-router-dom";
import {
  FBIcon,
  footerChat,
  footerValues,
  footerWorld,
  InstagramIcon,
  MailIcon,
  pinterestIcon,
  rondIcon,
  tiktokIcon,
} from "../../icons";
import privacyPdf from "../../privacy.pdf";

export const Footer: React.FC = () => {
  return (
    <div className="h-auto w-full z-10 | flex flex-col | items-center | bg-darkBlue -mb-10">
      <div className="mb-4 w-full grid justify-items-center">
        <div className="flex mt-10">
          <Link to={RouteName.why}>
            <h2 className="text-white md:text-xl self-center hover:text-yellow">
              Qui sommes-nous ?
            </h2>
          </Link>
          <h2 className="text-white md:text-xl self-center ml-6 mr-6"> | </h2>
          <Link to={RouteName.contact}>
            <h2 className="text-white md:text-xl self-center hover:text-yellow">
              Contacte-nous !{" "}
            </h2>
          </Link>
        </div>
      </div>
      <div className="grid justify-items-center">
        <a
          href="mailto:hello@greenitcommunity.com"
          className="inline-flex gap-x-4 text-white"
        >
          <div className="grid items-center">
            <i className="bx bx-envelope text-2xl"></i>
          </div>
          <h2 className="text-lg font-light md:text-lg self-center text-white">
            hello@greenitcommunity.com
          </h2>
        </a>
        <div className="flex flex-cols mt-4 gap-1 md:pt-4">
          <a
            href="https://www.instagram.com/greenitcommunity/"
            rel="noopener"
            target="blank"
            className="text-white"
          >
            <div className="grid w-14 items-center">
              <i className="bx bxl-instagram-alt text-4xl ml-2"></i>
            </div>
          </a>
          <a
            href="https://www.facebook.com/greenitcommunity/"
            rel="noopener"
            target="blank"
            className="text-white"
          >
            <div className="grid w-14 items-center">
              <i className="bx bxl-facebook-circle text-4xl ml-2 "></i>
            </div>
          </a>
          <a
            href="https://www.tiktok.com/@greenitcommunity"
            rel="noopener"
            target="blank"
            className="text-white"
          >
            <div className="grid w-14 items-center">
              <i className="bx bxl-tiktok text-4xl ml-2"></i>
            </div>
          </a>
          <a
            href="https://www.pinterest.fr/greenit/"
            rel="noopener"
            target="blank"
            className="text-white"
          >
            <div className="grid w-14 items-center">
              <i className="bx bxl-pinterest text-4xl ml-2"></i>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/company/greenit-community/"
            rel="noopener"
            target="blank"
            className="text-white"
          >
            <div className="grid w-14 items-center">
              <i className="bx bxl-linkedin text-4xl ml-2"></i>
            </div>
          </a>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-12 w-10/12 mt-10 text-left text-sm text-white justify-items-center">
        {[
          {
            icon: "bx bx-leaf",
            title: "Ecolo(mique)",
            text: "Greenit est une solution sociale, économique et écologique aux problèmes environnementaux auxquels nous sommes confrontés. Notre mission ? Répandre un mode de consommation plus responsable et durable en remplaçant la production industrielle par une production plus locale et artisanale.",
          },
          {
            icon: "bx bx-chat",
            title: "Collectif",
            text: "Notre première mission, ensemble, est de développer une communauté qui soutient le partage des connaissances pour une consommation et une production saines.",
          },
          {
            icon: "bx bx-world",
            title: "Transparent",
            text: "Ici il n’y pas de collection de données personnelles et pas de publicités. Greenit est aussi un projet open-source disponible sur Github. N’hésite pas à poser tes questions et à voter pour les prochaines fonctionnalités Greenit.",
          },
        ].map((item, index) => (
          <div className="flex flex-col" key={index}>
            <div className="flex">
              <i className={`text-3xl ${item.icon}`} />
              <h3 className="text-xl pl-2 flex self-center">{item.title}</h3>
            </div>
            <div>{item.text}</div>
          </div>
        ))}
      </div>
      <a
        href={privacyPdf}
        target="_blank"
        rel="noreferrer"
        className="text-sm underline text-white mt-10"
      >
        Privacy Policy
      </a>
      <div className="my-4 self-start flex flex-row w-full gap-4">
        <a
          rel="license"
          className="relative self-center"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img
            loading="lazy"
            alt="Creative Commons License"
            className="ml-10 mr-5 w-10"
            src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
          />
        </a>
        <div className="w-full">
          <p className="text-xs md:text-sm text-white text-left relative inline">
            All content is licensed under a
          </p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            className="text-white text-left text-xs md:text-sm"
          >
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0
            International License
          </a>
        </div>
      </div>
    </div>
  );
};
