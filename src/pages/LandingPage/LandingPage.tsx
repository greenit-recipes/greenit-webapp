import React, {useEffect, useState} from "react";
import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  Loading,
  Button,
  Footer,
  SearchBar,
} from "../../components";
import useIsMobile from "../../hooks/isMobile";
import {
  body,
  wellbeing,
  money,
  planet,
  landingPageCategories,
} from "../../icons";
  Icon,
} from "../components";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import useIsMobile from "../hooks/isMobile";
import { landingPageCategories } from "../icons";
import { body, wellbeing, logo, money, planet, search, likedIconOn, likedIconOff, } from "../icons";
import ReactPlayer from "react-player";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecipesQuery } from "../../graphql";
import { Link } from "react-router-dom";
import { CategoryCircle } from "./Components/CategoryCircle";
import { useSendMessageMutation } from "../graphql";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const SearchBar: React.FC<{
  size?: "small" | "large";
  setValue?: (val: string) => void;
  value?: string;
  onSubmit?: () => void;
  hideSearchIcon?: boolean;
}> = ({ size = "large", value, setValue, onSubmit, hideSearchIcon }) => {
  const isLarge = size === "large";
  const history = useHistory();
  const totalSize = `w-full h-14 md:h-${isLarge ? "16" : "14"}`;
  const iconSize = `w-16 md:w-${isLarge ? "16" : "14"} h-14 md:h-${
    isLarge ? "16" : "14"
  }`;
  const handleSubmit = () => {
    if (!onSubmit) {
      history.push(
        `/recipes/?search=${
          (document.getElementById("search") as HTMLInputElement)?.value
        }`
      );
    } else {
      onSubmit();
    }
  };
  return (
    <div className={`${totalSize} | flex | relative`}>
      <input
        type="text"
        className={`w-full h-full focus:outline-none | rounded-full shadow-xl | text-xs md:text-xl | pl-5`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Recherche une recette, un ingrédient..."
        id="search"
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        {...(value
          ? {
              value,
            }
          : {})}
      />
      {!hideSearchIcon && (
        <div
          className={`${iconSize} | flex absolute -right-0 | rounded-full cursor-pointer`}
          style={{ backgroundColor: "" }}
        >
          <img
            src={search}
            className={`w-10 h-10 md:h-${isLarge ? "10" : "9"} md:w-${
              isLarge ? "10" : "9"
            } | self-center | ml-auto mr-auto | md:mr-10`}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      )}
    </div>
  );
};

interface CategoryCircleProps {
  name: string;
  icon: string;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ name, icon }) => {
  const isTag = ["Premiers pas", "Zéro-déchet", "Ingrédients du frigo"].includes(
    name
  );
  return (
    <div className="flex flex-col | items-center | max-w-28">
      <div className="w-20 h-20 md:w-28 md:h-28 | bg-white rounded-full shadow-lg">
        <Link to={`/recipes?${isTag ? `tags=${name}` : `category=${name}`}`}>
          <img
            className="max-h-full max-w-full p-3 | ml-auto mr-auto | flex place-self-center"
            src={icon}
          ></img>
        </Link>
      </div>
      <h3 className="pt-2 text-md md:text-lg"> {name} </h3>
    </div>
  );
};

interface NewsletterRegProps{
  name: string;
  value: string;
  type: "textarea" | "text";
  onChange: (e: any) => void;
}

const NewsletterReg: React.FC<NewsletterRegProps> = ({
  name,
  type,
  value,
  onChange,
}) => {
  const fieldClass = "mb-8 text-xl h-12 w-full shadow-lg rounded-lg pl-4";
  return (
    <div className="w-full h-full">
        <input
          type="text"
          placeholder="@"
          name={name}
          className={fieldClass}
          value={value}
          onChange={onChange}
        ></input>
    </div>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery({
    variables: { first: 10 },
  });
  const [message, setMessage] = useState<string | null>(null);
  const [state, setState] = useState<Record<string, string>>({
    email: "",
  });
  const handleChange = (e: any) => {
    setState((prevState: Record<string, string>) => {
      return {
        ...prevState,
        [(e.target as HTMLTextAreaElement)
          .name]: (e.target as HTMLTextAreaElement).value,
      };
    });
  };
  useEffect(() => {
    if (message !== null) {
      toggleMessage();
    }
  }, [message]);
  const [sendMessage] = useSendMessageMutation({
    onError: (err) => {
      console.log("err", err);
    },
    onCompleted: (data) => {
      setMessage(
        data.sendMessage?.ok
          ? "Envoyé avec succès!"
          : data.sendMessage?.message === "Internal Error"
          ? "Erreur interne, merci d'essayer plus tard."
          : "Captcha non valide!"
      );
    },
  });
  const toggleMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  const isSuccess = message === "Envoyé avec succès!";
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <div className="landingpage_bg_1 | w-32 h-32 md:w-56 md:h-56"></div>
      <div className="landingpage_bg_2 | w-36 h-36 md:w-72 md:h-72"></div>
      <div className="landingpage_bg_3 | w-32 h-32 md:w-56 md:h-56"></div>
      <div className="landingpage_bg_4 | w-32 h-32 md:w-56 md:h-56"></div>
      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <h1 className="text-3xl md:text-5xl | pb-16 text-center">
          L’espace de la production maison, <br/> pour une nouvelle consommation 
        </h1>
        <div className="w-full | md:w-9/12">
          <SearchBar />
        </div>
      </Container>
      <div className="w-screen md:w-3/5 | items-center pt-14 pb-16 text-center">
        {isMobile ? (
          <AliceCarousel
            mouseTracking
            autoWidth
            infinite
            disableButtonsControls={isMobile}
            items={landingPageCategories.map((item) => (
              <CategoryCircle
                name={item.title}
                icon={item.icon}
                key={item.title}
              />
            ))}
          />
        ) : (
          <Grid
            type="col"
            gap="8"
            size={{
              default: 6,
            }}
          >
            {landingPageCategories.map((item) => (
              <CategoryCircle
                name={item.title}
                icon={item.icon}
                key={item.title}
              />
            ))}
          </Grid>
        )}
      </div>
      <Container title="Les recettes de la semaine" itemsCenter padding={isMobile}></Container>
      <div className="w-full md:w-5/6 mb-10 recipesOfTheWeekCarousel flex flex-row">
        <AliceCarousel
          mouseTracking
          autoWidth={!isMobile}
          infinite
          activeIndex={0}
          disableButtonsControls={isMobile}
          paddingLeft={10}
          items={
            data?.allRecipes
              ? data.allRecipes?.edges.map((recipe, index) => (
                  <>
                    {isMobile ? (
                      <div
                        key={index}
                        className="w-full flex justify-center mb-2 pt-10"
                      >
                        <RecipeCard
                          recipe={recipe?.node}
                          key={index}
                          inCarousel={true}
                        />
                      </div>
                    ) : (
                      <RecipeCard
                        recipe={recipe?.node}
                        key={index}
                        inCarousel={true}
                      />
                    )}
                  </>
                ))
              : [<Loading />]
          }
        />
      </div>
      <Container
        title="Nos tutos vidéos pour commencer"
        className="w-screen md:3/5 h-80 md:h-96 text-center mt-8"
        itemsCenter
      >
        <Grid
          type="col"
          gap="14"
          size={{
            default: 1,
            md: 2,
          }}
          className="pt-4 w-11/12 max-w-5xl h-full"
        >
          <div className="relative">
            <ReactPlayer
              url="https://youtu.be/ZeNRzJg0CKo"
              className="absolute top-0 left-0"
              controls={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, rel: 0 },
                },
              }}
              width="100%"
              height="100%"
            />
          </div>
          {!isMobile && (
            <div className="relative">
              <ReactPlayer
                url="https://youtu.be/tHAWH6fUqEo"
                className="absolute top-0 left-0"
                controls={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1, rel: 0 },
                  },
                }}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </Grid>
      </Container>

      <Container
        className="w-full md:3/5 h-full mt-28"
        margin={20}
        title="Crée ton espace perso"
        itemsCenter
        padding={isMobile}
      >
        <Grid
          type="row"
          gap="0"
          size={{
            default: 2,
          }}
        >
          <div className="grid mb-8">
            <h3 className="text-lg md:text-xl | text-center whitespace-pre-line">
              Commence ton carnet de recettes,
              {"\n"} et partage ton savoir
            </h3>
          </div>
          <div className="flex justify-center h-22">
            <img src={likedIconOff} className="-ml-6 w-16 h-16" alt="liked button"/>
            <img src={likedIconOn} className="absolute ml-8 | w-16 h-16" alt="liked button"/>
          </div>
          
        </Grid>

        <div className="">
          <button className="button_orange">
            <h2 className="text-lg md:text-xl">Créer mon profil</h2>
          </button>
        </div>

      </Container>

      <Container
        className="mt-26"
        title="Pourquoi Greenit?"
        margin={5}
        itemsCenter
        padding={isMobile}
      >
        <Grid
          type="col"
          gap="8 md:gap-15"
          size={{
            default: 2,
            sm: 4,
          }}
          className="text-center mt-8 md:mt-0"
        >
          {[
            { text: "Pour la planète", color: "#c2e69c", icon: planet },
            { text: "Pour ton corps", color: "#ffe390", icon: body },
            { text: "Pour tes économies", color: "#ffbea8", icon: money },
            { text: "Pour ton esprit", color: "#93c5fe", icon: wellbeing },
          ].map((item) => (
            <div className="h-full w-full flex flex-col items-center">
              <img
                src={item.icon}
                className="w-28 h-28 md:w-32 md:h-32 pb-2"
              ></img>
              <h2 className="text-md md:text-xl" style={{ color: item.color }}>
                {item.text}
              </h2>
            </div>
          ))}
        </Grid>
        <h3 className="mt-10 mb-6 text-md md:text-xl text-center">
          Greenit est une initiative visant à encourager une consommation <br/> 
          plus durable et responsable.
        </h3>
        <button className="button_reserver">
          <Link to="/why" className="text-lg md:text-xl">
            <h3> En savoir plus </h3>
          </Link>
        </button>
      </Container>

      <Container
        className="w-full md:3/5 h-full mt-26"
        margin={20}
        itemsCenter
        padding={isMobile}
      >
        <h1 className="text-xl md:text-3xl | text-center whitespace-pre-line">
        Inscris toi à la newsletter pour découvrir des astuces DIY
        {"\n"} et être au courant des nouvelles recettes !
        </h1>
        <div className="h-auto w-screen flex flex-col">
          <div
            className={`${
              message ? "navBar_fadeIn" : "navBar_fadeOut"
            } w-4/5 md:w-96 h-10 mt-5 self-center items-center fixed text-center shadow-lg bg-white`}
          >
            <h3
              className={`text-base lg:text-lg ${
                isSuccess ? "text-green-400" : "text-pink-700"
              }`}
            >
              <div className="inline-flex gap-x-2 items-center">
                {isSuccess ? (
                  <CheckCircleOutlined />
                ) : (
                  <ExclamationCircleOutlined />
                )}
                <h3>{message}</h3>
              </div>
            </h3>
          </div>
          <div className="h-auto text-center items-center px-10 text-3xl self-center md:w-2/6">
            <form
              className={`flex flex-col ${isMobile && "order-last"}`}
              onSubmit={(e) => {
                e.preventDefault();
                  sendMessage({ variables: { data: state } });
              }}
            >
              <div className="md:flex md:flex-row justify-center self-center mt-10 md:gap-x-4 w-full md:max-h-12">
                <NewsletterReg
                  name="email"
                  type="text"
                  value={state.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <input
                  type="submit"
                  value="Rejoindre"
                  className="button_contact | text-xl shadow-lg"
                  style={{
                    cursor: state.token ? "pointer" : "not-allowed",
                  }}
                ></input>
              </div>
            </form>
          </div>
        </div>

        <div className="text-xs md:text-sm text-center lg:mx-80 pt-8 md:w-2/6">
          Nous utilisons cette newsletter uniquement pour garder notre communauté
          informée des évolutions de Greenit ainsi que pour connaître vos avis
          sur certaines décisions. Vous pouvez vous désinscrire
          à tout moment en nous contactant à hellogreenit@gmail.com.
        </div>

      </Container>

      <Footer />
    </div>
  );
};

export default LandingPage;
