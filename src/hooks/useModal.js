import { useState } from "react";

const useToggle = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    console.log("Clicked");
    setIsShowing((isShowing) => !isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useToggle;
