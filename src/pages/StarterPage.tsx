import { BackgroundImage, Container, Navbar } from "components";
import { Helmet } from "react-helmet";
import { logo, PhotoAtelier, ingredients5 } from "../icons";
import { Button } from "../components/misc";

const StarterPage = () => {
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Guide pour les débutants en DIY - Cosmétiques maison et produits
          d’hygiène
        </title>
        <meta
          name="description"
          content="Un guide simple pour débutant en DIY : des conseils et astuces, les ingrédients indispensables et des recettes simples pour débuter."
        />
      </Helmet>
      <BackgroundImage />
      <Container className="flex flex-col | md:w-3/4 mt-8 mb-4 lg:mt-28 px-8 ">
        <h1 className="text-2xl md:text-3xl text-blue font-semibold | mb-2">
          Comment se lancer ?
        </h1>
        <h2 className="text-lg md:text-2xl mb-6">
          Pour tous les curieux qui ne savent pas par où commencer dans le DIY,
          ce guide est fait pour vous !
        </h2>
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Étapes
        </h2>

        <div className="grid grid-rows-3 gap-2 py-6 justify-items-center">
          <div className="w-32 h-32 grid bg-white rounded-xl shadow-lg m-2 p-1">
            <div className="grid absolute w-10 h-10 -mt-4 -ml-4 bg-white rounded-full shadow-sm m-2">
              <h2 className="text-center self-center font-bold">1</h2>
            </div>
            <div className="grid justify-items-center">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-sm  text-center font-light">
              3 meilleurs conseils pour débuter
            </h3>
          </div>
          <div className="w-32 h-32 grid bg-white rounded-xl shadow-lg m-2 p-1">
            <div className="grid absolute w-10 h-10 -mt-4 -ml-4 bg-white rounded-full shadow-sm m-2">
              <h2 className="text-center self-center font-bold">2</h2>
            </div>
            <div className="grid justify-items-center">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-sm text-center font-light">
              Les ingrédients & ustensiles
            </h3>
          </div>
          <div className="w-32 h-32 grid bg-white rounded-xl shadow-lg m-2 p-1">
            <div className="grid absolute w-10 h-10 -mt-4 -ml-4 bg-white rounded-full shadow-sm m-2">
              <h2 className="text-center self-center font-bold">3</h2>
            </div>
            <div className="grid justify-items-center">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-sm text-center font-light">
              3 Recettes simples
            </h3>
          </div>{" "}
        </div>

        <h3 className="text-sm md:text-xl font-light">
          Débuter dans une nouvelle pratique comme le DIY peut paraître
          compliqué, tous le monde est passé par là. Voici 3 étapes simples pour
          vous lancer dans le fait-maison en débutant pas à pas.
        </h3>

        <div className="grid gap-4 justify-items-center w-full |  my-12">
          <h2 className="text-xl md:text-3xl font-regular text-center">
            Motivez-vous avec vos ami.e.s :{" "}
          </h2>
          <div className="w-72 h-12 bg-white rounded-full shadow-lg | p-1 | border-2 border-blue"></div>
        </div>
      </Container>
      <div className="grid grid-cols-2">
        <div className="grid justify-items-end w-52 h-14 bg-blue rounded-full shadow-lg | p-1 | self-start -ml-10 ">
          <div className="flex">
            <h2 className="text-xl md:text-3xl font-semibold text-center self-center mr-3">
              Étapes
            </h2>
            <div className="grid w-10 h-10 self-center items-end bg-white rounded-full shadow-sm mr-1">
              <h2 className="text-center self-center font-bold">1</h2>
            </div>
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          3 meilleurs conseils pour débuter
        </h2>
      </div>
      <Container className="flex flex-col | md:w-3/4 lg:mt-10 px-8 mb-24">
        <h3 className="text-sm md:text-xl font-light">
          Que devez-vous savoir avant de vous lancer ? Nous avons posé la
          question à des experts de la pratique.
        </h3>
        <div className="flex flex-cols w-full mt-8 mb-2">
          <div className="border-r-2 border-blue">
            <img
              src={logo}
              className="w-14 h-14 lg:w-18 mr-8"
              alt="Greenit Logo"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-base md:text-2xl font-medium">
              Le conseil de Catherine
            </h2>
            <h3 className="text-xs md:text-xl font-light">
              ingénieure et ambassadrice contre le changement climatique
            </h3>
          </div>
        </div>
        <h3 className="text-base text-blue md:text-2xl font-semibold mb-2">
          " Remplacer vos produits petit à petit "
        </h3>
        <h3 className="text-sm md:text-xl font-light">
          Remplacer vos produits petit à petit et de commencer par trouver
          l’huile végétale qui vous convient.
        </h3>
        <Button type="grey" className="w-24 self-center mt-2 mb-6">
          Lire plus
        </Button>

        <div className="flex flex-cols w-full mt-8 mb-2">
          <div className="border-r-2 border-blue">
            <img
              src={logo}
              className="w-14 h-14 lg:w-18 mr-6"
              alt="Greenit Logo"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-base md:text-2xl font-medium">
              Le conseil de Christelle{" "}
            </h2>
            <h3 className="text-xs md:text-xl font-light">
              Naturopathe et animatrice d’atelier
            </h3>
          </div>
        </div>
        <h3 className="text-base text-blue md:text-2xl font-semibold mb-2">
          "Rester sur des recettes qui fonctionnent !"
        </h3>
        <h3 className="text-sm md:text-xl font-light">
          Remplacer vos produits petit à petit et de commencer par trouver
          l’huile végétale qui vous convient.
        </h3>
        <Button type="grey" className="w-24 self-center mt-2 mb-6">
          Lire plus
        </Button>

        <div className="flex flex-cols w-full mt-8 mb-2">
          <div className="border-r-2 border-blue">
            <img
              src={logo}
              className="w-14 h-14 lg:w-18 mr-6"
              alt="Greenit Logo"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-base md:text-2xl font-medium">Nos conseils </h2>
            <h3 className="text-xs md:text-xl font-light">
              Greenit Community{" "}
            </h3>
          </div>
        </div>
        <h3 className="text-base text-blue md:text-2xl font-semibold mb-2">
          "Respectons quelques règles de base."
        </h3>
        <h3 className="text-sm md:text-xl font-light">
          Remplacer vos produits petit à petit et de commencer par trouver
          l’huile végétale qui vous convient.
        </h3>
        <Button type="grey" className="w-24 self-center mt-2 mb-6">
          Lire plus
        </Button>
      </Container>
      <div className="grid grid-cols-2">
        <div className="grid justify-items-end w-52 h-14 bg-blue rounded-full shadow-lg | p-1 | self-start -ml-10 ">
          <div className="flex">
            <h2 className="text-xl md:text-3xl font-semibold text-center self-center mr-3">
              Étapes
            </h2>
            <div className="grid w-10 h-10 self-center items-end bg-white rounded-full shadow-sm mr-1">
              <h2 className="text-center self-center font-bold">2</h2>
            </div>
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          Les ustensiles indispensables
        </h2>
      </div>
      <Container className="flex flex-col | md:w-3/4 lg:mt-10 px-8 mb-6">
        <h3 className="text-sm md:text-xl font-light">
          Quelques ustensiles sont indispensables pour se lancer dans le
          fait-maison (que tout le monde a déjà dans sa cuisine).
        </h3>
        <div className="grid grid-rows-4 md:grid-rows-1 md:grid-cols-4 justify-items-center">
          <div>
            <div className="grid justify-items-center mt-6">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-lg text-center font-semibold">Bol en inox</h3>
            <h2 className="text-base text-center">
              Pour la cuisson au bain-marie
            </h2>
            <h3 className="text-sm  text-center font-light">
              Le bol permet de faire vos préparations avant de les verser dans
              les contenants. Certaines préparations nécessitent une chauffe au
              bain-marie, l’inox est donc idéal. Il permet une cuisson uniforme
              et plus rapide. Le must ? Les bols en inox sont facilement
              lavables.
            </h3>
          </div>
          <div>
            <div className="grid justify-items-center mt-6">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-lg text-center font-semibold">Fouet</h3>
            <h2 className="text-base text-center">Pour les émulsions</h2>
            <h3 className="text-sm  text-center font-light">
              Idéal pour mélanger uniformément les préparations. L’homogénéité
              de vos produits leur permet de se conserver plus longtemps grâce
              une meilleure stabilité.
            </h3>
          </div>
          <div>
            <div className="grid justify-items-center mt-6">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-lg text-center font-semibold">Balance</h3>
            <h2 className="text-base text-center">Pour être précis</h2>
            <h3 className="text-sm  text-center font-light">
              De la même façon qu’en pâtisserie, pour une bonne texture et des
              effets maîtrisés, il faut être précis ! Une balance aux grammes
              près est donc recommandé.
            </h3>
          </div>
          <div>
            <div className="grid justify-items-center mt-6">
              <img
                src={logo}
                className="w-16 lg:w-18 self-center items-center"
                alt="Greenit Logo"
              />{" "}
            </div>
            <h3 className="text-lg text-center font-semibold">Maryse</h3>
            <h2 className="text-base text-center">Pour éviter le gaspillage</h2>
            <h3 className="text-sm  text-center font-light">
              Pour racler les fonds de bol et contenant, une maryse peut être
              utile. Plus de préparations pour vous et moins au fond de la
              poubelle.
            </h3>
          </div>
        </div>
      </Container>
      <div className="grid grid-cols-2">
        <div className="grid justify-items-end w-52 h-14 bg-blue rounded-full shadow-lg | p-1 | self-start -ml-24">
          <div className="flex">
            <h2 className="text-xl md:text-3xl font-semibold text-center self-center mr-3">
              Étapes
            </h2>
            <div className="grid w-10 h-10 self-center items-end bg-white rounded-full shadow-sm mr-1">
              <h2 className="text-center self-center font-bold">3</h2>
            </div>
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          5 ingrédients <br /> pour 2 recettes
        </h2>
      </div>
      <Container className="flex flex-col | md:w-3/4 lg:mt-10 px-8 mb-6">
        <h3 className="text-sm md:text-xl font-light mt-2 mb-6">
          Voici une sélection de recettes simples pour débuter.
        </h3>
        <div className="grid grid-cols-2 auto-rows-auto gap-y-2 | md:grid-cols-5">
          <div className="hidden md:block md:col-span-5 self-center ml-1 md:col-span-4">
            <h3 className="text-xl md:text-3xl font-semibold">Recette 1 :</h3>
            <h2 className="text-base md:text-2xl font-medium mb-2">
              Crème nourrissante
            </h2>
            <div className="grid grid-cols-2 w-40 justify-items-center mb-3">
              <div className="flex flex-cols gap-1">
                <img src={ingredients5} className="w-6 h-6"></img>
                <p>1 L</p>
              </div>
              <div className="flex flex-cols gap-1">
                <img src={ingredients5} className="w-6 h-6"></img>
                <p>0,50 €</p>
              </div>
            </div>
          </div>
          <div className="md:place-self-start justify-self-center">
            <img src={PhotoAtelier} className="w-46 h-80 rounded-2xl" />
          </div>
          <div className="block md:hidden self-center ml-1 md:col-span-4">
            <h3 className="text-xl md:text-3xl font-semibold">Recette 1 :</h3>
            <h2 className="text-base md:text-2xl font-medium mb-2">
              Crème nourrissante
            </h2>
            <div className="grid grid-cols-2 w-40 justify-items-center mb-3">
              <div className="flex flex-cols gap-1">
                <img src={ingredients5} className="w-6 h-6"></img>
                <p>1 L</p>
              </div>
              <div className="flex flex-cols gap-1">
                <img src={ingredients5} className="w-6 h-6"></img>
                <p>0,50 €</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-3 flex flex-row overflow-x-auto pb-6 mb-2 pt-14">
            <h2 className="absolute -mt-12 text-base md:text-2xl font-medium">
              Les ingrédients :
            </h2>
            <div className="flex">
              <div className="grid justify-items-center flex-row">
                <div>
                  <div className="flex flex-cols w-40">
                    <img
                      src={PhotoAtelier}
                      className="w-24 h-24 rounded-full lg:w-18 self-center items-center ml-8"
                      alt="Greenit Logo"
                    />{" "}
                    <p className="text-center text-xl self-center font-medium ml-4">
                      +
                    </p>
                  </div>
                  <div className="grid w-12 h-12 self-center bg-blue items-end bg-white rounded-full shadow-sm -mt-6 ml-6 relative z-20">
                    <p className="text-center text-sm self-center font-medium">
                      50 g
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-xl font-regular text-center m-2 w-2/3">
                  Beurre de karité
                </p>
                <h4 className="text-xs md:text-xl font-light text-center">
                  3,90 € / 100 g{" "}
                </h4>
              </div>
              <div className="grid justify-items-center flex-row">
                <div>
                  <div className="flex flex-cols w-40">
                    <img
                      src={PhotoAtelier}
                      className="w-24 h-24 rounded-full lg:w-18 self-center items-center ml-8"
                      alt="Greenit Logo"
                    />{" "}
                    <p className="text-center text-xl self-center font-medium ml-4">
                      +
                    </p>
                  </div>
                  <div className="grid w-12 h-12 self-center bg-blue items-end bg-white rounded-full shadow-sm -mt-6 ml-6 relative z-20">
                    <p className="text-center text-sm self-center font-medium">
                      20 g{" "}
                    </p>
                  </div>
                </div>
                <h3 className="text-sm md:text-xl font-light text-center m-2 w-2/3">
                  Huile végétale de ricin{" "}
                </h3>
                <h4 className="text-xs md:text-xl font-light text-center">
                  2,60 € / 100 g{" "}
                </h4>
              </div>
              <div className="grid justify-items-center flex-row">
                <div>
                  <div className="flex flex-cols w-40">
                    <img
                      src={PhotoAtelier}
                      className="w-24 h-24 rounded-full lg:w-18 self-center items-center ml-8"
                      alt="Greenit Logo"
                    />{" "}
                    <p className="text-center text-xl self-center font-medium ml-4">
                      +
                    </p>
                  </div>
                  <div className="grid w-12 h-12 self-center bg-blue items-end bg-white rounded-full shadow-sm -mt-6 ml-6 relative z-20">
                    <p className="text-center text-sm self-center font-medium">
                      2 g
                    </p>
                  </div>
                </div>
                <h3 className="text-sm md:text-xl font-light text-center m-2 w-2/3">
                  Cire d’abeille{" "}
                </h3>
                <h4 className="text-xs md:text-xl font-light text-center">
                  2,90 € / 30 g{" "}
                </h4>
              </div>
              <div className="grid justify-items-center flex-row">
                <div>
                  <div className="flex flex-cols w-40">
                    <img
                      src={PhotoAtelier}
                      className="w-24 h-24 rounded-full lg:w-18 self-center items-center ml-8"
                      alt="Greenit Logo"
                    />{" "}
                  </div>
                  <div className="grid w-12 h-12 self-center bg-grey items-end bg-white rounded-full shadow-sm -mt-6 ml-6 relative z-20">
                    <p className="text-center text-xs self-center font-medium">
                      ≈ 100ml{" "}
                    </p>
                  </div>
                </div>
                <h3 className="text-sm md:text-xl font-light text-center m-2 w-2/3">
                  Pot en verre{" "}
                </h3>
              </div>
            </div>
          </div>
          <div className="hidden | md:grid gap-3 col-span-1 justify-self-center justify-items-center p-4 w-full grid bg-white rounded-xl shadow-lg m-2 p-1">
            <h2 className="hidden | md:flex text-xl font-medium mt-4">
              Où acheter ?{" "}
            </h2>
            <p className="text-center text-lg font-light">
              Profitez d’un tarif préférentiel en achetant chez notre partenaire
              Naturalia
            </p>
            <p>9,40 €</p>
            <Button type="orange" className="w-32">
              Commander
            </Button>
            <p className="text-center text-sm text-lg font-light">
              En achetant avec ce lien, vous aidez Greenit à se rémunérer.{" "}
            </p>
          </div>
          <div className="hidden md:block"></div>
          <div className="col-span-2 md:col-span-3 place-self-start grid justify-items-center mb-4">
            <Button type="grey" className="h-12">
              Pourquoi ces ingrédients ?
            </Button>
          </div>
          <h3 className="col-span-1 text-sm font-light">
            En achetant ces ingrédients, vous pouvez faire 10 shampooings. Le
            bicarbonate de soude peut être utilisé en hygiène dentaire et en
            gommage visage.
          </h3>
          <h2 className="col-span-2 text-base md:hidden font-medium mt-4">
            Où acheter ces ingredients?{" "}
          </h2>
          <div className="grid gap-3 col-span-2 justify-self-center justify-items-center p-4 w-64 grid bg-white rounded-xl shadow-lg m-2 p-1 | md:hidden">
            <p className="text-center text-sm md:text-xl font-light">
              Profitez d’un tarif préférentiel en achetant chez notre partenaire
              Naturalia
            </p>
            <p>9,40 €</p>
            <Button type="orange" className="w-32">
              Commander
            </Button>
            <p className="text-center text-sm md:text-xl font-light">
              En achetant avec ce lien, vous aidez Greenit à se rémunérer.{" "}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StarterPage;
