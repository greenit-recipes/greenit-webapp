import { getBreakpoint } from "../utils";
import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);
  const checkIsMobile = () => {
    const breakpoints = getBreakpoint();
    setIsMobile(
      !breakpoints.md || (breakpoints.xs && breakpoints.sm && !breakpoints.lg)
    );
  };
  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return isMobile;
};

export default useIsMobile;
