"use client";
import { useEffect, useState, useMemo } from "react";

const useCollapsed = (collapseRule = 1260) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth(); // Atualiza o valor inicial

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const collapsed = useMemo(() => width < collapseRule, [collapseRule, width]);

  return collapsed;
};

export default useCollapsed;
