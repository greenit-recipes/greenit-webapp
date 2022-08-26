import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";
import {
  corpsWhy,
  money,
  planet,
  wellbeing,
  GreenitTeam,
  BadgeControleDesktop,
  BadgeControleMobile,
} from "../icons";
import { Helmet } from "react-helmet";
import { CircleGreenit } from "./recipe/SinglePage/CircleGreenit/CircleGreenit";

const WhyPage: React.FC = () => {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <div className="min-h-screen min-w-full">
      <Navbar />
      <Helmet>
        <title>Qui sommes-nous ? | Greenit Community</title>
        <meta
          name="description"
          content="Greenit Community cherche à devenir la plateforme référente du fait-maison. Le partage de recettes, les ateliers et les informations sont portés par une communauté de passionnés en DIY."
        />
      </Helmet>
      <div className="h-auto w-full">
        <div className="bg-blueL w-full h-64 | flex items-center justify-center">
          <h1 className="text-center">
            Greenit, la communauté qui rend accessible le fait-maison !
          </h1>
        </div>
        <div className="w-full h-auto p-6 md:p-20 | flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full">
            <h2 className="text-center md:text-right">
              Pour la petite histoire
            </h2>
            <p className="text-center font-diy text-3xl md:ml-4">
              c’est le moment faire connaissance !
            </p>
          </div>
          <p className="text-centerm d:text-right mt-4">
            En 2020, lassée de ses irritations et allergies, Andréa s’intéresse
            à la composition de ses produits du quotidien : shampooings, soins,
            crèmes, lessives… Elle est rapidement alertée par les nombreux
            ingrédients qui créent la polémique et qui sont désignés comme
            préoccupants par les scientifiques (malgré qu’ils soient largement
            autorisés !) <br /> <br /> Finalement, elle se lance dans sa
            première crème maison : une grande réussite ! Stimulée par cette
            première victoire, elle multiplie les recherches et découvre une
            passion pour le DIY.
            <br /> <br />
            Consciente des bienfaits physiques et écologiques, elle crée avec
            Adrien, entrepreneur dans l’âme et motivé par de profondes ambitions
            écologiques, Greenit, une communauté qui supporte la production
            maison.
            <br /> <br /> Ces derniers s’entourent d’étudiants qui apportent
            leurs pierres à l’édifice en proposant un design, une identité de
            marque et leur aide pour développer le premier site internet lancé
            en juin 2021. L’équipe s’agrandit à nouveau en novembre 2021 pour
            accueillir Florian qui est venu booster les ambitions de Greenit en
            apportant son savoir-faire.
          </p>
        </div>
        <div className="w-full h-auto p-6 bg-yellowL | flex flex-col items-center justify-center">
          <h2 className="text-center">
            On bouscule ces habitudes qui nous abîment
          </h2>
          <p className="text-center font-diy text-3xl">
            quand est-ce qu’on dit stop ?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 md:w-1/2">
            <div>
              <h1 className="text-center text-yellow font-diy text-5xl">
                60 000
              </h1>
              <p className="text-center">
                tonnes de plastique à usage unique rejetés par l’industrie de la
                cosmétique et de l’hygiène
              </p>
            </div>
            <div>
              <h1 className="text-center text-yellow font-diy text-5xl">
                78 %
              </h1>
              <p className="text-center">
                des produits cosmétiques français qui contiennent des molécules
                dites préoccupantes
              </p>
            </div>
          </div>
          <p className="text-center font-diy my-14 text-2xl">
            La révolution se passe à la maison !
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-16 -right-8">
            <img
              className="h-48 md:h-52"
              alt="Mon savon ? Je le fais moi-même"
              src={isMobile ? BadgeControleMobile : BadgeControleDesktop}
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full h-auto p-4 md:px-20 | flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full mt-20 md:mb-10">
            <h2 className="text-center md:text-right mb-3">
              Le fait-maison, un retour aux sources qui fait sens
            </h2>
            <p className="text-center font-diy text-3xl md:ml-4">
              4 raisons de s’y mettre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center w-4/5 md:gap-x-10 mt-10 md:mt-0">
            {[
              {
                icon: planet,
                alt: "image planet",
                title: "Pour la planète",
                text: "Parlons des compositions des shampoings, des lessives, des liquides vaisselles : silicones, methylchloroisothiazolinone, polycarboxylates… La liste est longue et leurs pollutions environnementales catastrophiques. La production maison, c’est un contrôle des ingrédients et des contenants. Consommons uniquement le nécessaire !",
              },
              {
                icon: corpsWhy,
                alt: "image santé",
                title: "Les ingrédients & ustensiles",
                text: "Ces mêmes ingrédients chimiques endommagent, irritent et vulnérabilisent ta peau et tes cheveux. Hélas, même dans les produits les plus biologiques : les perturbateurs endocriniens, alcool et aluminium attaquent nos corps. La production maison est aussi personnalisée et respecte les différences de chacun.",
              },
              {
                icon: money,
                alt: "image argent",
                title: "Pour tes économies",
                text: "27,90€ le baume réparateur bio ? 5,80€ le stick à lèvres naturel ? L’industrie des produits cosmétiques et ménagers ne respecte pas notre pouvoir d’achat. Sur Greenit, le baume revient à 6€ et estick à lèvres à 1,50€.",
              },
              {
                icon: wellbeing,
                alt: "image bien-etre",
                title: "Pour ton esprit",
                text: "La production maison c’est aussi une activité manuelle et épanouissante. La création apporte une stimulation des sens, un sentiment d’accomplissement et une manière de se déconnecter, seul ou à plusieurs.",
              },
            ].map(item => (
              <div className="flex flex-col justify-center mb-10">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-28 h-28 md:w-32 md:h-32 self-center"
                ></img>
                <h3 className="font-diy text-center text-3xl my-2">
                  {item.title}
                </h3>
                <p className="text-center md:w-4/5 self-center">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto p-2 bg-greenL | grid grid-cols-1 md:grid-cols-3 items-center justify-center md:px-20 md:py-10">
          <div>
            <h2 className="text-center md:text-left">
              Aujourd’hui, Greenit c’est…
            </h2>
            <p className="text-center md:text-left font-diy text-3xl">
              Un impact grandissant...
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 mt-10">
            <CircleGreenit
              id="recipepage-RPI-substances"
              colorCircle="bg-blue"
              icon={
                <i className="bx bxs-vial -rotate-12 absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              symbol=""
              number="10"
              text="Substances épargnées"
            />
            <CircleGreenit
              id="recipepage-RPI-argent"
              colorCircle="bg-yellow"
              icon={
                <i className="bx bx-euro absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              customClassName=""
              symbol="€"
              number="10"
              text="Argent économisé"
            />
            <CircleGreenit
              id="recipepage-RPI-plastique"
              colorCircle="bg-green"
              icon={
                <i className="bx bx-leaf absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              customClassName=""
              symbol="g"
              number="200"
              text="Plastiques évités"
            />
          </div>
          <p className="my-14 text-center font-diy text-3xl">
            et ça continue !
          </p>
        </div>
        <div className="flex flex-col justify-center md:px-20">
          <h2 className="text-center mt-10 md:text-left ">
            Notre équipe fondatrice
          </h2>
          <img
            src={GreenitTeam}
            alt="greenit equipe"
            className="rounded-lg w-full md:w-1/2 mt-10 self-center"
          ></img>
        </div>
        <p className="my-14 text-center font-diy text-3xl">
          et c’est grâce à vous que le projet continue !
        </p>
        <div className="w-full h-auto p-2 bg-blueL | flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full md:px-20 md:mt-10">
            <h2 className="text-center md:text-left md:mr-5">
              Nous ne sommes pas parfaits !
            </h2>
            <p className="text-center md:text-left font-diy text-3xl">
              mais nous faisons de notre mieux
            </p>
          </div>
          <div className="grid md:gap-10 md:flex md:flex-rows mb-10 md:mt-10 justify-center">
            <img
              src={GreenitTeam}
              className="flex rounded-full justify-self-center w-40 md:w-80 md:h-80 my-4"
            ></img>
            <div className="flex flex-col p-4 md:justify-center">
              {[
                {
                  text: "✅ 100% made in chez moi",
                },
                {
                  text: "✅ Des ingrédients sélectionnés qui ne nous veulent pas du mal",
                },
                {
                  text: "✅ Des recettes confectionnées et validées par la communauté",
                },
                {
                  text: "✅ Côté kit, des contenants en verre ou en carton recyclable",
                },
                {
                  text: "⏳ Une logistique qui se veut éco-responsable",
                },
                {
                  text: "⏳ Des ingrédients produits en France ou Europe proche",
                },
              ].map(item => (
                <p className="md:mb-4"> {item.text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WhyPage;
