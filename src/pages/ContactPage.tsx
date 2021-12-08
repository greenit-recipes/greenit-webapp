import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { UXFormulaire } from "components/layout/UXFormulaire";
import { Footer } from "components/layout/Footer";
import {
  pinterestIcon,
  tiktokIcon,
  InstagramIcon,
  MailIcon,
  FBIcon,
} from "../icons";
import { BackgroundImage } from "../components/layout/BackgroundImage";

const ContactPage = () => {
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <div>
      <BackgroundImage />
      <Navbar />
      <div className="grid justify-items-center auto-rows-max h-screen">
        <div className="w-4/5">
          <h1 className="text-center text-xl md:text-2xl md:text-3xl mt-16">
            Tous vos retours sont les bienvenus !
          </h1>
          <h3 className="text-center text-lg md:text-xl mt-2">
            Merci à toutes celles et ceux qui nous aident.
          </h3>
        </div>

        <div className=" grid justify-items-center w-4/5 md:w-auto p-10 shadow-xl rounded-xl mt-10 mb-14 bg-white">
          <h1 className="text-2xl mb-5">Contacte-nous !</h1>
          <a
            href="mailto:hello@greenitcommunity.com"
            className="inline-flex gap-x-4"
          >
            <img src={MailIcon} className="w-7 h-7 self-center" />
            <h1 className="text-xs md:text-lg self-center pt-1">
              hello@greenitcommunity.com
            </h1>
          </a>
          <div className="flex flex-row gap-x-4 justify-center mt-3">
            {[
              {
                href: "https://www.instagram.com/greenitcommunity/",
                children: (
                  <img
                    src={InstagramIcon}
                    className="w-8 h-8 mt-2 self-start"
                  />
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
        <UXFormulaire />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
