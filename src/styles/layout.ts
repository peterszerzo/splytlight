export default function getContainerDimensions({
  windowWidth,
  windowHeight
}: {
  windowWidth: number;
  windowHeight: number;
}) {
  return {
    width: windowWidth / 2,
    height: windowHeight - 60
  };
}
