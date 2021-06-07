import React, { createRef } from "react";
import ReactPlayer from "react-player";
import { useHistory, useParams } from "react-router-dom";
import { useRecipeQuery } from "../../graphql";
import { Container, Grid, Footer, Loading } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import { getSecondsFromDuration } from "../../utils";

interface InstructionProps {
  index: number;
  text: string;
}
const Instruction: React.FC<InstructionProps> = ({ index, text }) => {
  return (
    <div className="mt-5 flex inline-flex">
      <div
        className="h-10 text-xl mr-5 rounded-full inline-flex items-center justify-center bg-gray-200"
        style={{ minWidth: "2.5rem" }}
      >
        {index}
      </div>
      <h3 className="text-lg lg:text-xl">{text}</h3>
    </div>
  );
};

const RecipeSinglePage = () => {
  // @ts-ignore
  const { id } = useParams();
  const isMobile = useIsMobile();
  const history = useHistory();
  const { error, loading, data } = useRecipeQuery({
    variables: {
      id: id ?? "",
    },
  });
  const player = createRef<ReactPlayer>();
  if (loading || !data) {
    return <Loading />;
  }
  const { recipe } = data;
  return (
    <div className="flex flex-col | items-center">
      <div className="w-5/6 md:w-4/6 mb-10">
        <Container
          className="mt-10 md:mt-20 flex"
          title={recipe?.name}
          itemsCenter
        >
          {isMobile ? (
            <>
              <img
                src={`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}
                className="h-96 w-5/6 rounded-3xl mt-10"
              />
              <div className="w-full mt-10 whitespace-pre break-all flex-wrap inline-flex h-auto">
                {recipe?.tags.map((item, index) => (
                  <div
                    className="m-1 mb-2 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center h-8 cursor-pointer"
                    style={{ backgroundColor: "#888888" }}
                    onClick={() => {
                      history.push(`/recipes?tags=${item.name}`);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col self-start">
                <h3 className="pb-1 text-2xl">Ingredients</h3>
                {recipe?.ingredients.map((item) => (
                  <h3 className="text-xl pt-2">
                    {item.amount} {item.name}
                  </h3>
                ))}
              </div>
              <div className="mt-5 flex flex-col self-start">
                <h3 className="pb-1 text-2xl">Utensils</h3>
                {recipe?.utensils.map((item) => (
                  <h3 className="text-xl pt-2">{item.name}</h3>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-auto">
              <div className="flex flex-row">
                <img
                  src={`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}
                  className="w-1/4 rounded-3xl mt-10 self-start"
                  style={{ height: "28rem" }}
                />
                <div className="flex flex-col ml-10 mt-10 w-full">
                  <div className="w-full whitespace-pre break-all flex-wrap inline-flex h-11">
                    {recipe?.tags.map((item, index) => (
                      <div
                        className="m-1 mb-2 bg-black text-white pl-3 pr-3 text-md rounded-lg flex items-center cursor-pointer"
                        style={{ backgroundColor: "#888888" }}
                        onClick={() => {
                          history.push(`/recipes?tags=${item.name}`);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row w-full mt-10">
                    <div className="mt-5 flex flex-col self-start w-1/2">
                      <h3 className="pb-1 text-2xl">Ingredients</h3>
                      {/* @ts-ignore*/}
                      {recipe.ingredients.map((item) => (
                        <h3 className="text-xl pt-2">
                          {item.amount} {item.name}
                        </h3>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-col self-start">
                      <h3 className="pb-1 text-2xl">Utensils</h3>
                      {recipe?.utensils.map((item) => (
                        <h3 className="text-xl pt-2">{item.name}</h3>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
        <div className="mt-10 flex flex-col">
          <h3 className="pb-2 text-2xl lg:text-3xl">Description</h3>
          <p className="text-lg lg:text-xl">{recipe?.description}</p>
          <h3 className="pt-5 pb-2 text-2xl lg:text-3xl">Conservation</h3>
          <p className="text-lg lg:text-xl">{recipe?.expiry}</p>
        </div>
        <Grid
          type="col"
          size={{ default: 1, lg: 2 }}
          gap={isMobile ? "0" : "20"}
          className="mt-10"
        >
          <div className="h-96 w-full">
            <ReactPlayer
              url={recipe?.videoUrl}
              controls={true}
              ref={player}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, rel: 0 },
                },
              }}
              width="100%"
              height="100%"
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <h3 className="text-2xl lg:text-3xl">Instructions</h3>
            {recipe?.instructions.map((item: any, index: number) => (
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => {
                  console.log("up");
                  player.current?.seekTo(
                    getSecondsFromDuration(item.timestamp)
                  );
                  player.current?.getInternalPlayer().playVideo();
                }}
              >
                <Instruction
                  index={index + 1}
                  text={`${item.content}`}
                  key={index}
                />
              </div>
            ))}
          </div>
        </Grid>
        <div className="pt-14 flex flex-col">
          <h3 className="pb-2 text-2xl lg:text-3xl">Notes from the Author</h3>
          <p className="text-md lg:text-lg">{recipe?.notesFromAuthor}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default RecipeSinglePage;
