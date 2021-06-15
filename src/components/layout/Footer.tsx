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
      <div className="w-5/6 text-center">
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
                "Greenit vise à remplacer la production industrielle de vos produits du quotidien par une production artisanale et locale. Une consommation plus durable et responsable qui réduit votre impact écologique et qui vous rapproche d’une communauté bienveillante de partage !",
            },
            {
              icon: footerChat,
              title: "Collectif",
              text:
                "Notre première mission est de développer une communauté de partage des connaissances pour une consommation saine et une production durable.",
            },
            {
              icon: footerValues,
              title: "Transparent",
              text:
                "Sur Greenit, nous ne collectons pas vos données personnelles, nous ne vous piégerons pas avec des publicités et nous utiliserons des solutions plus éthiques pour héberger le site. Greenit est open-source disponible sur Github. Nous vous donnons également la possibilité de choisir les prochaines fonctionnalités du site, contactez-nous !",
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
        <p className="mt-5">Directrice de la Rédaction et de la Publication: Andréa Ribeiro</p>
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
