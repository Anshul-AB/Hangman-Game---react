type HangmanWordProps = {
    wordToGuess: string[],
    guessedLetters: string[]
    reveal?: boolean
}

export function HangmanWord({ wordToGuess, guessedLetters, reveal = false }: HangmanWordProps) {
    return (
        <div
            style={{
                display: "flex",
                gap: ".25em",
                fontSize: "4rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}
        >
            {wordToGuess.split("").map((letter, index) =>
            (
                <span style={{ borderBottom: ".1em solid black" }} key={index}>
                    <span style={{
                        visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color:
                            !guessedLetters.includes(letter) && reveal ? "red" : "blue",
                    }}>{letter}</span>
                </span>

            )
            )}
        </div>
    )
}