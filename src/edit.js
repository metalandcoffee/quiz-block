/**
 * WordPress dependencies.
 */
import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
	PanelBody,
	PanelRow,
	ColorPicker,
} from '@wordpress/components';
import { starEmpty, starFilled } from '@wordpress/icons';

import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	// @todo destructure attributes.
	// @todo replace icons with icons from wordpress core
	// @todo any opportunites to use useEffect?
	// @todo any opportunities to use state?
	// @todo update readme with explanation 
	// create state for preview
	// Use sass files for styling
	// const [ preview, setPreview ] = useState( false );

	const { bgColor, theAlignment, question, answers, correctAnswer } = attributes;

	function updateQuestion( value ) {
		setAttributes( { question: value } );
	}

	function deleteAnswer( indexToDelete ) {
		const newAnswers = answers.filter( function ( x, index ) {
			return index != indexToDelete;
		} );
		setAttributes( { answers: newAnswers } );

		if ( indexToDelete == correctAnswer ) {
			setAttributes( { correctAnswer: undefined } );
		}
	}

	function markAsCorrect( index ) {
		setAttributes( { correctAnswer: index } );
	}

	return (
		<div { ...useBlockProps() }>
			<div
				style={ { backgroundColor: bgColor } }
			>
				<BlockControls>
					<AlignmentToolbar
						value={ theAlignment }
						onChange={ ( newAlignment ) =>
							setAttributes( { theAlignment: newAlignment } )
						}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title="Background Color" initialOpen={ true }>
						<PanelRow>
							<ColorPicker
								color={ bgColor }
								onChange={ ( newColor ) =>
									setAttributes( { bgColor: newColor } )
								}
								enableAlpha
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="Question:"
					value={ question }
					onChange={ updateQuestion }
					style={ { fontSize: '20px' } }
				/>
				<p style={ { fontSize: '13px', margin: '20px 0 8px 0' } }>
					Answers:
				</p>
				{ answers.map( function ( answer, index ) {
					return (
						<Flex key={ index }>
							<FlexItem>
								<Button
									onClick={ () => markAsCorrect( index ) }
								>
									<Icon
										className="mark-as-correct"
										icon={
											correctAnswer == index
												? starFilled
												: starEmpty
										}
									/>
								</Button>
							</FlexItem>
							<FlexBlock>
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									autoFocus={ answer == undefined }
									value={ answer }
									onChange={ ( newValue ) => {
										const newAnswers =
											answers.concat( [] );
										newAnswers[ index ] = newValue;
										setAttributes( {
											answers: newAnswers,
										} );
									} }
								/>
							</FlexBlock>
							<FlexItem>
								<Button
									className="answer-delete"
									onClick={ () => deleteAnswer( index ) }
								>
									Delete
								</Button>
							</FlexItem>
						</Flex>
					);
				} ) }
				<Button
					onClick={ () => {
						setAttributes( {
							answers: answers.concat( [
								'',
							] ),
						} );
					} }
				>
					Add another choice
				</Button>
			</div>
		</div>
	);
}
