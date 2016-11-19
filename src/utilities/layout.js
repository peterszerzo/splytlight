// @flow

type Dim = {
  width : number,
  height : number
};

export default function getContainerDimensions({windowWidth, windowHeight}) : Dim {
  return {
    width: windowWidth / 2,
    height: windowHeight - 60
  };
}
