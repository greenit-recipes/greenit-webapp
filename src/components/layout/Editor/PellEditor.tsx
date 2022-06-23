import React, { useEffect, useState } from "react";
import { init } from "pell";
import "pell/dist/pell.css";

const PellEditorGreenit: React.FC<{
  onChange?: any;
  value?: any;
  innerRef?: any;
}> = ({ onChange, value, innerRef }) => {
  let editor = null;
  const [html, setHtml] = useState(value ?? "");
  useEffect(() => {
    editor = init({
      // @ts-ignore
      element: document.getElementById("editor"),
      onChange: html => onEditorStateChange(html),
      actions: ["bold", "underline", "italic", "link"],
    });
    //Default value
    editor.content.innerHTML = html;
  }, []);

  const onEditorStateChange = (editorState: any) => {
    setHtml(editorState);
    onChange(editorState);
  };

  return (
    <div
      ref={innerRef}
      id="editor"
      className="pell border bg-white rounded-lg overflow-y-auto"
    ></div>
  );
};

//We are using forward Ref since FC component do not support it directly, and it's used by react hook form
//https://stackoverflow.com/questions/56484686/how-do-i-avoid-function-components-cannot-be-given-refs-when-using-react-route
export const PellGreenit = React.forwardRef((props, ref) => (
  <PellEditorGreenit innerRef={ref} {...props} />
));
