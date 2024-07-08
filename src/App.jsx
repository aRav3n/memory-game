import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function buildGameplayObject(objectToClone, deck, clickedCards) {
  const gameplayObject = {};
  if (arguments.length === 0) {
    gameplayObject.deck = [];
    gameplayObject.currentScore = 0;
    gameplayObject.highScore = 0;
    gameplayObject.clickedCards = [];
  } else {
    gameplayObject.deck = objectToClone.deck;
    gameplayObject.currentScore = objectToClone.clickedCards.length;
    gameplayObject.highScore = objectToClone.highScore;
    gameplayObject.clickedCards = objectToClone.clickedCards;

    if (deck !== undefined) {
      gameplayObject.deck = deck;
    }
    if (clickedCards !== undefined) {
      gameplayObject.clickedCards = clickedCards;
      gameplayObject.currentScore = clickedCards.length;
    }
  }
  if (gameplayObject.currentScore > gameplayObject.highScore) {
    gameplayObject.highScore = gameplayObject.currentScore;
  }

  return gameplayObject;
}

function shuffleDeck(gameplay, setGameplay) {
  const localGameplayObject = buildGameplayObject(gameplay);
  const deck = localGameplayObject.deck;
  const shuffledCards = [];
  shuffledCards.length = deck.length;

  function getNewPosition() {
    let position = Math.floor(Math.random() * shuffledCards.length);
    if (shuffledCards[position] !== undefined) {
      position = getNewPosition();
    }
    return position;
  }

  for (let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[getNewPosition()] = deck[i];
  }

  localGameplayObject.deck = shuffledCards;

  setGameplay(localGameplayObject);
}

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

function updateGameState(newState, playerInfo, setContentToDisplay) {
  if (playerInfo.name !== undefined && playerInfo.difficulty !== undefined) {
    setContentToDisplay(newState);
  } else if (playerInfo.name === undefined) {
    const nameField = document.querySelector("#name");
    nameField.classList.add("missing");
  } else {
    const difficultyField = document.querySelector("fieldset");
    difficultyField.classList.add("missing");
  }
}

// Form displays for user to input their name and select a difficulty level
function UserInfoForm({
  contentToDisplay,
  setContentToDisplay,
  playerInfo,
  setPlayerInfo,
  gameplay,
  setGameplay,
}) {
  if (contentToDisplay !== "form") {
    return;
  }

  function buildPlayerObject(name, difficulty) {
    const playerObject = {};
    playerObject.name = name;
    playerObject.difficulty = difficulty;
    return playerObject;
  }

  function updatePlayerName(e) {
    const difficulty = playerInfo.difficulty;
    const newPlayerObject = buildPlayerObject(e.target.value, difficulty);
    setPlayerInfo(newPlayerObject);
  }

  function updatePlayerDifficulty(e) {
    const name = playerInfo.name;
    const newPlayerObject = buildPlayerObject(name, e.target.value);
    setPlayerInfo(newPlayerObject);
  }

  function changeToGameplay() {
    updateGameState("gameplay", playerInfo, setContentToDisplay);
  }

  return (
    <form>
      <label htmlFor="name">
        Player Name:
        <input type="text" name="name" id="name" onChange={updatePlayerName} />
      </label>
      <fieldset onChange={updatePlayerDifficulty}>
        <legend>Difficulty</legend>
        <label htmlFor="easy">
          Easy
          <input value="easy" type="radio" name="difficulty" id="easy" />
        </label>
        <label htmlFor="medium">
          Medium
          <input value="medium" type="radio" name="difficulty" id="medium" />
        </label>
        <label htmlFor="hard">
          Hard
          <input value="hard" type="radio" name="difficulty" id="hard" />
        </label>
      </fieldset>
      <button type="button" onClick={changeToGameplay}>
        Let&apos;s Go!
      </button>
    </form>
  );
}

function PlayState({
  contentToDisplay,
  setContentToDisplay,
  gameplay,
  setGameplay,
  playerInfo,
}) {
  if (contentToDisplay !== "gameplay") {
    return;
  }
  const player = playerInfo.name;

  function shuffleThisDeck(e) {
    const classOfObject = e.nativeEvent.explicitOriginalTarget.className;
    if (classOfObject === "cardButton") {
      shuffleDeck(gameplay, setGameplay);
    }
  }

  function startNewGame() {
    const zeroedScoreObject = buildGameplayObject(gameplay);
    zeroedScoreObject.currentScore = 0;
    setGameplay(zeroedScoreObject);
    setContentToDisplay("form");
  }

  return (
    <>
      <div>
        <h2>Good luck {player}!</h2>
        <h3>
          Pick a card! (If the cards haven&apos;t loaded yet, just be patient)
        </h3>
        <h3>
          You win by selecting all the cards! (be sure not to click on the same
          image twice)
        </h3>
        <div className="scoreBoard">
          <p>Current score: {gameplay.currentScore}</p>
          <p>High score: {gameplay.highScore}</p>
        </div>
      </div>
      <div id="cardGrid" onClick={shuffleThisDeck}>
        {gameplay.deck}
      </div>
      <button type="button" onClick={startNewGame} id="newGame">
        Start new game
      </button>
    </>
  );
}

function ResultState({ playerInfo, contentToDisplay }) {
  if (contentToDisplay !== "victory") {
    return;
  }
  const victoryMessage = `${playerInfo.name} won on ${playerInfo.difficulty} mode!`;
  return (
    <>
      <h4>{victoryMessage}</h4>
    </>
  );
}

function App() {
  const [gameplay, setGameplay] = useState(buildGameplayObject());
  const [contentToDisplay, setContentToDisplay] = useState("form");
  const [playerInfo, setPlayerInfo] = useState("");

  function buildButton(cardObject) {
    const name = cardObject.name;
    const imgSrc = cardObject.imgSrc;
    const key = uuid();
    function checkIfAlreadyClicked(clickedKey) {
      const clickedCardArray = [...gameplay.clickedCards];
      if (clickedCardArray.includes(clickedKey)) {
        return true;
      }
      return false;
    }

    function updateScore(key) {
      const localGameplayObject = buildGameplayObject(gameplay);
      const clickedCardArray = [...gameplay.clickedCards];
      if (checkIfAlreadyClicked(key)) {
        localGameplayObject.clickedCards.length = 0;
      } else {
        clickedCardArray.push(key);
        localGameplayObject.clickedCards.push(key);
      }

      setGameplay(localGameplayObject);
    }

    function cardClickAction() {
      const key = name;
      updateScore(key);
    }

    return (
      <button
        key={key}
        type="button"
        className="cardButton"
        onClick={cardClickAction}
      >
        <img src={imgSrc} alt={name} className="cardButton" />
        <p className="cardButton">{name}</p>
      </button>
    );
  }

  useEffect(() => {
    const difficulty = playerInfo.difficulty;
    async function parseJson(jsonObject) {
      try {
        const returnObject = {};
        returnObject.name = jsonObject.name;
        returnObject.imgSrc = jsonObject.image_uris.normal;
        return returnObject;
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getData() {
      const url = "https://api.scryfall.com/cards/random";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const card = await parseJson(json);
        return card;
      } catch (error) {
        console.error(error.message);
      }
    }

    async function buildDeck() {
      try {
        const deck = [];
        let numberOfCards = 0;
        if (difficulty === "easy") {
          numberOfCards = 6;
        } else if (difficulty === "medium") {
          numberOfCards = 9;
        } else {
          numberOfCards = 12;
        }
        deck.length = numberOfCards;

        for (let i = 0; i < deck.length; i++) {
          const cardObject = await getData();
          deck[i] = buildButton(cardObject);
        }

        return deck;
      } catch (error) {
        console.log(error.message);
      }
    }

    async function updateGameplay() {
      const deck = await buildDeck();
      const newGameplayObject = buildGameplayObject(gameplay, deck);
      setGameplay(newGameplayObject);
    }
    if (difficulty !== undefined) {
      updateGameplay();
    }
  }, [playerInfo.difficulty]);

  return (
    <>
      <Heading />
      <UserInfoForm
        contentToDisplay={contentToDisplay}
        setContentToDisplay={setContentToDisplay}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        gameplay={gameplay}
        setGameplay={setGameplay}
      />
      <PlayState
        contentToDisplay={contentToDisplay}
        setContentToDisplay={setContentToDisplay}
        gameplay={gameplay}
        setGameplay={setGameplay}
        playerInfo={playerInfo}
      />
      <ResultState
        playerInfo={playerInfo}
        contentToDisplay={contentToDisplay}
      />
      <Footing />
    </>
  );
}

export default App;
