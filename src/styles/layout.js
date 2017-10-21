export default function getContainerDimensions({ windowWidth, windowHeight }) {
  return {
    width: windowWidth / 2,
    height: windowHeight - 60
  }
}
