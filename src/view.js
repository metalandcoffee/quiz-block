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
				context.solved = true;
			} else {
				context.showSorry = true;
				setTimeout( () => {
					context.showSorry = false;
				}, 2000 );
			}
		},
	},
	callbacks: {
		logIsOpen: () => {
			const { isOpen } = getContext();
			// Log the value of `isOpen` each time it changes.
			console.log( `Is open: ${ isOpen }` );
		},
	},
} );
