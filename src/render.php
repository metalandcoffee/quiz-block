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
?>

<div
	class="quiz-block-frontend"
	data-wp-interactive="quiz-block"
	<?php echo wp_interactivity_data_wp_context( $attributes ); ?>
	style="background-color: <?php echo $attributes['bgColor']; ?>"
>
	<p><?php echo $attributes['question']; ?></p>
	<ul>
		<?php foreach ( $attributes['answers'] as $answer ) : ?>
			<li
			data-wp-context='{"answer": "<?php echo $answer; ?>"}'
			data-wp-on--click="actions.guessAttempt"
			>
				<?php echo $answer; ?>
			</li>
		<?php endforeach; ?>
	</ul>
</div>