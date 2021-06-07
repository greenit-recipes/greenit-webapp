import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";
import { body, logo, money, planet, wellbeing } from "../icons";

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
            Un projet étudiant pour le developpement de modes de consommation
            saine
          </h2>
          <h3 className="mt-5 mb-5 text-xl">
            Aujourd’hui, Greenit c’est une communauté d’humains engagés et
            proactifs qui veulent reprendre le controle sur leur consommation.
          </h3>
        </Block>

        <img
          src={logo}
          className="h-24 w-24 lg:h-36 lg:w-36 -mt-10 lg:-mt-20"
        />

        <Block title="Il était une fois…">
          <p className="mt-10 lg:text-xl">
            En mars 2020 lorsque le covid confine Andrea chez elle, Andrea
            s’intéresse à la composition de ses produits du quotidien, lassée de
            ses irritations et allergies. Convaincue de la toxicité des produits
            industriels Andrea se lance dans sa première crème maison: une
            grande réussite! Stimulée par cette première victoire elle multiplie
            les recherches et découvre une passion pour le DIY. Consciente des
            bienfaits physiques et écologiques de ce mode consommation Andrea
            s’entoure d’autre étudiants, Adrien, Idil, Aarnav et de Liam, dans
            le but de developper Greenit: une communauté qui supporte la
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
                  "Parlons des compositions des shampoings, des lessives, des liquides vaiselles: sodium laureth sulfate, methylchloroisothiazolinone, polycarboxylates.. la liste est longue et leurs pollutions environnementales catastrophique. La production maison c’est zero dechet et pas de génocide de micro-organisme.",
              },
              {
                icon: body,
                title: "Pour ton corps",
                color: "#F2D493",
                text:
                  "Ces même ingredients chimiques endommagent, irritent et vulnérabilisent ta peau et tes cheveux. Hélas même dans les produits les plus biologiques les conservateurs, alcool et aluminium attaquent nos corps. La production maison est aussi personnalisée et respecte les differences de chacun.",
              },
              {
                icon: money,
                title: "Pour tes èconomie",
                color: "#FEC4B0",
                text:
                  "27,90€ le baume réparateur bio? 5,80€ le stick à lèvres naturel ? L’industrie des produits cosmétiques et ménagers ne respecte pas notre pouvoir d’achat. Sur Greenit le stick à lèvres revient à 1,50€ et le baume à 6€.",
              },
              {
                icon: wellbeing,
                title: "Pour ton espirit",
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
      </div>
      <Footer />
    </div>
  );
};

export default WhyPage;
