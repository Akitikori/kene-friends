import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scramble, sameString } from "../utilities";
import diamond from "../images/diamond-png.png";
import audioFile from "../../audio/godfather.mp3";
import Sound from "./Sound";

export default function Game(props) {
  // prefix and suffix are passed to props
  // prefix is the string to be displayed
  // suffix is the string to be scrambled
  // const arrow = parseInt("&larr;".toString(16), 16);
  const navigate = useNavigate();
  const { prefix, suffix } = props;

  // create an array of empty strings and set that to the target
  // state variable for now
  const ourArray = new Array(suffix.length).fill("");
  const [target, setTarget] = useState(ourArray);

  // in this for loop, instead of pushing the character as the value
  const [scrambledState, setScrambledState] = useState([
    ...scrambleStuff(suffix)
  ]);

  useEffect(() => {
    const clickedElementsLength = scrambledState.filter(
      (element) => element.hidden
    ).length;

    if (clickedElementsLength === suffix.length) {
      if (sameString(suffix, target.join(""))) {
        // navigate to new url
        // navigate("/test");
        window.location.href =
          "https://wl.seetickets.us/event/KENEANDFRIENDS-FAMILYISFOREVER/467742?afflky=Schimanski&eventpass=keneandfriendstix";
      } else {
        setTarget(new Array(suffix.length).fill(""));
        setScrambledState([...scrambleStuff(suffix)]);
      }
      // sameString(suffix, target.join(""))
      //   ? console.log("You won!")
      //   : console.log("Try again, bitch");
    }
  }, [target, navigate, suffix, scrambledState]);

  // render the clicked values
  // for each character in the target array that isn't an empty
  // string, render the character, otherwise, render the css for
  // the stars (which represent the empty string)
  // index here refers to the index that that the
  // revealed character is at

  const targetMarkup = target.map((element, index) => {
    // if the element is not an empty character, display it with
    // the relevant className and put the character as the value
    return element !== "" ? (
      <button
        className="target-swap active"
        key={index}
        onClick={() => handleClick(index)}
      >
        <span>{element}</span>
      </button>
    ) : (
      <button key={index} className="target-swap">
        <img src={diamond} alt="diamond pic" />
      </button>
    );
  });

  function handleClick(index) {
    // save the character in a variable
    // change the character in the target array to empty string
    // change the hidden state of the character to false
    const charVal = target[index];
    setTarget((prevTarget) => {
      const targetTemp = [...target];
      targetTemp[index] = "";
      return targetTemp;
    });

    // change the hidden state of the character to false

    // go through the scrambled states
    // check if the value is the same as the character we're hiding,
    // if it's the same and the value is currently hidden i.e we have pressed the character before
    // then change the state to the same value but a different hidden value
    // break the loop so it only finds one character
    for (let i = 0; i < scrambledState.length; i++) {
      if (
        scrambledState[i].value === charVal &&
        scrambledState[i].hidden === true
      ) {
        // setScrambledState(scrambledStateTemp);
        setScrambledState((prevScrambledState) => {
          const scrambledStateTemp = [...prevScrambledState];
          const tempState = { ...scrambledStateTemp[i], hidden: false };
          scrambledStateTemp[i] = tempState;
          return scrambledStateTemp;
        });
        break;
      }
    }
  }

  // this is me trying to write the display for the scrambled characters
  // take each scrambledState value
  // if it isn't hidden, display the character as a button tag with an onClick function
  // else display a space
  const test = [...scrambledState];
  const targetScrambledStateMarkup = test.map(({ value, hidden }, index) => {
    return hidden === true ? (
      <button className="target-swap" key={index}>
        <img src={diamond} alt="diamond pic" />
      </button>
    ) : (
      <button
        className="target-swap"
        onClick={() => scrambledOnClick(index)}
        key={index}
      >
        <span>{value}</span>
      </button>
    );
  });

  // write onClick function for the target state characters
  // set the scrambledState hidden value to true
  // set the target value to the value of the character

  function scrambledOnClick(index) {
    const audioMedia = document.querySelector(".audio-media");
    if (audioMedia.paused) {
      audioMedia.play();
    }

    // const items = [...scrambledState];
    // items[index].hidden = true;

    setTarget((prevTarget) => {
      const items = [...prevTarget];
      const firstEmptyString = items.findIndex((val) => val === "");

      if (firstEmptyString !== -1) {
        items[firstEmptyString] = scrambledState[index].value;
      }
      return items;
    });

    setScrambledState((prevScrambledState) => {
      const items = [...prevScrambledState];
      const item = { ...items[index] };

      items[index] = {
        ...item,
        hidden: true
      };
      return items;
    });
  }

  function backSpace() {
    // set target
    // remove the last element in target and put back that element in its position in scrambled state

    setTarget((prevTarget) => {
      const items = [...prevTarget];
      const firstEmptyString = items.findIndex((val) => val === "");
      const charValue = items[firstEmptyString - 1];
      console.log(charValue);
      for (let i = 0; i < scrambledState.length; i++) {
        if (
          scrambledState[i].value === charValue &&
          scrambledState[i].hidden === true
        ) {
          // setScrambledState(scrambledStateTemp);
          console.log(charValue);
          setScrambledState((prevScrambledState) => {
            const scrambledStateTemp = [...prevScrambledState];
            const tempState = { ...scrambledStateTemp[i], hidden: false };
            scrambledStateTemp[i] = tempState;
            return scrambledStateTemp;
          });
          break;
        }
      }

      // if we at least have one element in the array
      if (firstEmptyString !== 0) {
        // set the element before the first empty string to an empty string
        items[firstEmptyString - 1] = "";
      }
      return items;
    });
  }

  return (
    <div className="App">
      <h1 className="prefix">
        {prefix.split(" ").map((word, index) => (
          <div key={index}>
            {index === 0 ? (
              <div className="spaced-heading">
                {word.split("").map((letter, ind) => (
                  <span key={ind}>{letter}</span>
                ))}
              </div>
            ) : (
              <span>{word}</span>
            )}
          </div>
        ))}
      </h1>
      <div className="target">{targetMarkup}</div>

      <div className="target scrambled">{targetScrambledStateMarkup}</div>
      <button className="backspace" onClick={backSpace}>
        {/* {arrow} */}
        &larr;
      </button>
      <div className="backspaceInstruction"> Instructions </div>
      <div className="backspaceletters">
        {" "}
        Tap the letters in the right order to buy a ticket{" "}
      </div>

      <Sound audio={audioFile} />
      {/* <audio src={audioFile} controls autoPlay>
        Your browser does not support the <code>audio</code> element.
      </audio> */}
    </div>
  );
}

function scrambleStuff(suffix) {
  // scramble the suffix and assign to a string/char array
  const scrambledWordArray = [...scramble(suffix)];
  // set the scrambled word to create an array
  // with each element having "value" and "hidden" keys
  const scrambledStates = scrambledWordArray.map((char) => ({
    value: char,
    hidden: false
  }));

  return scrambledStates;
}
