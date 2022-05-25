import React, { useEffect } from 'react';
import { Footer, Navbar } from '../components';
import useIsMobile from '../hooks/isMobile';
import {
  corpsWhy,
  logo,
  money,
  planet,
  wellbeing,
  GreenitTeam,
} from '../icons';
import communityDesktop from '../icons/community_desktop.png';
import communityMobile from '../icons/community_mobile.png';
import { Helmet } from 'react-helmet';

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
      className={`text-center ${className ?? ''}`}
      style={Object.assign(
        {
          paddingRight: isMobile ? '2.5rem' : `${padding ?? '20%'}`,
          paddingLeft: isMobile ? '2.5rem' : `${padding ?? '20%'}`,
        },
        style ?? {},
      )}
    >
      <h2 className="mt-20 text-3xl lg:text-3xl">{title}</h2>
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
      <img src={item.icon} alt={item.title} className="w-36 h-36" />
      <div className="flex flex-col">
        <h2 className="text-4xl" style={{ color: item.color }}>
          {item.title}
        </h2>
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
        behavior: 'smooth',
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
      <div className="h-auto w-full flex flex-col items-center mb-12 leading-loose">
        <Block
          style={{
            backgroundColor: '#8fb5e7',
          }}
          id="1"
          className="grid justify-items-center text-white w-full pb-20"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Greenit Community
          </h1>
          <h2 className="mt-5 text-xl lg:text-2xl md:w-2/3">
            Un projet étudiant pour le développement de modes de consommation
            plus sains.
          </h2>
          <h3 className="text-center mt-5 mb-5 text-xl md:w-2/3">
            Aujourd’hui, Greenit c’est une communauté d’humains engagés et
            proactifs qui veulent répandre un mode de production et consommation
            plus conscient.
          </h3>
        </Block>
        <div className="grid justify-items-center bg-white rounded-full h-24 w-24 lg:h-32 lg:w-32 -mt-10 lg:-mt-16">
          <img
            src={logo}
            alt="greenit logo"
            className="self-center h-20 w-20 lg:h-28 lg:w-28"
          />
        </div>

        <div className="grid justify-items-center lg:w-2/3">
          <p className="mt-5  lg:text-xl w-3/4 text-justify">
            En mars 2020, lorsque le Covid confine Andrea chez elle, Andrea
            s’intéresse à la composition de ses produits du quotidien, lassée de
            ses irritations et allergies.
            <br />
            <br />
            Convaincue de la toxicité des produits industriels, Andrea se lance
            dans sa première crème maison : une grande réussite ! <br />
            <br />
            Stimulée par cette première victoire, elle multiplie les recherches
            et découvre une passion pour le DIY.
            <br />
            <br />
            Consciente des bienfaits physiques et écologiques, elle crée avec
            Adrien, entrepreneur dans l’âme et motivé par de profondes ambitions
            écologiques, Greenit, une communauté qui supporte la production
            maison. Ces derniers s’entourent d’étudiants qui apportent leurs
            pierres à l’édifice en proposant un design, une identité de marque
            et leur aide pour développer le premier site internet lancé en juin
            2021. <br />
            <br />
            L’équipe s’agrandit à nouveau en novembre 2021 pour accueillir
            Florian, le codeur fou, qui est venu booster les ambitions de
            Greenit en apportant son savoir-faire.
          </p>
          <img
            src={GreenitTeam}
            alt="greenit equipe"
            className="rounded-lg w-full md:w-1/2 self-start justify-self-center mt-10 justify-self-center"
          ></img>
        </div>

        <h2 className=" text-center text-2xl md:text-3xl mt-20 w-3/4">
          Pourquoi faire ses produits maison ?{' '}
        </h2>

        <div className="grid grid-cols-1 grid-rows-8 md:grid-cols-2 md:grid-rows-4 items-center w-4/5 md:w-2/3 md:gap-6 mt-10">
          <img
            src={planet}
            alt="icon planet"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start justify-self-center md:mt-4 md:justify-self-end"
          ></img>
          <div className="">
            <h2 className="text-md md:text-xl text-green">Pour la planète</h2>
            <h3 className="text-md md:">
              Parlons des compositions des shampoings, des lessives, des
              liquides vaisselles : silicones, methylchloroisothiazolinone,
              polycarboxylates… La liste est longue et leurs pollutions
              environnementales catastrophiques. La production maison, c’est un
              contrôle des ingrédients et des contenants. Consommons uniquement
              le nécessaire !
            </h3>
          </div>
          <img
            src={corpsWhy}
            alt="corps bien-etre"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start mt-10 justify-self-center md:hidden"
          ></img>
          <div>
            <h2 className="text-md md:text-xl text-blue text-right">
              Pour ton corps
            </h2>
            <h3 className="text-md md: text-right">
              Ces mêmes ingrédients chimiques endommagent, irritent et
              vulnérabilisent ta peau et tes cheveux. Hélas, même dans les
              produits les plus biologiques : les perturbateurs endocriniens,
              alcool et aluminium attaquent nos corps. La production maison est
              aussi personnalisée et respecte les différences de chacun.{' '}
            </h3>
          </div>
          <img
            src={corpsWhy}
            alt="corps bien-etre"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start md:mt-4 hidden md:flex"
          ></img>
          <img
            src={money}
            alt="argent"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start justify-self-center mt-10 md:mt-4 md:justify-self-end"
          ></img>
          <div>
            <h2 className="text-md md:text-xl text-yellow">
              Pour tes économies
            </h2>
            <h3 className="text-md md:">
              27,90€ le baume réparateur bio ? 5,80€ le stick à lèvres naturel ?
              L’industrie des produits cosmétiques et ménagers ne respecte pas
              notre pouvoir d’achat. Sur Greenit, le baume revient à 6€ et le
              stick à lèvres à 1,50€.
            </h3>
          </div>
          <img
            src={wellbeing}
            alt="bien-etre"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start mt-10 justify-self-center md:hidden"
          ></img>
          <div>
            <h2 className="text-md md:text-xl text-orange text-right">
              Pour ton esprit
            </h2>
            <h3 className="text-md md: text-right">
              La production maison c’est aussi une activité manuelle et
              épanouissante. La création apporte une stimulation des sens, un
              sentiment d’accomplissement et une manière de se déconnecter, seul
              ou à plusieurs.
            </h3>
          </div>
          <img
            src={wellbeing}
            alt="bien-etre"
            className="w-28 h-28 md:w-32 md:h-32 pb-2 self-start hidden md:mt-4 md:flex"
          ></img>
        </div>
      </div>
      <Block id="4" className="grid w-full p-2 justify-items-center mb-20">
        <h2 className="text-xl md:text-2xl">
          {' '}
          Merci à toutes celles et ceux qui nous aident{' '}
        </h2>
        <div className="w-full mt-12">
          <img
            src={isMobile ? communityMobile : communityDesktop}
            alt="communauté"
          />
        </div>
      </Block>
      <Footer />
    </div>
  );
};

export default WhyPage;
