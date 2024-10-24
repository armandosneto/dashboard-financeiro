"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([9999, 9999]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default useWindowSize;
