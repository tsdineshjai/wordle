import React from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
// import { range } from "../../utils";

import { checkGuess } from "../../game-helpers";

import "./Guess.css";

let globalId = 1;
let cellGlobalId = 1;

console.log(NUM_OF_GUESSES_ALLOWED);

function Guess() {
	const [guess, setGuess] = React.useState("");

	const [guessList, setGuessList] = React.useState([]);
	console.log(guessList);

	function handleSubmit(e) {
		e.preventDefault();
		setGuess("");
		const newGuessList = [...guessList, { answer: guess, id: globalId++ }];
		setGuessList(newGuessList);
	}
	return (
		<div className="guess-input-wrapperr">
			{guessList.length > 0 && (
				<div className="guess-results">
					{guessList.slice(0, NUM_OF_GUESSES_ALLOWED).map((guess) => {
						const { answer } = guess;

						return (
							<p className="guess" key={guess.id}>
								{[...answer].map((cell) => {
									return (
										<span key={cellGlobalId++} className="cell-input">
											{cell}
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
