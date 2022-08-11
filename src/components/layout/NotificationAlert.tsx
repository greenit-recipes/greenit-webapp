import React from "react";

interface NotificationAlertProps {
  text: string;
}

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  text,
}) => {
  return (
    <div className="bg-greenL fixed z-10 right-4 bottom-4 w-auto h-32 rounded-lg p-4">
      <div className="flex flex-row items-center">
        <i className="bx bxs-badge-check text-5xl self-center" />
        <div className="flex flex-col items-right w-96">
          <h3>Titre</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
