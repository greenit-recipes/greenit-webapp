import React from "react";
import { Grid } from "../";
import { footerChat, footerWorld, footerValues } from "../../icons";

export const Footer: React.FC = () => {
  return (
    <div className="h-auto  w-full | flex flex-col | items-center | bg-gray-200">
      <Grid
        type="col"
        gap="8"
        size={{
          default: 3,
        }}
        className="pt-10 w-4/6"
      >
        {[
          {
            icon: footerWorld,
            title: "Multidisciplinary",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat tortor velit, lacinia vulputate sapien maximus vel. Pellentesque metus enim, porta varius est id, suscipit viverra neque. Maecenas consequat lectus vel dui convallis, malesuada semper dolor tincidunt. Nam et neque nunc.",
          },
          {
            icon: footerChat,
            title: "Collective",
            text:
              "Maecenas malesuada semper pulvinar. Suspendisse interdum vehicula metus, non imperdiet nunc imperdiet in. Sed facilisis felis in nisl condimentum, eget faucibus mauris rhoncus. Cras enim neque, vestibulum sed dui vel, auctor dignissim lectus. Pellentesque ac purus malesuada, hendrerit purus vel, ultrices metus. ",
          },
          {
            icon: footerValues,
            title: "Transparent",
            text:
              "Nulla nibh ante, pharetra nec magna eu, varius egestas libero. Sed tincidunt magna odio, nec molestie magna ultrices tincidunt. Proin orci tellus, varius quis est nec, ornare imperdiet lorem. Nunc convallis non augue at scelerisque. Morbi mi arcu, rhoncus at risus in, commodo suscipit metus.",
          },
        ].map((item) => (
          <div className="flex flex-col">
            <div className="flex">
              <img
                src={item.icon}
                className="h-20 w-20"
                alt={`${item.title} Icon`}
              />
              <h3 className="text-2xl pl-2 flex self-center">{item.title}</h3>
            </div>
            <div className="pt-5">{item.text}</div>
          </div>
        ))}
      </Grid>
      <h3 className="text-xl pt-5">
          hellogreenit@gmail.com
      </h3>
      <h3 className="text-md pt-5">
        © Copyright Greenit Community 2021. All rights reserved.
      </h3>
    </div>
  );
};
