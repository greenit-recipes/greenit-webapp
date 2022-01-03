import { InstagramOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import privacyPdf from "../../privacy.pdf";
import {
  footerChat,
  footerWorld,
  footerValues,
  pinterestIcon,
  tiktokIcon,
  FBIcon,
  InstagramIcon,
  MailIcon,
} from "../../icons";
import { RouteName } from "App";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  return (
    <div className="h-auto w-full | flex flex-col | items-center | bg-black bg-opacity-75 -mb-10">
      <div className="mb-4 w-full grid justify-items-center">
        <div className="flex mt-10">
          <Link to={RouteName.why}>
            <h1 className="text-white md:text-xl self-center">
            {t("footer.title1")}
            </h1>
          </Link>
          <h1 className="text-white md:text-xl self-center ml-6 mr-6"> | </h1>
          <Link to={RouteName.contact}>
            <h1 className="text-white md:text-xl self-center">
            {t("footer.title2")}{" "}
            </h1>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-12 w-10/12 mt-10 text-left text-sm text-white justify-items-center">
        {[
          {
            icon: footerWorld,
            title: t("footer.category.title1"),
            text: t("footer.category.label1"),
          },
          {
            icon: footerChat,
            title: t("footer.category.title2"),
            text: t("footer.category.label2"),
          },
          {
            icon: footerValues,
            title: t("footer.category.title3"),
            text: t("footer.category.label3"),
          },
        ].map((item, index) => (
          <div className="flex flex-col" key={index}>
            <div className="flex">
              <img
                src={item.icon}
                className="h-12 w-12"
                alt={`${item.title} Icon`}
              />
              <h3 className="text-2xl pl-2 flex self-center">{item.title}</h3>
            </div>
            <div className="mt-5">{item.text}</div>
          </div>
        ))}
      </div>
      <div className=" grid justify-items-center w-4/5 md:w-auto p-10 shadow-xl rounded-xl mt-10 mb-14 bg-white">
        <h1 className="text-2xl mb-5">{t("footer.contact.title")}{" "}</h1>
        <a
          href="mailto:hello@greenitcommunity.com"
          className="inline-flex gap-x-4"
        >
          <img src={MailIcon} className="w-7 h-7 self-center" />
          <h1 className="text-xs md:text-lg self-center pt-1">
          {t("footer.contact.email")}
          </h1>
        </a>
        <div className="flex flex-row gap-x-4 justify-center mt-3">
          {[
            {
              href: "https://www.instagram.com/greenitcommunity/",
              children: (
                <img src={InstagramIcon} className="w-8 h-8 mt-2 self-start" />
              ),
            },
            {
              href: "https://www.facebook.com/greenitcommunity/",
              children: (
                <img src={FBIcon} className="w-6 h-6 mt-2 self-start mt-3" />
              ),
            },
            {
              href: "https://www.pinterest.fr/greenitcommunity/",
              children: (
                <img src={pinterestIcon} className="w-8 h-8 mt-2 self-start" />
              ),
            },
            {
              href: "https://www.tiktok.com/@greenitcommunity",
              children: (
                <img src={tiktokIcon} className="w-8 h-8 mt-2 self-start" />
              ),
            },
          ].map((item, index) => (
            <a href={item.href} target="_blank" rel="norefferer" key={index}>
              {item.children}
            </a>
          ))}
        </div>
      </div>
      <a
        href={privacyPdf}
        target="_blank"
        className="text-xl underline text-white mt-10"
      >
        {t("footer.privatePolicy.title")}
      </a>
      <div className="mt-4 mb-5 self-start flex">
        <a
          rel="license"
          className="relative self-center"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img
            alt="Creative Commons License"
            className="ml-10 mr-5"
            src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
          />
        </a>
        <div className="w-44 sm:w-auto">
          <p className="text-xs md:text-sm text-white text-left relative inline">
          {t("footer.privatePolicy.content1")}{" "}
          </p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            className="text-white text-left text-xs md:text-sm"
          >
            {t("footer.privatePolicy.content2")}
          </a>
        </div>
      </div>
    </div>
  );
};
