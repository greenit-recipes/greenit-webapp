import { useMutation } from "@apollo/client";
import { RouteName } from "App";
import { ADD_OR_REMOVE_LIKE_COMMENT } from "pages/recipe/SinglePage/SinglePageRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import {
    LikedIconCommentOff, LikedIconCommentOn
} from "../../icons";

interface ILikeComment {
  comment: any;
  isMyComment: any;
}

export const LikeComment: React.FC<ILikeComment> = ({ comment, isMyComment=false }) => {
  const [isLiked, setLiked] = useState(comment?.isLikedByCurrentUser);
  const [nbrLiked, setNbrLiked] = useState(comment?.numberOfLikes);
  const [addOrRemoveLikeComment] = useMutation(ADD_OR_REMOVE_LIKE_COMMENT);
  const isLoggedIn = authService.isLoggedIn();
  return (
    <>
      {isLoggedIn ? (
        // @ts-ignore
        <div
          className={`flex bg-white w-14 h-8 lg:w-16 lg:h-10 rounded-tl-2xl p-2 justify-center ${
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
              src={LikedIconCommentOn}
              className="self-center w-4 h-4 lg:w-6 lg:h-6"
              alt="likes"
              loading="lazy"
            />
          ) : (
            <img
              src={LikedIconCommentOff}
              className="flex self-center w-4 h-4 lg:w-6 lg:h-6"
              alt="likes"
              loading="lazy"
            />
          )}
          <h2 className="self-center text-base lg:text-xl ml-1">{nbrLiked}</h2>
        </div>
      ) : (
        <Link to={RouteName.register}>
          <div className="flex cursor-pointer bg-white w-20 h-12 rounded-tl-2xl p-3">
            <img
              src={LikedIconCommentOff}
              className="self-center w-4 h-4 lg:w-6 lg:h-6"
              alt="likes"
              loading="lazy"
            />
            <h2 className="self-center text-lg md:text-xl ml-1">{nbrLiked}</h2>
          </div>
        </Link>
      )}
    </>
  );
};