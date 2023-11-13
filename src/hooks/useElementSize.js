import { useState, useEffect, useRef } from "react";

function useElementSize() {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const updateSize = (entries) => {
      if (entries[0].contentRect) {
        const { width, height } = entries[0].contentRect;
        setElementSize({ width, height });
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [elementSize, elementRef];
}
export default useElementSize;
