export type ColorType = {
  text: string;
  background: string;
  tabBackground: string;
  border: string;
  inputBackground: string;
  starColor: string;
  buttonColor: string;
  trashColor: string;
};

export type ColorsType = {
  light: ColorType;
  dark: ColorType;
};

export const Colors: ColorsType = {
  light: {
    text: "#11181C",
    background: "#fff",
    tabBackground: "#687076",
    border: "#11181C",
    inputBackground: "#D0D0D0",
    starColor: "#3ad111",
    buttonColor: "#007AFF",
    trashColor: "#ff0000",
  },
  dark: {
    text: "#ECEDEE",
    background: "#000",
    tabBackground: "#9BA1A6",
    border: "#ECEDEE",
    inputBackground: "#151718",
    starColor: "#1e6b09",
    buttonColor: "#007AFF",
    trashColor: "#a60f0f",
  },
};
