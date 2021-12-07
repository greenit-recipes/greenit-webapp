import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Grid } from "components";
import useIsMobile from "../hooks/isMobile";
import { corpsWhy, logo, money, planet, wellbeing } from "../icons";
import communityDesktop from "../icons/community_desktop.png";
import communityMobile from "../icons/community_mobile.png";

const Block: React.FC<{
  id: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  padding?: string;
}> = ({ id, children, title, style, className, padding }) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`text-center ${className ?? ""}`}
      style={Object.assign(
        {
          paddingRight: isMobile ? "2.5rem" : `${padding ?? "20%"}`,
          paddingLeft: isMobile ? "2.5rem" : `${padding ?? "20%"}`,
        },
        style ?? {}
      )}
    >
      <h1 className="mt-20 text-3xl lg:text-3xl">{title}</h1>
      {children}
    </div>
  );
};

const WhyBlock: React.FC<{
  item: {
    id: number;
    icon: string;
    title: string;
    color: string;
    text: string;
  };
}> = ({ item }) => {
  return (
    <div className="flex flex-col items-center" key={item.id.toString()}>
      <img src={item.icon} className="w-36 h-36" />
      <div className="flex flex-col">
        <h1 className="text-4xl" style={{ color: item.color }}>
          {item.title}
        </h1>
        <p className="text-xl w-4/5 self-center mt-5">{item.text}</p>
      </div>
    </div>
  );
};
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
    <div className="min-h-screen min-w-screen">
      <Navbar />
      <div className="h-auto w-full flex flex-col items-center mb-20 leading-loose">
        <Block
          style={{
            backgroundColor: "#8fb5e7",
          }}
          id="1"
          className="grid justify-items-center text-white w-full pb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">Greenit</h1>
          <h2 className="mt-5 text-xl lg:text-2xl md:w-2/3">
            Un projet étudiant pour le développement de modes de consommation
            plus sains.
          </h2>
          <h3 className="text-center mt-5 mb-5 text-xl md:w-2/3">
            Aujourd’hui, Greenit est une communauté d’humains engagés et
            proactifs qui cherchent à reprendre le contrôle sur leurs
            consommations.
          </h3>
        </Block>
        <div className="grid justify-items-center bg-white rounded-full h-24 w-24 lg:h-32 lg:w-32 -mt-10 lg:-mt-16">
          <img src={logo} className="self-center h-20 w-20 lg:h-28 lg:w-28" />
        </div>

        <div className="grid justify-items-center lg:w-2/3">
          <p className="mt-5 text-base lg:text-xl text-center w-3/4">
            En mars 2020, avec le confinement, Andréa s’intéresse à la
            composition de ses produits du quotidien, lassée de ses irritations
            et allergies. Convaincue de la toxicité des produits industriels,
            elle se lance dans sa première crème maison : une grande réussite !
            Stimulée par cette première victoire, elle multiplie les recherches
            et découvre une passion pour le DIY. Consciente des bienfaits
            physiques et écologiques de ce mode de consommation, Andrea
            s’entoure d’autres étudiants, Adrien, Idil, Aarnav et de Liam, dans
            le but de développer Greenit : une communauté qui supporte la
            production maison.
          </p>
          <img
            src={
              "https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            }
            className="rounded-lg w-full md:w-1/2 self-start justify-self-center mt-10 justify-self-center"
          ></img>
        </div>

        <h1 className=" text-center text-2xl md:text-3xl mt-20 w-3/4">
          Pourquoi faire ses produits maison ?{" "}
        </h1>

        <div className="grid grid-cols-1 grid-rows-8 md:grid-cols-2 md:grid-rows-4 items-center w-4/5 md:w-2/3 md:gap-6 mt-10">
          <img
            src={planet}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start justify-self-center md:mt-4 md:justify-self-end"
          ></img>
          <div className="">
            <h1 className="text-md md:text-xl text-green">
              Pour la planète
            </h1>
            <h3 className="text-md md:text-base">
              Parlons des compositions des shampoings, des lessives, des
              liquides vaiselles : sodium laureth sulfate,
              methylchloroisothiazolinone, polycarboxylates… La liste est longue
              et leurs pollutions environnementales catastrophiques. La
              production maison c’est zero déchet et pas de génocide de
              micro-organisme.
            </h3>
          </div>
          <img
            src={corpsWhy}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start mt-10 justify-self-center md:hidden"
          ></img>
          <div>
            <h1 className="text-md md:text-xl text-blue text-right">
              Pour ton corps
            </h1>
            <h3 className="text-md md:text-base text-right">
              Ces mêmes ingredients chimiques endommagent, irritent et
              vulnérabilisent ta peau et tes cheveux. Hélas, même dans les
              produits les plus biologiques les conservateurs, alcool et
              aluminium attaquent nos corps. La production maison est aussi
              personnalisée et respecte les différences de chacun.{" "}
            </h3>
          </div>
          <img
            src={corpsWhy}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start md:mt-4 hidden md:flex"
          ></img>
          <img
            src={money}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start justify-self-center mt-10 md:mt-4 md:justify-self-end"
          ></img>
          <div>
            <h1 className="text-md md:text-xl text-yellow">
              Pour tes économies
            </h1>
            <h3 className="text-md md:text-base">
              27,90€ le baume réparateur bio ? 5,80€ le stick à lèvres naturel ?
              L’industrie des produits cosmétiques et ménagers ne respecte pas
              notre pouvoir d’achat. Sur Greenit, le stick à lèvres revient à
              1,50€ et le baume à 6€.
            </h3>
          </div>
          <img
            src={wellbeing}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start mt-10 justify-self-center md:hidden"
          ></img>
          <div>
            <h1 className="text-md md:text-xl text-orange text-right">
              Pour ton esprit
            </h1>
            <h3 className="text-md md:text-base text-right">
              La production maison c’est aussi une activité manuelle et
              épanouissante. La création apporte une stimulation des sens, un
              sentiment d’accomplissement et une manière de se déconnecter, seul
              ou à plusieurs.
            </h3>
          </div>
          <img
            src={wellbeing}
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start hidden md:mt-4 md:flex"
          ></img>
        </div>
        <Block
          id="4"
          title="Merci à toutes celles et ceux qui nous aident"
          className="w-full lg:w-5/6 min-h-0"
        >
          <img
            src={isMobile ? communityMobile : communityDesktop}
            className="h-full w-full mt-20 mb-10"
          />
        </Block>
      </div>
      <Footer />
    </div>
  );
};

export default WhyPage;
