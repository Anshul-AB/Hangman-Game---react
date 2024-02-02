import React, { useCallback, useEffect } from "react";
import { useState } from "react"
import words from './wordList.json'
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";


function App() {

  // Fn to get Random word from array
  function getWord() {
    return words[Math.floor(Math.random() * words.length)]
  }

  // create wordToGuess state
  const [wordToGuess, setWordToGuess] = useState(getWord)

  // create state to store guessedLetters
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  //  create new array by filtering guessedLetters to not include letters present in wordToGuess
  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

  // Set number of guesses to 6
  const isLoser = incorrectLetters.length >= 6

  // set winner , if all guessedLetters include letters present in wordToGuess
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  // Adding guessedLetters to setGuessedLetters
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isLoser, isWinner]
  )

  // Adding letters via KeyboardEvent and add the letter to the addGuessedLetter array
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  // Load new wordToGuess by pressing 'Enter key'
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <div
      style={{
        maxWidth: "800px",
        maxHeight: '100vh',
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
        padding: '10px',
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center", fontWeight: "bolder" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuess={incorrectLetters.length} />

      <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal={isLoser} />

      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
