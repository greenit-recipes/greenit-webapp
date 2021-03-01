import React, { createRef } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import { Icon, Navbar } from "../../components";
import photo from "../../components/recipe/asdf.jpg";

const RecipeSinglePage = () => {
  // @ts-ignore
  const { id } = useParams();
  const player = createRef<ReactPlayer>();

  return (
    <div>
      <Navbar />
      <div className="w-5/6 h-full | ml-auto mr-auto mt-10  | flex flex-col">
        <div className="grid grid-cols-8 gap-4 pt-20 pl-10 pr-10 justify-content-center">
          <div className="col-start-3 pl-24 col-span-4">
            <h1 className="text-6xl pt-10 pb-10 flex ml-auto mr-auto ">
              Coconut Hair Mask
            </h1>
          </div>
          <div
            className="col-span-3 col-start-3 ml-32 rounded-3xl"
            style={{
              height: "28em",
              background: `url('${photo}')`,
              backgroundSize: "cover",
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="col-start-3 pt-10 pb-20 col-span-4 flex flex-row">
            <Icon type="star" />
            <Icon type="category" />
            <Icon type="duration" />
            <Icon type="difficulty" />
          </div>
          <div className="col-start-2 col-span-4">
            <h1 className="text-3xl text-gray-500 pb-10">Description</h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia pretium metus quis sollicitudin. Nulla rutrum porta enim, ac
            vehicula lacus. Sed gravida magna diam, sed sodales lectus accumsan
            quis. Etiam pharetra, massa eget consequat tincidunt, lorem neque
            tincidunt justo, vitae aliquam enim dolor vel libero. Suspendisse
            potenti. Vivamus et scelerisque enim. Aliquam ut ligula egestas,
            ultricies massa quis, faucibus nisi. Donec laoreet cursus tortor sit
            amet auctor. Donec ac imperdiet libero. Ut non bibendum mauris.
            Nullam aliquet risus nec risus feugiat, non facilisis mi viverra.
            Nam scelerisque nec lorem non consequat. Nullam eget dapibus dolor,
            ac laoreet augue. Nulla at quam vitae dui ultricies elementum ut
            quis diam.
          </div>
          <div className="col-start-7 col-span-1">
            <h1 className="text-3xl text-gray-500">Ingredients</h1>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">500ml water</h3>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">400g flour</h3>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">10g butter</h3>
            <h1 className="text-3xl text-gray-500 pt-20">Utensils</h1>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">Pot</h3>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">Big Pan</h3>
            <h3 className="text-2xl text-gray-500 mt-1 pl-2">Plate</h3>
          </div>
          <div className="col-start-2 col-span-5 pb-32">
            <h1 className="text-3xl text-gray-500 pb-10">
              Instructions{" "}
              <small className="text-sm pl-2">Watch the video</small>
            </h1>
            <div className="pl-4 w-3/5">
              {[1, 2, 3, 4, 4.5].map((item) => (
                <div className="text-2xl shadow-lg h-20 cursor-pointer">
                  <h3
                    className="pl-10 pt-4"
                    onClick={() => {
                      // Has to be in seconds
                      player.current?.seekTo(item * 60);
                      player.current?.getInternalPlayer().playVideo();
                    }}
                  >
                    {item}
                  </h3>
                </div>
              ))}
              <ReactPlayer
                ref={player}
                url="https://www.youtube.com/watch?v=c4jOZp-EibM"
                controls={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1, rel: 0 },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeSinglePage;
