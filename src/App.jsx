import { useState, useEffect } from "react";
import "./App.css";

function Game() {
  const [keyboardState, setKeyboardState] = useState(keys);
  const [word, setWord] = useState(words[0]);
  const [inputStr, setInputStr] = useState("");

  const lengthMatch = word.length === inputStr.length;
  const strMatch = word.slice(0, inputStr.length) === inputStr;
  const color = strMatch ? "white" : "red";

  const generateDisplayedInput = () => {
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
  };

  useEffect(() => {
    let newKeyboardState = Object.assign({}, keyboardState);

    const handleKeyDown = (event) => {
      if (event.key in keys) {
        newKeyboardState[event.key] = true;
        setKeyboardState(newKeyboardState);

        if ([" "].includes(event.key)) {
          event.preventDefault();
        }

        if (event.key === "Backspace") {
          setInputStr(inputStr.slice(0, inputStr.length - 1));
          return;
        }

        setInputStr(inputStr + event.key);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key in keys) {
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
    setWord(words[Math.floor(Math.random() * words.length)]);
    setInputStr("");
  }

  return (
    <>
      <div>
        <h1 className="word">{word}</h1>
        {color}
        <h1 className="key-input" style={{ color: color }}>
          {generateDisplayedInput()}
        </h1>
      </div>
      <div>
        <Keyboard keyboardState={keyboardState} />
      </div>
    </>
  );
}

function Keyboard({ keyboardState }) {
  const [keyRows, setKeyRows] = useState(keyboardElement);

  return keyRows.map((row, idx) => {
    return (
      <div className={`keyboard-row-${idx}`} key={idx}>
        {row.map((key) => {
          return <Key value={key} pressed={keyboardState[key]} key={key} />;
        })}
      </div>
    );
  });
}

function Key({ value, pressed }) {
  const color = pressed ? "red" : "grey";

  return (
    <h1 className="key" style={{ color: color }}>
      {value}
    </h1>
  );
}

export default Game;

const words = ["a b c", "america", "bee", "coffee", "doom", "earth"];

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
  ",": false,
  ".": false,
  " ": false,
  Backspace: false,
};

const keyboardElement = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "BS"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", ",", "."],
  ["Sp"],
];
