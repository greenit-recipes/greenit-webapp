import { useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";
import "pages/recipe/ListPage/Components/FilterBar.css";

interface ICheckbox {
  className?: string;
  parentFunction?: any;
  isChecked: boolean;
  index: string;
  option: any;
  item: any;
}

export const Checkbox: React.FC<ICheckbox> = ({
  parentFunction,
  index,
  isChecked,
  option,
  item,
}) => {
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#8FB5E8" : "#ffff",
    borderColor: isChecked ? "#8FB5E8" : "#707070",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });
  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });
  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );
  return (
    <label
      onChange={() => {
        parentFunction(isChecked, option, item);
      }}
    >
      <input type="checkbox" />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              // @ts-ignore
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          // @ts-ignore
          strokeDasharray={checkmarkLength}
          // @ts-ignore
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
        {option.title}
    </label>
  );
};
