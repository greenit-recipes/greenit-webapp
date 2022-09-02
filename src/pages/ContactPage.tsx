import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "components/layout/Footer";
import {
  pinterestIcon,
  tiktokIcon,
  InstagramIcon,
  MailIcon,
  FBIcon,
  rondIcon,
} from "../icons";
import { Helmet } from "react-helmet";
import isMobile from "hooks/isMobile";
import { AskQuestion } from "./StarterSpace/component/AskQuestion/AskQuestion";

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
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>Contactez-nous | Greenit Community</title>
        <meta
          name="description"
          content="Besoin d’aide ? Une question ? Un partenariat ? Un conseil ? Une critique ? Écrivez-nous à notre adresse ou remplissez le formulaire de contact. Nous vous répondrons !"
        />
      </Helmet>
      <div className="bg-blueL w-full h-40 md:h-52 | flex items-center justify-center">
        <h2 className="text-center text-2xl md:text-3xl">
          {isMobile() ? (
            <>
              <span className=" trait-img">
                {" "}
                C’est le moment de <br /> faire connaissance !
              </span>
            </>
          ) : (
            <>
              <span className="trait-img">
                C’est le moment de faire connaissance !
              </span>
            </>
          )}
        </h2>
      </div>
      <h2 className="text-center mt-8">Contacte-nous</h2>
      <p className="text-center font-diy text-3xl md:ml-4">
        Tous les retours sont bons à prendre !
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-9/12">
        <div className="grid justify-items-center auto-rows-max h-auto">
          <h3 className="text-center text-lg md:text-xl mt-14">
            En nous envoyant un message privé
          </h3>
          <div className="flex flex-cols mt-4 gap-3 md:pt-4">
            <a
              href="https://www.facebook.com/greenitcommunity/"
              className="hover:text-yellow sm:hover:scale-105 ease-linear"
            >
              <div className="grid w-14 items-center">
                <img src={rondIcon} className="absolute w-13" alt="icon rond" />
                <i className="bx bxl-facebook-circle text-4xl ml-2 "></i>
              </div>
            </a>
            <a
              href="https://www.instagram.com/greenitcommunity/"
              className="hover:text-yellow sm:hover:scale-105 ease-linear"
            >
              <div className="grid w-14 items-center">
                <img src={rondIcon} className="absolute w-13" alt="icon rond" />
                <i className="bx bxl-instagram-alt text-4xl ml-2"></i>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/greenit-community/"
              className="hover:text-yellow sm:hover:scale-105 ease-linear"
            >
              <div className="grid w-14 items-center">
                <img src={rondIcon} className="absolute w-13" alt="icon rond" />
                <i className="bx bxl-linkedin text-4xl ml-2"></i>
              </div>
            </a>
            <a
              href="mailto:hello@greenitcommunity.com"
              className="hover:text-yellow sm:hover:scale-105 ease-linear"
            >
              <div className="grid w-14 items-center">
                <img src={rondIcon} className="absolute w-13" alt="icon rond" />
                <i className="bx bxs-envelope text-4xl ml-2"></i>
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-center text-lg md:text-xl mt-14 mb-6">
            En remplissant ce questionnaire
          </h3>
          <AskQuestion />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
