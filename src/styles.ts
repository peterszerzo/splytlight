export const lighterBlue = "#6A8EC0";
export const blue = "#4A76B2";
export const faintBlue = "#CDD9EA";
export const brown = "#201A16";
export const white = "#FFFFFF";
export const black = "#000000";
export const lightGray = "#CCCCCC";
export const faintGray = "#F3F3F3";
export const gray = "#999999";
export const green = "#32A621";
export const red = "#BF0015";

export const strokeWeight = 6;
export const controlCircleRadius = 10;
export const controlCircleOffset = 2;

export const headerHeight = 60;
export const sidebarWidth = 60;
export const standardPadding = 20;

export const getContainerDimensions = ({
  windowWidth,
  windowHeight
}: {
  windowWidth: number;
  windowHeight: number;
}) => ({
  width: (windowWidth - sidebarWidth) / 2,
  height: windowHeight - headerHeight
});

export const css = `
@import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro';

* {
  -webkit-font-smoothing: antialiased;
  font-family: 'Source Sans Pro', sans-serif;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  overflow: hidden;
}

p {
  font-size: 1rem;
  letter-spacing: .03rem;
  font-weight: 400;
}
`;
