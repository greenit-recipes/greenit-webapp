import { InstagramOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { Grid } from "../";
import privacyPdf from "../../privacy.pdf";
import {
  footerChat,
  footerWorld,
  footerValues,
  pinterestIcon,
  tiktokIcon,
} from "../../icons";

export const Footer: React.FC = () => {
  return (
    <div className="h-auto w-full | flex flex-col | items-center | bg-gray-200 -mb-10">
      <div className="w-4/6 text-center">
        <Grid
          type="col"
          gap="8"
          size={{
            default: 1,
            md: 3,
          }}
          className="mt-10"
        >
          {[
            {
              icon: footerWorld,
              title: "Ecolomique",
              text:
                "Greenit est une solution sociale, économique et écologique aux problèmes  de pollution et climatiques auxquels nous sommes confronté. Greenit est une solution pour remplacer la production industrielle par une production artisanale et locale.",
            },
            {
              icon: footerChat,
              title: "Collectif",
              text:
                "Notre première mission ensemble est de developper une communauté qui soutient le partage des connaissances pour une consommation et une production saines.",
            },
            {
              icon: footerValues,
              title: "Transparent",
              text:
                "Ici il n’y pas de collection de données personnelles, pas de publicités et pas d’Amazon ou de Google pour héberger notre site. Greenit est aussi un projet open-source disponible sur Github. \
N’hésites pas à poser tes questions et à voter pour les prochaines functionalités Greenit.",
            },
          ].map((item) => (
            <div className="flex flex-col">
              <div className="flex">
                <img
                  src={item.icon}
                  className="h-20 w-20"
                  alt={`${item.title} Icon`}
                />
                <h3 className="text-2xl pl-2 flex self-center">{item.title}</h3>
              </div>
              <div className="mt-5">{item.text}</div>
            </div>
          ))}
        </Grid>
        <div className="flex flex-col mb-10 mt-5 lg:mt-0">
          <a
            href="mailto:hellogreenit@gmail.com"
            className="inline-flex gap-x-4 justify-center"
          >
            <MailOutlined className="self-center text-2xl" />
            <h3 className="text-lg self-center pt-1">hellogreenit@gmail.com</h3>
          </a>
          <div className="flex flex-row gap-x-4 justify-center mt-3">
            {[
              {
                href: " https://www.instagram.com/greenitcommunity/",
                children: (
                  <InstagramOutlined className="pr-2 mt-1 text-2xl self-end" />
                ),
              },
              {
                href: "https://www.pinterest.fr/greenitcommunity/",
                children: (
                  <img
                    src={pinterestIcon}
                    className="w-8 h-8 mt-2 self-start"
                  />
                ),
              },
              {
                href: "https://www.tiktok.com/@greenitcommunity",
                children: (
                  <img src={tiktokIcon} className="w-8 h-8 mt-2 self-start" />
                ),
              },
            ].map((item) => (
              <a href={item.href} target="_blank" rel="norefferer">
                {item.children}
              </a>
            ))}
          </div>
        </div>
        <a href={privacyPdf} target="_blank" className="text-xl underline">
          Privacy Policy
        </a>
        <p className="mt-5">Directeur de la Rédaction et de la Publication : Adrien Sosson</p>
        <div className="mt-10 mb-10">
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt="Creative Commons License"
              className="ml-auto mr-auto"
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            />
          </a>
          <br />
          All content is licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0
            International License
          </a>
        </div>
      </div>
    </div>
  );
};
