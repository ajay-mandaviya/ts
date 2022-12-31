// https://www.typescript-training.com/course/intermediate-v1
class Grill {
  startGas() {}
}
class Oven {
  setTemp() {}
}

type CookingDevices<T> = T extends "grill" ? Grill : Oven;

let device1: CookingDevices<"grill">;
let devices2: CookingDevices<"someting">;

//extract and exclude
//https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union
type FavouriteColor =
  | "red"
  | "green"
  | "yellow"
  | "grey"
  | [number, number, number]
  | { red: number; green: number; blue: number };

// show everything that mathces second type
type StringColor = Extract<FavouriteColor, string>;
type OnlyObjColor = Extract<FavouriteColor, { red: number }>;
type TupleColor = Extract<FavouriteColor, number[]>;

//exclude
type NoStringColor = Exclude<FavouriteColor, string>;
type NoObjColor = Exclude<FavouriteColor, { red: number }>;

// interface with indexing
interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red?: string;
    green?: string;
    blue?: string;
  };
}

let carColor: Car["color"] = {
  blue: "",
  red: "",
};

let carPropewn, Left, Rightrty: Car["color" | "year"];

//mapped type

type Fruit = {
  name?: string;
  color?: string;
  mass?: number;
};

type Dict<T> = { [k: string]: T };
let fruitCate: Dict<Fruit> = {};
fruitCate.apple.color = "";
fruitCate.apple.mass = 10;

// same with mapped type
type MyRecored = { [key in "apple" | "cherry"]: Fruit };

let newFruite: MyRecored = {
  apple: {},
  cherry: {},
};

//
type PartOfWindow = {
  [key in "document" | "navigator" | "setTimeout"]: Window[key];
};

type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key];
};
type PartOfWindows = PickWindowProperties<
  "document" | "navigator" | "setTimeout"
>;
//

//type with temp lite
type ArtFeat = "cabin" | "tree" | "sunset";
type Colors = "red" | "green" | "blue";

type ArtMethodName = `pain_${Colors}_${ArtFeat}`;

let data: ArtMethodName = "pain_blue_cabin";
let data2: ArtMethodName = "pain_red_tree";
let data3: ArtMethodName[] = ["pain_blue_cabin", "pain_blue_sunset"];
let config = {
  aliases: "",
};

export type StylePropsAliases = typeof config.aliases;

type getAliasesProps<T> = {
  [Property in keyof T]: Property extends "bg"
    ? `$${StylePropsAliases}`
    : unknown;
};

export type StylePropsConfig = typeof config;

let platforms = [];
export type Platform = typeof platforms[number];

type ViewStyle = {};
type ImageStyle = {};
type TextStyle = {};

type RNStyles = ViewStyle & ImageStyle & TextStyle;

interface Sx<T> {
  style?: StyleProps<T>;
  state?: ISxProps;
  platform?: ISxProps;
  colorMode?: ISxProps;
  descendants?: ISxProps;
}

export type StyleProps<T> = Partial<T & RNStyles>;

export type SxProps = Sx<getAliasesProps<StylePropsAliases>>;

export type ISxProps = { [key: string]: SxProps };

export type ISxPropsTemp = { [key: string]: SxProps };

type PlatformProps = Partial<Record<Platform, SxProps>>;

type StateProps = Partial<Record<state, SxProps>>;

interface SxTemp<T> {
  style?: StyleProps<T>;
  state?: ISxPropsTemp;
  platform?: PlatformProps;
  colorMode?: ISxPropsTemp;
  descendants?: ISxPropsTemp;
}

type AllPropsss<T> = {
  [Property in keyof T]: Property extends "platform"
    ? PlatformProps
    : Property extends "state"
    ? StateProps
    : ISxPropsTemp;
};

type MyType = Partial<AllPropsss<SxTemp<StylePropsAliases>>>;

let a: MyType = {
  platform: {
    ios: {
      style: {
        bg: "$red.500",
      },
    },
  },
  state: {},
};

//StateProps
export type IStates = {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

export type state = keyof IStates;

let colors = [{}];
// ColorProps
export type IColors = Leaves<typeof colors>;

/* eslint no-use-before-define: 0 */ // --> OFF
// @ts-ignore
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type Leaves<T> = T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T]
  : "";

//Theme typings
interface IThemeProps {
  baseStyle: SxProps;
  variants: { [key: string]: SxProps };
  sizes: { [key: string]: SxProps };
  defaultProps: {
    variant: string;
    size: string;
  };
}

export type ThemeType = Partial<IThemeProps>;

//Config typings

interface IConfigProps {
  descendentStyle: Array<string>;
  consumeStyle: Array<string>;
}

export type ConfigType = Partial<IConfigProps>;
