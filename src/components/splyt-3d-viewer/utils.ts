import { useRef, useEffect } from "react";
import tween from "@tweenjs/tween.js";

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const tweenOnce = <T>({
  start,
  end,
  onChange
}: {
  start: T;
  end: T;
  onChange: (val: T) => void;
}) => {
  const startClone = JSON.parse(JSON.stringify(start));
  const endClone = JSON.parse(JSON.stringify(end));

  const group = new tween.Group();

  let isAnimating = true;

  const animate = () => {
    if (isAnimating) {
      requestAnimationFrame(animate);
    }
    group.update();
  };

  requestAnimationFrame(animate);

  const tw = new tween.Tween(startClone, group);

  tw.to(endClone)
    .onUpdate(() => {
      onChange((startClone as unknown) as T);
    })
    .onComplete(() => {
      isAnimating = false;
    })
    .start();
};
