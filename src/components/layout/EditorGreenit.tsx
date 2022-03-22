import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const EditorGreenit: React.FC<{onChange: any, value: any}> = ({ onChange, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState: any) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };


  return (
      <div className="editor">
        <Editor
          spellCheck
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="border bg-white rounded-lg"
          editorClassName="ml-2"
          toolbar={{
            options: ['inline', 'textAlign', 'history', 'link'],
            link: { inDropdown: true },
            history: { inDropdown: true },
            emoji: { inDropdown: true,     emojis: [
              '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
              '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
              '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
              '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
              '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
              '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
              '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
              '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
              '✅', '❎', '💯', '🦋', '🐞', '🌿🌱', '🌵', '🌲', '☘️', '🍀', '🌴', '🌳', '🌱', '🌿', '🌼', '🌸', 
              '🌺', '🌻', '🌞', '🌟', '⭐️', '💫☀️', '🍏', '🍎', '❤️', '🧡', '💛', '💚', '💙', '🤎', '🤍', '🖤',
              '💜', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💝', '💘', '💖', '💗', '💓', '💟🎶', '💭'
            ], },
          }}
        />
      </div>
  );
};
