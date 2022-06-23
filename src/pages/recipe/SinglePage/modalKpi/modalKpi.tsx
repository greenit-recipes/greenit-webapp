import useIsMobile from "hooks/isMobile";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React from "react";
import { IoEarthOutline, IoFlaskOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import "./modalKpi.css";
import { BarSelect } from "components/layout/Bar-select/BarSelect";

interface IModalKpi {
  number: number | string;
  substances: any;
  nameKpi: "plastic" | "money" | "substance";
}

interface kpi {
  colorCircle: string;
  classNameIcon: string;
  colorContent: string;
  title: string;
  symbol: string;
  mainContent: string;
  Content: string;
}

const kpiContent: {
  plastic: kpi;
  money: kpi;
  substance: kpi;
} = {
  substance: {
    colorCircle: "bg-blue",
    colorContent: "bg-blueL",
    classNameIcon: "rotate-singlePage-chimie",
    title: "Substances épargnées",
    symbol: "",
    mainContent:
      "Ici, nous parlons des substances qui posent problème dans nos produits d’hygiènes. De nombreuses associations (et Greenit) se battent contre les substances toxiques, les perturbateurs endocriniens, les allergènes, les micro-plastiques ou des résidus de pétrole de ces produits. En se concentrant sur une consommation minimaliste, naturelle et « faite-maison », les ingrédients sont maîtrisés.",
    Content:
      "Chaque recette a été comparée par son équivalent industriel : nous avons passé au crible plus de 200 produits conventionnels. Nous nous sommes basés sur les études d’UFCQuechoisir, 66 millions de consommateurs et INCI Beauty, qui détectent les substances problématiques, basées sur des avis scientifiques et décisions européennes. Une recette de shampooing anti-pelliculaire maison a été comparée à un shampooing conventionnel du même type : les substances comptabilisées sont celles qui reviennent le plus pour un même type de produit.",
  },
  money: {
    colorCircle: "bg-yellow",
    colorContent: "bg-yellowL",
    classNameIcon: "rotate-singlePage-wallet",
    title: "Argent économisé",
    symbol: "€",
    mainContent:
      "Et oui ! Faire ses produits soi-même, c’est plus économique ! D’après une étude de l’Observatoire E.Leclerc des Nouvelles Consommations et Ipsos, le DIY te ferait économiser près de 272 €, soit plus de 20 € par mois. On vous l’accorde, les premières étapes du DIY, c’est acheter les ingrédients et les ustensiles, mais ces coûts se répercutent sur le long terme : 1 kg de bicarbonate de soude vous permet de faire tous vos produits ménagers pendant plus d’1 an !",
    Content:
      "Nous avons comparé les prix de plus de 120 produits des marques les plus emblématiques avec le prix de revient des recettes (le plus grand de l’intervalle). Chaque recette est comparée avec des produits identiques, par exemple : la recette de crème pour peaux acnéiques est comparée à une crème existante pour peaux acnéiques.",
  },
  plastic: {
    colorCircle: "bg-green",
    colorContent: "bg-greenL",
    classNameIcon: "",
    title: "Plastiques évités",
    symbol: "g",
    mainContent:
      "Nous parlons ici du plastique à usage unique évité. Tu le sais déjà, l’impact du plastique à usage unique sur nos océans et notre écosystème est désastreux ! En réalisant ses produits maison, il est possible de réduire son impact en réutilisant ses pots et en préférant les contenants en verre. Votre déodorant, acheté en supermarché, pourra difficilement être récupéré, votre roll-on en verre sera nettoyé et réutilisé. Nous considérons que les ingrédients achetés pour la réalisation de recette sont en verre et réutilisés pour les recettes.",
    Content:
      "Les grands noms de la cosmétique et des produits d’hygiènes rendent accessible le poids du packaging et les grammes de plastiques utilisés sur leurs produits. Nous calculons l’équivalence entre la quantité de recette réalisée et le potentiel packaging utilisé.",
  },
};

export const ModalKpi: React.FC<IModalKpi> = ({
  nameKpi,
  number,
  substances = null,
}) => {
  const isMobile = useIsMobile();

  const iconKpi = (sizeBig: boolean = false) => {
    if (nameKpi === "substance")
      return (
        <i
          className={`${
            !sizeBig ? "absolute" : ""
          } bx bxs-vial -rotate-12 w-8 h-8 icon-position-circle bx-md`}
        ></i>
      );
    else if (nameKpi === "money")
      return (
        <i
          className={`${
            !sizeBig ? "absolute" : ""
          } bx bx-euro w-8 h-8 icon-position-circle bx-md`}
        ></i>
      );
    else if (nameKpi === "plastic")
      return (
        <i
          className={`${
            !sizeBig ? "absolute" : ""
          } bx bx-leaf w-8 h-8 icon-position-circle bx-md`}
        ></i>
      );
  };

  return (
    <>
      <div
        className={`flex ${
          isMobile ? "" : "medium-modal"
        } justify-items-center flex flex-col`}
      >
        <CircleGreenit
          colorCircle={kpiContent[nameKpi]?.colorCircle}
          icon={iconKpi()}
          symbol={kpiContent[nameKpi]?.symbol}
          number={number}
          text={kpiContent[nameKpi]?.title}
        />
        <div className="mt-2">
          {nameKpi === "substance" &&
            substances.map((item: any, index: any) => (
              <div key={index}>
                <BarSelect
                  title={item?.name}
                  amount="1"
                  componentParent={
                    <div className="rounded-b bg-greyL">
                      <div className="w-5/6 ml-6 lg:w-4/6">
                        <h2 className="pt-4 fontQSemibold">Caractéristiques</h2>
                        <div>{item?.groupSubs}</div>
                        <h2 className="pt-4 fontQSemibold">
                          Effets indésirables
                        </h2>
                        <div className="pb-2">{item?.effect}</div>
                      </div>
                    </div>
                  }
                ></BarSelect>
              </div>
            ))}
        </div>
        <div className="border-kpi"></div>
        <div className="text-lg fontQSmedium text-center mb-4 mt-4">
          D’où viennent ces chiffres ?
        </div>
        <div
          className={`m-2 lg:m-6 w-auto rounded-2xl relative ${kpiContent[nameKpi]?.colorContent}`}
        >
          <div className="p-6">
            <div className="absolute positionCircleModalKpi">
              <CircleGreenit
                colorCircle={kpiContent[nameKpi]?.colorCircle}
                icon={iconKpi(true)}
              />
            </div>
            <div className="text-lg text-center mb-4">
              {kpiContent[nameKpi]?.title}
            </div>
            <div className="text-sm">{kpiContent[nameKpi]?.mainContent}</div>
            <div className="text-lg fontQSmedium text-center mb-2 mt-2">
              Comment calculons-nous ?
            </div>
            <div className="text-sm">{kpiContent[nameKpi]?.Content}</div>
          </div>
        </div>
        <div className="w-5/6 lg:w-4/6 m-auto">
          <div className="fontQSregular text-xs text-center mt-2 ">
            Vous voulez participer à cette révolution vers le DIY ? Vous voulez
            nous aider et améliorer notre système de calcul ? Vous avez des
            retours à nous faire ? Vous avec des questions ?
          </div>
          <div className="fontQSregular mt-2 text-xs text-center">
            Contactez-nous par mail ou sur nos réseaux !
          </div>
        </div>
      </div>
    </>
  );
};
