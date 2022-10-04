import { Container } from "components";
import React from "react";

interface EngagementBanner {
  className?: string;
}

export const EngagementBanner: React.FC<EngagementBanner> = ({ className }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center self-center pb-10">
      <Container className="flex flex-wrap gap-4 w-full justify-center lg:w-11/12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 | w-full px-4 my-4 lg:my-10 | lg:gap-3 ">
          {[
            {
              icon: "bx bx-home-smile",
              title: "Entreprise française",
              text: "Greenit est une entreprise française. Nous travaillons avec des marques et des producteurs français !",
            },
            {
              icon: "bx bx-phone-call",
              title: "À votre écoute",
              text: "Nous sommes à votre disposition pour quelconques questions. Nous nous engageons à vous répondre en moins de 48 h.",
            },
            {
              icon: "bx bx-heart-circle",
              title: "4.8/5 ★★★★★",
              text: "Nos clients sont satisfaits ! Notre secret : nous mettons l’humain avant tout !",
            },
            {
              icon: "bx bx-leaf",
              title: "Ingrédients séléctionnés",
              text: "Nous proposons des ingrédients de qualité avec un impact écologique le plus faible possible.",
            },
            {
              icon: "bx bxs-group",
              title: (
                <span>
                  La 1ere communauté <br /> du fait-maison
                </span>
              ),
              text: "Greenit c’est +300 passionnés, cosmétologues, aromathérapeutes et qui développent la production maison.",
            },
            {
              className: "sm:hidden",
              icon: "bx bx-check-shield",
              title: "Paiement sécurisé",
              text: "Le paiement est 100 % sécurisé, nous utilisons la plateforme de paiement agrée Stripe.",
            },
          ].map((item, index) => (
            <div
              className={`flex flex-col text-center p-2 gap-2 ${item.className}`}
            >
              <i className={` ${item.icon} text-5xl`} />
              <p className="font-diy leading-6 text-2xl lg:text-3xl">
                {item.title}
              </p>
              <p className="leading-5 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
