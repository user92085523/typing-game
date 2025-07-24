import { useState, useEffect } from "react";
import "./App.css";

function Game() {
  const [keyboardState, setKeyboardState] = useState(keys);
  const [latestWordsIdx, setLatestWordsIdx] = useState(rollWordsIdx());
  const [word, setWord] = useState(words[latestWordsIdx]);
  const [inputStr, setInputStr] = useState("");

  const lengthMatch = word.length === inputStr.length;
  const strMatch = word.slice(0, inputStr.length) === inputStr;
  const inputColor = strMatch ? "grey" : "red";

  useEffect(() => {
    let newKeyboardState = Object.assign({}, keyboardState);

    const handleKeyDown = (event) => {
      if (event.key in keys) {
        newKeyboardState[event.key] = true;
        setKeyboardState(newKeyboardState);

        preventSomeInputs(event);
        handleKeyInput(event.key);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key in keys) {
        if (event.key === "Shift") {
          newKeyboardState = resetOnShiftKeys(event, newKeyboardState);
        }

        newKeyboardState[event.key] = false;
        setKeyboardState(newKeyboardState);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  if (lengthMatch && strMatch) {
    resetChallenge();
  }

  function preventSomeInputs(event) {
    if ([" ", "'"].includes(event.key)) {
      event.preventDefault();
    }
  }

  function handleKeyInput(eventKey) {
    if (["Shift"].includes(eventKey)) {
      return;
    }

    if (eventKey === "Backspace") {
      if (inputStr.length === 0) {
        return;
      }
      setInputStr(inputStr.slice(0, inputStr.length - 1));
      return;
    }

    setInputStr(inputStr + eventKey);
  }

  function resetOnShiftKeys(event, keyboardState) {
    const OnShiftKeys = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      '"',
      ":",
    ];

    OnShiftKeys.forEach((element) => {
      keyboardState[element] = false;
    });

    return keyboardState;
  }

  function generateUserOutput() {
    if (inputStr === "") {
      return "\u00A0";
    }

    if (strMatch) {
      return inputStr;
    }

    return inputStr.split("").reduce((string, char) => {
      if (char === " ") {
        return string + "□";
      }
      return string + char;
    }, "");
  }

  function rollWordsIdx() {
    return Math.floor(Math.random() * words.length);
  }

  function resetChallenge() {
    let idx;
    do {
      idx = rollWordsIdx();
    } while (idx === latestWordsIdx);

    setWord(words[idx]);
    setLatestWordsIdx(idx);
    setInputStr("");
  }

  return (
    <>
      <div>
        <h1 className="word">{word}</h1>
        <h1 className="key-input" style={{ color: inputColor }}>
          {generateUserOutput()}
        </h1>
      </div>
      <div>
        <Keyboard keyboardState={keyboardState} strMatch={strMatch} />
      </div>
    </>
  );
}

function Keyboard({ keyboardState, strMatch }) {
  const kb = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "BS"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", "."],
    ["Sp"],
  ];

  const kbOnShift = [
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "BS"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'],
    ["Z", "X", "C", "V", "B", "N", "M", "<", ">"],
    ["Sp"],
  ];

  const mappedEventKey = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "Backspace"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", "."],
    [" "],
  ];

  const mappedEventKeyOnShift = [
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "Backspace"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'],
    ["Z", "X", "C", "V", "B", "N", "M", "<", ">"],
    [" "],
  ];

  const keyboard = keyboardState["Shift"] ? kbOnShift : kb;
  const mapped = keyboardState["Shift"]
    ? mappedEventKeyOnShift
    : mappedEventKey;

  return keyboard.map((row, i) => {
    return (
      <div className={`keyboard-row-${i}`} key={i}>
        {row.map((key, j) => {
          const pressed = keyboardState[mapped[i][j]];

          return (
            <Key
              value={key}
              color={pressed ? (strMatch ? "limegreen" : "red") : "grey"}
              fontWeight={pressed ? "bold" : "lighter"}
              key={key}
            />
          );
        })}
      </div>
    );
  });
}

function Key({ value, color, fontWeight }) {
  return (
    <h1 className="key" style={{ color: color, fontWeight: fontWeight }}>
      {value}
    </h1>
  );
}

export default Game;

const keys = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
  A: false,
  B: false,
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
  H: false,
  I: false,
  J: false,
  K: false,
  L: false,
  M: false,
  N: false,
  O: false,
  P: false,
  Q: false,
  R: false,
  S: false,
  T: false,
  U: false,
  V: false,
  W: false,
  X: false,
  Y: false,
  Z: false,
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  "!": false,
  "@": false,
  "#": false,
  $: false,
  "%": false,
  "^": false,
  "&": false,
  "*": false,
  "(": false,
  ")": false,
  "-": false,
  _: false,
  ",": false,
  ".": false,
  "<": false,
  ">": false,
  ";": false,
  ":": false,
  "'": false,
  '"': false,
  " ": false,
  Shift: false,
  Backspace: false,
};

const words = [
  "Top Drawer",
  "It's Not All It's Cracked Up To Be",
  "In the Red",
  "A Cat Nap",
  "Cut To The Chase",
  "A Hair's Breadth",
  "Quick On the Draw",
  "Hit Below The Belt",
  "Keep On Truckin'",
  "Goody Two-Shoes",
  "Her fragrance of choice was fresh garlic.",
  "Hang on, my kittens are scratching at the bathtub and they'll upset by the lack of biscuits.",
  "The tattered work gloves speak of the many hours of hard labor he endured throughout his life.",
  "I often see the time 11:11 or 12:34 on clocks.",
  "Most shark attacks occur about 10 feet from the beach since that's where the people are.",
  "I am my aunt's sister's daughter.",
  "Twin 4-month-olds slept in the shade of the palm tree while the mother tanned in the sun.",
  "Mushroom & Olive Pizza",
  "Annette Robbins",
  "Eddy King",
];
