export default function getContainerDimensions({
  windowWidth,
  windowHeight
}: any) {
  return {
    width: windowWidth / 2,
    height: windowHeight - 60
  };
}
