import tween from "@tweenjs/tween.js";

const clone = <T>(val: T): T => JSON.parse(JSON.stringify(val));

export const tweenOnce = <T>({
  duration,
  start,
  end,
  onChange
}: {
  duration?: number;
  start: T;
  end: T;
  onChange: (val: T) => void;
}) => {
  const startClone = clone(start);
  const endClone = clone(end);

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

  tw.to(endClone, duration || 300)
    .onUpdate(() => {
      onChange(clone((startClone as unknown) as T));
    })
    .onComplete(() => {
      isAnimating = false;
    })
    .start();

  return {
    stop: () => {
      isAnimating = false;
    }
  };
};
