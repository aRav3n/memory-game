import { useState, useEffect } from "react";
import "./App.css";

// Array of multiverse ID numbers of the 12 cards I want in the deck
const multiverseIdArray = [
  82950, 443073, 25596, 13031, 13039, 11268, 26409, 23069, 11386, 210557, 13147,
  598899,
];

// App title heading as well as footer display
function Heading() {
  return (
    <header>
      <h1>MTG Memory Game</h1>
    </header>
  );
}

function Footing() {
  return <footer>&copy; Andy Ryan 2024</footer>;
}

// Form displays for user to input their name and select a difficulty level

// Pull X number of images from an API with useEffect where X is determined by selected difficulty level. X = [6 (easy), 9 (medium), or 12 (hard)] cards.
// https://api.magicthegathering.io/v1/cards/[multiverseId]

// Reusable function placeCardsAtRandom() to place images at random spots in an array

// Brief description of how to play appears on screen. Remember to have a highly visible X button to close it.

// RAM css grid appears displaying all cards placed in random positions via placeCardsAtRandom(). Cards are all button elements

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
