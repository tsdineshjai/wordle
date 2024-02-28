import React from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
// import { range } from "../../utils";

import { checkGuess } from "../../game-helpers";

import "./Guess.css";

let globalId = 1;
let cellGlobalId = 1;

function Guess({ answer }) {
	const [guess, setGuess] = React.useState("");
	const [guessList, setGuessList] = React.useState([]);

	function handleSubmit(e) {
		e.preventDefault();
		const result = checkGuess(guess, answer);
		const newGuessList = [...guessList, { answer: result, id: globalId++ }];
		console.log(newGuessList[0].answer);

		setGuessList(newGuessList);
		setGuess("");
	}

	const correctAnswer = guess === answer;

	return (
		<div className="guess-input-wrapperr">
			{correctAnswer && (
				<div className="overlay correct">
					<p>
						<strong>Congratulations! </strong>You got correct in{" "}
						{guessList.length} guesses
					</p>
				</div>
			)}
			{guessList.length >= 5 && (
				<div className="overlay incorrect">
					<p>
						Sorry, the correct answer is <strong>{answer}</strong>
					</p>
				</div>
			)}
			{guessList.length > 0 && (
				<div className="guess-results">
					{guessList.slice(0, NUM_OF_GUESSES_ALLOWED).map((guess) => {
						const { answer } = guess;
						return (
							<p className="guess" key={guess.id}>
								{answer.map((cell) => {
									const { status, letter } = cell;
									return (
										<span
											key={cellGlobalId++}
											className={`cell-input ${status}`}
										>
											{letter}
										</span>
									);
								})}
							</p>
						);
					})}
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<label htmlFor="input-guess">Guess the word:</label>
				<input
					value={guess}
					onChange={(e) => {
						setGuess(e.target.value.toUpperCase());
					}}
					name="guess-input"
					id="input-guess"
					required
					type="text"
					pattern="[A-Za-z]{5,5}"
				/>

				<button className="guess-button">Submit</button>
			</form>
		</div>
	);
}

export default Guess;
