// https://www.typescript-training.com/course/making-typescript-stick
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledChees,
}
type SandWichOrder = [
  number, // total order
  Sandwich, // sandwich
  ...string[] // topping
];

const order1: SandWichOrder = [
  100,
  Sandwich.GrilledChees,
  "onion",
  "sause",
  "garilc",
];
const order2: SandWichOrder = [100, Sandwich.VeggieBurger, "cheese"];

//with generice
type MyGen<T> = [number, ...T[]];
const x1: MyGen<string> = [100, "sdsd"];
const x2: MyGen<boolean> = [100, false, true];

//return an array containg everything expect  first element
function tails<T>(arg: readonly [number, ...T[]]) {
  const [_ignored, ...rest] = arg;
  return rest;
}

const orderWithOutTotalCoast = tails(order1);
// better way
function returnArray<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignored, ...rest] = arg;
  return rest;
}

const orderWithOutTotalCoast2 = returnArray(order1);

type Statistics = {
  [k in `${"median" | "mean"}Value`]?: number;
};
const statusw: Statistics = {
  meanValue: 10,
};

// either settimeout or setInterval
type GetMatchWith = Extract<keyof Window, `set${any}`>;
let winFns: GetMatchWith;

type T1 = `send${Capitalize<"mouse" | "keyboard">}Event`;
type T2 = `send${Lowercase<"Mouse" | "keyBoard">}Event`;

//
type Colors = "red" | "green" | "blue";
type ColorSelector = {
  [k in Colors as `selected${Capitalize<k>}`]: () => void;
};

const cs: ColorSelector = {
  selectedBlue: () => {},
  selectedGreen: () => {},
  selectedRed: () => {},
};

//
type Dict<T> = { [k: string]: T | undefined };
const d: Dict<string[]> = {};

//data store challange

interface DataEntity {
  id: string;
}
interface Movie extends DataEntity {
  director: string;
}

interface Song extends DataEntity {
  singer: string;
}

interface Comic extends DataEntity {
  issueNumber: number;
}

type DataEntityMap = {
  movie: Movie;
  song: Song;
  comic: Comic;
};
type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [k in keyof DataEntityMap as `get${Capitalize<k>}`]: (
    id: string
  ) => DataEntityMap[k];
} & {
  [k in keyof DataEntityMap as `clear${Capitalize<k>}`]: () => void;
};
class DataStore implements DataStoreMethods {}
const sss: DataStoreMethods = new DataStore();
