import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_LIKE_COMMENT } from "pages/recipe/SinglePage/SinglePageRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import {
    likedIconOff, likedIconOn
} from "../../icons";
import { RouteName } from "App";

interface LikeComment {
  comment: any;
  isMyComment: any;
}

export const LikeComment: React.FC<LikeComment> = ({ comment, isMyComment=false }) => {
  const [isLiked, setLiked] = useState(comment?.isLikedByCurrentUser);
  const [nbrLiked, setNbrLiked] = useState(comment?.numberOfLikes);
  const [addOrRemoveLikeComment] = useMutation(ADD_OR_REMOVE_LIKE_COMMENT);
  const isLoggedIn = authService.isLoggedIn();
  console.log("isMyComment -->", isMyComment)
  return (
    <>
      {isLoggedIn ? (
        // @ts-ignore
        <div
          className={`flex bg-white w-20 h-12 rounded-tl-2xl p-3 ${
            isMyComment ? "" : "cursor-pointer"
          }`}
          onClick={() => {
            if(isMyComment) return
            setLiked(!isLiked);
            // @ts-ignore
            setNbrLiked(!isLiked ? nbrLiked + 1 : nbrLiked - 1);
            // @ts-ignore: Object is possibly 'null'.
            addOrRemoveLikeComment({
              variables: {
                commentId: comment?.id,
              },
            });
          }}
        >
          {isLiked ? (
            <img
              src={likedIconOn}
              className="self-center w-7 h-7 lg:w-8 lg:h-8"
              alt="likes"
            />
          ) : (
            <img
              src={likedIconOff}
              className="flex self-center w-7 h-7 lg:w-8 lg:h-8 mb-1"
              alt="likes"
            />
          )}
          <h1 className="self-center text-lg md:text-xl ml-1">{nbrLiked}</h1>
        </div>
      ) : (
        <Link to={RouteName.register}>
          <div className="flex cursor-pointer bg-white w-20 h-12 rounded-tl-2xl p-3">
            <img
              src={likedIconOff}
              className="self-center w-7 h-7 lg:w-8 lg:h-8"
              alt="likes"
            />
            <h1 className="self-center text-lg md:text-xl ml-1">{nbrLiked}</h1>
          </div>
        </Link>
      )}
    </>
  );
};
