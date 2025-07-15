/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state } = store( 'quiz-block', {
	state: {
		get themeText() {
			return state.isDark ? state.darkText : state.lightText;
		},
	},
	actions: {
		guessAttempt: () => {
			const context = getContext();

			// If the quiz has already been solved, do nothing.
			if ( context.solved ) {
				return;
			}

			// Otherwise, evaluate the guess.
			if ( context.index === context.correctAnswer ) {
				context.showCongrats = true;
				setTimeout(() => {
					context.solved = true;
				}, 2000);
			} else {
				context.showSorry = true;
				setTimeout( () => {
					context.showSorry = false;
				}, 2000 );
			}
		},
	},
	callbacks: {
		fadeIncorrect: () => {
			const { solved, correct } = getContext();
			return solved && !correct;
		},
	},
} );
