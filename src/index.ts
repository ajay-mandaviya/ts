function timeOut(n: number) {
  return new Promise((res) => setTimeout(res, n));
}

export async function addNumers(a: number, b: number) {
  await timeOut(500);
  return a + b;
}

(async () => {
  console.log(await addNumers(20, 10));
})();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    variables and values <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let ageType: number = 20;

//default type should be any
let data: any;

let time: Date;

// function with type

// c consider as optional even if we pass it must be type of number
function addition(a: number, b: number, c?: number): number {
  if (c !== undefined) {
    return a + b + c;
  }
  return a + b;
}

// work fines
addition(5, addition(9, 3, 10));

function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
  color: string;
}) {}

const myCar = {
  make: "Tesla",
  model: "Model 3",
  year: 2002,
  chargeVoltage: 220,
  color: "RED",
};

printCar(myCar);

// INDEX SIGNATURES

const phones = {
  home: {
    country: "+1",
    area: "211",
    number: "653-4545",
  },
  work: {
    country: "+1",
    area: "211",
    number: "653-4545",
  },
  fax: {
    country: "+1",
    area: "211",
    number: "653-4545",
  },
};

//this valuse using  what's called an index signature
const phonesType: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {
  work: {
    area: "",
    number: "",
    country: "",
  },
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Arrays <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\

type Cars = {
  name: string;
  model: string;
  year: number;
};
type stringArr = string[];
type NumberArr = number[];
type Carts = Cars[];
const fileExtensions: stringArr = ["js", "ts"];
const fileSizes: NumberArr = [1, 2, 3];

const carCollection: Carts = [
  {
    model: "",
    year: 211,
    name: "",
  },
];

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Tuples <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\
let myCarsTuple: [number, string, string] = [2022, "22", "string"];

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Union Types <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\

//==> describe using | operator
type coin = "heads" | "tails";
function flipCoin(): coin {
  if (Math.random() > 0.5) return "heads";
  return "tails";
}

function mayBeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (Math.random() > 0.5) {
    return ["success", { name: "dsds", email: "sdsd" }];
  } else {
    return ["error", new Error("Something went wrong")];
  }
}
const outcome = mayBeGetUserInfo();
const [first, second] = outcome;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Intersection Types <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\

//==> describe using & operator

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Type aliases <<<<<<<<<<<<<<<<<T<<<<<<<<<<<<<<<<<\\

// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
type UserContactInfo = {
  name: string;
  email: string;
};

function printContactInfo(info: UserContactInfo) {
  console.log("info", info);
}

const painter = {
  name: "Robert Ross",
  email: "Someting",
  favColor: "some",
};

printContactInfo(painter);

type UserInfoOutComeError = ["error", Error];
type UserInfoOutComeSuccess = ["success", { name: string; email: string }];
type UserInfoOutCome = UserInfoOutComeError | UserInfoOutComeSuccess;

function mayBeGetUserInfoNew(): UserInfoOutCome {
  if (Math.random() > 0.5) {
    return ["success", { name: "dsds", email: "sdsd" }];
  } else {
    return ["error", new Error("Something went wrong")];
  }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Interfaces <<<<<<<<<<<<<<<<<T<<<<<<<<<<<<<<<<<\\

// an interface is way of defingin an object type
interface UserContactInfos {
  name: string;
  email: string;
}

type Primitive = string | number | boolean | null;

type JSONObj = { [k: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = Primitive | JSONArray | JSONObj;
function isJson(arg: JSONValue) {}
isJson("hello");
isJson([1, "@", 3, 4, [3], 4]);
isJson(false);
isJson({ type: "hELLO" });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Functions <<<<<<<<<<<<<<<<<T<<<<<<<<<<<<<<<<<\\

//interface type for function
interface TwoNumberCalc {
  (x: number, y: number): number;
}
type TwoNumberCalcType = (x: number, y: number) => number;

const addding: TwoNumberCalc = (a, b) => a + b;
const substracing: TwoNumberCalcType = (x, y) => x - y;

function runInFiveSec(callBack: () => void) {
  setTimeout(callBack, 5000);
}

async function getData(
  url: string
): Promise<{ properties: string[]; msg: string }> {
  const res = await fetch(url);
  const data = (await res.json()) as {
    properties: string[];
    msg: string;
  };
  return data;
}

function loadData() {
  getData("sds").then((res) => {
    console.log(res.properties, res.msg);
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Classes <<<<<<<<<<<<<<<<<T<<<<<<<<<<<<<<<<<\\

class CarsC {
  public make: string;
  public model: string;
  public year: number;
  // protected vinNum = getVinNumber()
  constructor(make: string, model: string, year: number) {
    (this.make = make), (this.model = model), (this.year = year);
  }
  drive() {
    console.log("Carrrr...");
  }
}

//>>>>>>>>>>>>>>>>>>>>>> Types(Top and Bottom) and Values <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\
//Top types
type x = boolean;
const xx: x = false;

type NumberUnion = 2 | 4 | 6;
type MayBeNull = null;
type Another = {
  favouriteFruite?: "pineapple";
};

let aa: NumberUnion = 6;

type Flexible = any;
let anyFlexible: Flexible = 3;
anyFlexible = "sdsd";
anyFlexible = [];

type Unknow = unknown;

let unknowns: Unknow = "Asda";
unknowns = "";
// bottom types : never
// any valus from following sets : {}

class Truck {
  tow() {
    console.log("truck....");
  }
}
class Boat {
  isFloating() {
    return true;
  }
}

type Vehicle = Truck | CarsC | Boat;

class UnReachableError extends Error {
  constructor(_nvr: never, message: string) {
    super(message);
  }
}

let myVehicle: Vehicle = new CarsC("", " ", 1);
if (myVehicle instanceof Truck) {
  myVehicle.tow();
} else if (myVehicle instanceof CarsC) {
  myVehicle.drive();
} else {
  const neverValue: never = myVehicle;
  throw new UnReachableError(
    myVehicle,
    `Unexpected vehical type: ${myVehicle}`
  );
}

//type Guards and narrowing
type MulTipleValues =
  | Date
  | null
  | undefined
  | ""
  | [number]
  | { dateRange: [Date, Date] };
let values: MulTipleValues;
if (typeof values === "string") {
  values;
} else if (typeof values === "boolean") {
  values;
} else if (typeof values === "number") {
  values;
} else if (Array.isArray(values)) {
  values;
}
//no null assertion ==> sym !.

type GroceryCart = {
  fruits?: { name: string; qty: number }[];
  vegetables?: { name: string; qty: number }[];
};

const cart: GroceryCart = {};

cart.fruits!.push({
  name: "",
  qty: 1,
});

cart.vegetables?.push({
  name: "",
  qty: 1,
});

//>>>>>>>>>>>>>>>>>>>>>> Generices <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\
const phonesList = [
  { customerId: "321", areaCode: "001", num: "123-4566" },
  { customerId: "121", areaCode: "002", num: "123-4566" },
  { customerId: "421", areaCode: "003", num: "123-4566" },
  { customerId: "421", areaCode: "004", num: "123-4566" },
];
//convert this => this
const phoneDist = {
  "001": {
    customerId: "001",
    areaCode: "",
    num: "",
  },
  "002": {
    customerId: "121",
    areaCode: "002",
    num: "123-456",
  },
};

interface PhoneInfo {
  customerId: string;
  areaCode: string;
  num: string;
}

function listToDist(
  list: PhoneInfo[],
  idGen: (arg: PhoneInfo) => string // callback funtion
): {
  [k: string]: PhoneInfo; // phone list
} {
  const newDict: { [k: string]: PhoneInfo } = {};
  list.forEach((ele) => {
    const key = idGen(ele);
    newDict[key] = ele;
  });
  //
  return newDict;
}

console.log(listToDist(phonesList, (ele) => ele.areaCode));

// define type parameter
// function arg for types
// T consider as type parameter

// automatically take type what we pass
function listToDistWithType<T>(
  list: T[],
  idGen: (arg: T) => T
): {
  [k: string]: T; // phone list
} {
  const newDict: { [k: string]: T } = {};
  return newDict;
}

//https://www.typescript-training.com/course/fundamentals-v3/15-dict-map-filter-reduce/
interface Dict<T> {
  [k: string]: T;
}
const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

// Array.prototype.map, but for Dict
function mapDict<T, U>(
  input: Dict<T>,
  mappingCb: (arg: T, key: string) => U
): Dict<U> {
  const newDict: Dict<U> = {};
  for (let key in input) {
    const thisVal = input[key];
    newDict[key] = mappingCb(thisVal, key);
  }
  return newDict;
}

type DDD = {
  [k: string]: {
    color: string;
    mass: number;
    kg: number;
    name: string;
  };
};

const fruitsWithKgMass: DDD = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}));

//Array.prototype.filter, but for Dict

function filterDict<T>(
  input: Dict<T>,
  filterCb: (arg: T, key: string) => boolean
): Dict<T> {
  const toReturnDict: Dict<T> = {};
  for (let key in input) {
    let thisValue = input[key];
    if (filterCb(input[key], key)) {
      toReturnDict[key] = thisValue;
    }
  }
  return toReturnDict;
}

function reducerDict<T, V>(
  input: Dict<T>,
  reducerCb: (currentVal: V, item: T) => V,
  initialValue: V
): V {
  let retuenToVal = initialValue;

  for (let key in input) {
    let thisValue = input[key];
    retuenToVal = reducerCb(retuenToVal, thisValue);
  }
  return retuenToVal;
}

type Fru = {
  [k: string]: {
    color: string;
    mass: number;
  };
};

const redFruits: Fru = filterDict(fruits, (fruit) => fruit.color === "red");
const oneOfEachFruitMass: number = reducerDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0
);

// generices scopes and constraints

//
type Link<T> = {
  value: T;
  nextNode?: Link<T>;
};

const firstNode: Link<string> = {
  value: "aj",
};

const secondNode: Link<number> = {
  value: 12,
  nextNode: {
    value: 12,
  },
};

function createNode<T>(value: T): Link<T> {
  return { value };
}

function tap<T>(arg: T, fn: (x: T) => void): T {
  fn(arg);
  return arg;
}

type ObjectLiteralType = {
  first: 1;
  second: 2;
};

type Result = keyof ObjectLiteralType;
const ansss: Result = "first";
const anssss: Result = "second";

// getting values from an obj type

type ObjValue = {
  a: "A";
  b: "B";
  c: "number";
};

type ObjectValuekey = ObjValue[keyof ObjValue];

let check: ObjectValuekey = "number";

// omit
type UserModal = {
  displayName: string;
  accountID: number;
  isVerified: boolean;
};

// remove accountID from UserModal type
type CurrentUserModal = Omit<UserModal, "accountID">;

// template literals
type CharacterClass = "warror" | "wizard" | "clearic";
type LawChaos = "lawful" | "netural" | "chaotic";
type GoodEvil = "good" | "netural" | "evil";

type Alignment = `${LawChaos}-${GoodEvil}`;
type Character = {
  name: string;
  alignment: Alignment;
};

const ssss: Character = {
  alignment: "chaotic-evil",
  name: "",
};

type VerticalAlignment = "top" | "center" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

type BoxAlignment = Exclude<
  `${VerticalAlignment}-${HorizontalAlignment}` | "center",
  "center-center"
>;

type Box = {
  x: number;
  y: number;
  alignment: BoxAlignment;
};
const a: Box = {
  x: 10,
  y: 10,
  alignment: "top-center",
};

const b: Box = {
  x: 20,
  y: 20,
  alignment: "bottom-right",
};

const shouldBreak: Box = {
  x: 20,
  y: 20,
  alignment: "left-right",
};

const shouldBreakAtFirstButEventuallyWork: Box = {
  x: 100,
  y: 100,
  alignment: "center",
};
