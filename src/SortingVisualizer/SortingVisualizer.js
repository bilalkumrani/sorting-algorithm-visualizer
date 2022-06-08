import React from "react";
import { useState, useEffect } from "react";
import { getbubbleSortAnime } from "./sortingAlogrithms";
const ANIMATION_SPEED_MS = 100;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

const Sortingvisualizer = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    resetArray();

    return () => {
      //cleanup
    };
  }, []);

  const resetArray = () => {
    setState([]);
    for (let i = 0; i < 10; i++) {
      setState((value) => {
        return [...value, Math.floor(Math.random() * 100)];
      });
    }
  };

  const BubbleSort = () => {
    const animations = getbubbleSortAnime(state);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };
  return (
    <>
      <button onClick={resetArray} className="btn btn-primary m-5">
        Generate new array
      </button>

      <button onClick={BubbleSort} className="btn btn-warning">
        Bubble Sort
      </button>
      <div
        className="array-container"
        style={{ position: "absolute", left: "100px" }}
      >
        {state.map((val, index) => {
          return (
            <div
              className="array-bar"
              key={index}
              style={{
                height: `${val}px`,
                width: "20px",
                backgroundColor: "pink",
                display: "inline-block",
                border: "2px solid black",
                margin: "5px",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default Sortingvisualizer;
