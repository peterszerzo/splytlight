export type Zoom = "XS" | "S" | "M" | "L" | "XL";

export const zoomOut = (zoom: Zoom): Zoom | undefined => {
  if (zoom === "XS") {
    return undefined;
  }
  if (zoom === "S") {
    return "XS";
  }
  if (zoom === "M") {
    return "S";
  }
  if (zoom === "L") {
    return "M";
  }
  if (zoom === "XL") {
    return "L";
  }
};

export const zoomIn = (zoom: Zoom): Zoom | undefined => {
  if (zoom === "XS") {
    return "S";
  }
  if (zoom === "S") {
    return "M";
  }
  if (zoom === "M") {
    return "L";
  }
  if (zoom === "L") {
    return "XL";
  }
  if (zoom === "XL") {
    return undefined;
  }
};

export const zoomLevel = (zoom: Zoom): number => {
  switch (zoom) {
    case "XL":
      return 3;
    case "L":
      return 2;
    case "M":
      return 1;
    case "S":
      return 0.6666;
    case "XS":
      return 0.3333;
  }
};
