import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";
import { body, logo, money, planet, wellbeing } from "../icons";
import communityDesktop from "../icons/community_desktop.png";
import communityMobile from "../icons/community_mobile.png";

const Block: React.FC<{
  title: string;
  className?: string;
  style?: React.CSSProperties;
  padding?: string;
}> = ({ children, title, style, className, padding }) => {
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
      <h1 className="mt-20 text-3xl lg:text-5xl">{title}</h1>
      {children}
    </div>
  );
};

const WhyBlock: React.FC<{
  item: Record<string, string>;
}> = ({ item }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={item.icon} className="w-36 h-36" key="icon" />,
      <div className="flex flex-col" key="text">
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
            backgroundColor: "#9ed1fb",
            minHeight: isMobile ? "70vh" : "60vh",
          }}
          className="text-white w-full lg:pt-10"
          title="Greenit"
          padding="30%"
        >
          <h2 className="mt-5 text-xl lg:text-2xl">
            Un projet étudiant pour le développement de modes de consommation
            plus sains.
          </h2>
          <h3 className="mt-5 mb-5 text-xl">
            Aujourd’hui, Greenit est une communauté d’humains engagés et
            proactifs qui cherchent à reprendre le contrôle sur leurs
            consommations.
          </h3>
        </Block>

        <img
          src={logo}
          className="h-24 w-24 lg:h-36 lg:w-36 -mt-10 lg:-mt-20"
        />

        <Block title="Il était une fois…">
          <p className="mt-10 lg:text-xl">
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
        </Block>
        <Block
          title="Pourquoi faire ses produits maison?"
          className="flex flex-col items-center gap-y-12"
          padding="10%"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {[
              {
                icon: planet,
                title: "Pour la planète",
                color: "#a6f78d",
                text:
                  "Parlons des compositions des shampoings, des lessives, des liquides vaisselles : sodium laureth sulfate, methylchloroisothiazolinone, polycarboxylates.. la liste est longue et leurs pollutions environnementales sont catastrophiques. La production maison c’est zero déchêt et pas de génocide de micro-organismes.",
              },
              {
                icon: body,
                title: "Pour ton corps",
                color: "#F2D493",
                text:
                  "Ces mêmes ingrédients chimiques endommagent, irritent et vulnérabilisent ta peau et tes cheveux. Hélas, même dans les produits les plus biologiques, les conservateurs, alcool et aluminium attaquent nos corps. La production maison est aussi personnalisée et respecte les différences de chacun.",
              },
              {
                icon: money,
                title: "Pour tes économies",
                color: "#FEC4B0",
                text:
                  "27,90€ le baume réparateur bio? 5,80€ le stick à lèvres naturel ? L’industrie des produits cosmétiques et ménagers ne respecte pas notre pouvoir d’achat. Sur Greenit, le stick à lèvres revient à 1,50€ et le baume à 6€.",
              },
              {
                icon: wellbeing,
                title: "Pour ton esprit",
                color: "#95CDFB",
                text:
                  "La production maison c’est aussi une activité manuelle et épanouissante. La création apporte une stimulation des sens, un sentiment d’accomplissement et une manière de se déconnecter, seul ou à plusieurs.",
              },
            ].map((item) => (
              <div className="flex flex-col gap-x-22 mt-10">
                <WhyBlock item={item} />
              </div>
            ))}
          </div>
        </Block>
        <Block title="Merci à toutes celles et ceux qui nous aident" className="w-full lg:w-5/6 min-h-0 mt-10">
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
