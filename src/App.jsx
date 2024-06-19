import { useState, useEffect } from "react";
import "./App.css";

// App title heading as well as footer display

// Form displays for user to input their name and select a difficulty level

// Pull X number of images from an API with useEffect where X is determined by selected difficulty level. X = [6 (easy), 9 (medium), or 12 (hard)] cards.

// Reusable function placeCardsAtRandom() to place images at random spots in an array

// Brief description of how to play appears on screen. Remember to have a highly visible X button to close it.

// RAM css grid appears displaying all cards placed in random positions via placeCardsAtRandom().

// h2 displaying both current score and best score

// When user clicks a card it gets added to an array of clicked cards via useState()

// Click also triggers another placeCardsAtRandom(). If successful then current score = current score++

// Round ends when user has selected all cards and wins or accidentally selects a card twice and loses. Either way the top score will go into the h2 that displays best score

// overlay that appears when a round is over

function App() {
  const [count, setCount] = useState(0);

  return <></>;
}

export default App;
