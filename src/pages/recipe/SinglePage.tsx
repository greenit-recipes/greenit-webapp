import React, { createRef } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import { Icon, Navbar, Container, Grid } from "../../components";
import photo from "../../components/recipe/asdf.jpg";

interface InstructionProps {
  index: number;
  text: string;
}
const Instruction: React.FC<InstructionProps> = ({ index, text }) => {
  return (
    <div className="pt-5 flex flex-row items-center">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center">
        <h3 className="text-2xl flex flex ml-auto mr-auto">{index}</h3>
      </div>
      <h3 className="text-2xl pl-10">Stalin did nothing wrong</h3>
    </div>
  );
};
const RecipeSinglePage = () => {
  // @ts-ignore
  const { id } = useParams();
  const player = createRef<ReactPlayer>();

  return (
    <div className="flex flex-col | items-center self-center | ml-5 mr-5">
      <div className="w-4/6">
        <Container
          className="md:pt-20 flex "
          title="Lessive Express"
          itemsCenter
        ></Container>
        <div className="flex items-center">
          <div
            className="w-5/6 flex"
            style={{
              height: "28rem",
            }}
          >
            <img src={photo} className="h-full w-80 rounded-3xl" />
            <div className="flex flex-col pl-20 w-full">
              <div className="pl-10 flex flex-row">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className={`${item !== 1 ? "pl-20" : ""}`}>Tag</div>
                ))}
              </div>
              <div className="flex">
                <div className="pl-10 pt-5 flex flex-col w-1/2">
                  <h3 className="pb-2 text-2xl">Ingredients</h3>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <h3 className="text-xl pt-2">Something</h3>
                  ))}
                </div>
                <div className="pl-10 pt-5 flex flex-col">
                  <h3 className="pb-2 text-2xl">Utensils</h3>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <h3 className="text-xl pt-2">Something</h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 flex flex-col">
          <h3 className="pb-2 text-2xl">Description</h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            blandit tellus. In quis bibendum massa. Aliquam dictum velit nec
            nisi consectetur euismod. Donec rhoncus arcu ante, ut aliquam quam
            maximus vel. Vivamus blandit lobortis pulvinar. Curabitur id metus
            nulla. Nullam vel diam elementum enim efficitur feugiat. Quisque
            pharetra magna in tortor tincidunt feugiat
          </p>
          <h3 className="pt-5 pb-2 text-2xl">Conservation</h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            blandit tellus. In quis bibendum massa. Aliquam dictum velit nec
            nisi consectetur euismod. Donec rhoncus arcu ante, ut aliquam quam
            maximus vel. Vivamus blandit lobortis pulvinar. Curabitur id metus
            nulla. Nullam vel diam elementum enim efficitur feugiat. Quisque
            pharetra magna in tortor tincidunt feugiat
          </p>
        </div>
        <Grid type="col" size={{ default: 2 }} gap="0" className="pt-20">
          <div className="h-96 w-full">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=c4jOZp-EibM"
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
          <div className="pl-20">
            <h3 className="text-3xl">Instructions</h3>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div className="flex flex-col">
                <Instruction index={index + 1} text={`${item}`} />
              </div>
            ))}
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default RecipeSinglePage;