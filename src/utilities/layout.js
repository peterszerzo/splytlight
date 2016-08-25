export default function getVizContainerDimensions({windowWidth, windowHeight}) {
  return {
    width: windowWidth / 2,
    height: windowHeight - 80
  };
}
