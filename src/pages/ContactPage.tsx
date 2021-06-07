import React, { useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
import useIsMobile from "../hooks/isMobile";
import { useSendMessageMutation } from "../graphql";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { pinterestIcon, tiktokIcon } from "../icons";

interface FormItemProps {
  name: string;
  title: string;
  value: string;
  type: "textarea" | "text";
  onChange: (e: any) => void;
}
const FormItem: React.FC<FormItemProps> = ({
  name,
  title,
  type,
  value,
  onChange,
}) => {
  const fieldClass = "w-full text-lg border-2 pl-2 border-2 border-gray-500";
  return (
    <div
      className={`${
        type === "textarea" ? "w-full" : ""
      } flex flex-col gap-x-4 self-start`}
    >
      <h3 className="text-xl self-start">{title}</h3>
      {type === "text" ? (
        <input
          type="text"
          name={name}
          className={fieldClass}
          value={value}
          onChange={onChange}
        ></input>
      ) : (
        <textarea
          rows={5}
          name={name}
          className={fieldClass}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};

const ContactPage = () => {
  const isMobile = useIsMobile();
  const [message, setMessage] = useState<string | null>(null);
  const [state, setState] = useState<Record<string, string>>({
    message: "",
    name: "",
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
  return (
    <div>
      <Navbar />
      <div className="h-auto w-screen flex flex-col">
        <div
          className={`${
            message ? "navBar_fadeIn" : "navBar_fadeOut"
          } w-4/5 lg:w-96 h-10 mt-5 self-center items-center fixed text-center shadow-lg bg-white`}
        >
          <h3
            className={`text-base lg:text-lg ${
              message === "Success!" ? "text-green-400" : "text-pink-700"
            }`}
          >
            <div className="inline-flex gap-x-2 items-center">
              {!message ? (
                <></>
              ) : message === "Success!" ? (
                <CheckCircleOutlined />
              ) : (
                <ExclamationCircleOutlined />
              )}
              <h3>{message}</h3>
            </div>
          </h3>
        </div>
        <h1 className="ml-auto mr-auto text-2xl text-center lg:text-4xl mt-10 lg:mt-20 mb-10">
          Tous vos retours sont les bienvenue
        </h1>
        <div className="rounded-3xl h-auto text-center items-center pl-10 pr-10 flex flex-col text-3xl shadow-xl self-center lg:w-2/6 ">
          <div className="flex flex-col mb-10">
            <a
              href="mailto:hellogreenit@gmail.com"
              className="inline-flex gap-x-4"
            >
              <MailOutlined />
              <h3 className="text-lg self-center pt-1">
                hellogreenit@gmail.com
              </h3>
            </a>
            <div className="flex flex-row gap-x-4 justify-center mt-3">
              {[
                {
                  href: " https://www.instagram.com/greenitcommunity/",
                  children: <InstagramOutlined className="pr-2" />,
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

          <form
            className={`flex flex-col ${isMobile && "order-last"}`}
            onSubmit={(e) => {
              e.preventDefault();
              if (!state.token) {
                setMessage("Please do the captcha!");
              } else {
                sendMessage({ variables: { data: state } });
              }
            }}
          >
            <div className="lg:flex lg:flex-row lg:gap-x-8">
              <FormItem
                name="name"
                title="Nom"
                type="text"
                value={state.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <FormItem
                name="email"
                title="Email Addresse"
                type="text"
                value={state.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <FormItem
              name="message"
              title="Message"
              value={state.message}
              type="textarea"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div className="self-start mt-5">
              <HCaptcha
                languageOverride="fr"
                sitekey={process.env.REACT_APP_HCAPTCHA_ID ?? ""}
                onVerify={(token) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      token,
                    };
                  });
                }}
              />
            </div>
            <input
              type="submit"
              value="Envoyer"
              className="w-24 h-8 mt-5 text-xl ml-auto rounded-lg text-white mb-5"
              style={{
                backgroundColor: "#95cdfb",
                cursor: state.token ? "pointer" : "not-allowed",
              }}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
