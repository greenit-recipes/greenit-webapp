import { useState } from "react";

interface IDropdown {
  className?: string;
  id: string;
  sizeList?: string;
}

export const Dropdown: React.FC<IDropdown> = ({
  className,
  id,
  sizeList = "20px",
}) => {
  const [isTrigerButton, setTrigerButton] = useState(false);
  const isDisplay = isTrigerButton ? "absolute" : "hidden";
  const checkShouldBeChecked = (isChecked: boolean, value: string) => {};
  return (
    <div className="relative">
      <button
        id={id}
        className="flex"
        onClick={() => {
          setTrigerButton(!isTrigerButton);
        }}
      >
        <p>Clique la</p>
        {isTrigerButton && <p>--</p>}
        {!isTrigerButton && <p>!!</p>}
      </button>
      <ul className={" list-none w-24 bg-blue " + sizeList + " " + isDisplay}>
        <li>
          <input
            type="checkbox"
            name="test1"
            value="test1"
            id="test1"
            ref={"ref_" + "tes1"}
            className="w-6 h-6"
            onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
              checkShouldBeChecked(value.target.checked, value.target.value);
            }}
          />
        </li>
        <li>
          <input
            type="checkbox"
            name="test2"
            value="test2"
            id="test2"
            ref={"ref_" + "tes2"}
            className="w-6 h-6"
            onChange={(value: React.ChangeEvent<HTMLInputElement>) => {}}
          />
        </li>
      </ul>
    </div>
  );
};
