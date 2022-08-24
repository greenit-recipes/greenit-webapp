import React from "react";
import "components/layout/NotificationAlert.css";

interface NotificationAlertProps {
  text?: string;
  titre?: string;
  type?: "success" | "alert" | "error";
  hidden?: boolean;
}

interface ButtonStyle {
  BgColor: string;
  IconColor: string;
  IconStyle: string;
}

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  text,
  titre,
  type,
  hidden,
}) => {
  const style: ButtonStyle = {
    BgColor: "",
    IconColor: "",
    IconStyle: "",
  };

  switch (type) {
    case "success":
      style.BgColor = "bg-greenL";
      style.IconColor = "text-green";
      style.IconStyle = "bx bxs-badge-check";
      break;
    case "alert":
      style.BgColor = "bg-blueL";
      style.IconColor = "text-darkBlue";
      style.IconStyle = "bx bxs-info-circle";
      break;
    case "error":
      style.BgColor = "bg-redL";
      style.IconColor = "text-red";
      style.IconStyle = "bx bxs-error";
      break;
  }

  return (
    <div
      className={`${
        hidden ? "hidden" : "notification"
      } bg-greenL fixed right-4 w-auto h-auto rounded-lg p-3 md:p-4 ${
        style.BgColor
      }`}
    >
      <div className="flex flex-row items-center">
        <i
          className={`${style.IconStyle} text-5xl ${style.IconColor} self-center mr-2 md:mr-4`}
        />
        <div className="flex flex-col text-left w-80 md:w-96">
          <h3>{titre}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div
        className={`absolute right-6 rotate-45 ${style.BgColor} w-8 h-4`}
      ></div>
    </div>
  );
};
