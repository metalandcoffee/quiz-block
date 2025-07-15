<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * Build custom context.
 */
$answers = array_map(function($text, $index) {
	return [
		'index' => $index,
		'text'  => $text,
	];
}, $attributes['answers'], array_keys($attributes['answers']));
$ourContext = [
	'answers'       => $answers,
	'solved'        => false,
	'showCongrats'  => false,
	'showSorry'     => false,
	'correctAnswer' => $attributes['correctAnswer'],
];

/**
 * Render the block.
 */
?>
<div
	class="quiz-block-frontend"
	data-wp-interactive="quiz-block"
	<?php echo wp_interactivity_data_wp_context( $ourContext ); ?>
	style="background-color: <?php echo $attributes['bgColor']; ?>"
>
	<p><?php echo $attributes['question']; ?></p>
	<ul>
		<?php foreach ( $ourContext['answers'] as $answer ) : ?>
			<li
				<?php echo wp_interactivity_data_wp_context( $answer ) ?>
				data-wp-on--click="actions.guessAttempt"
			>
				<?php echo $answer['text']; ?>
			</li>
		<?php endforeach; ?>
	</ul>

	<div class="correct-message" data-wp-class--correct-message--visible="context.showCongrats">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-emoji-smile" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
        </svg>
		<p>Congratulations! That is correct!</p>
	</div>
	<div class="incorrect-message" data-wp-class--incorrect-message--visible="context.showSorry">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-emoji-frown" viewBox="0 0 16 16">
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
		</svg>
		<p>Sorry, try again.</p>
	</div>
</div>