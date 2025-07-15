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
	Dashicon,
} from '@wordpress/components';
import { starEmpty, starFilled } from '@wordpress/icons';

import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

/**
 * External dependencies.
 */
import { ChromePicker } from 'react-color';

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
	// @todo switch to using core ColorPicker.
	// @todo destructure attributes.
	// @todo any opportunites to use useEffect?
	// @todo any opportunities to use state?
	// create state for preview
	// Use sass files for styling
	// const [ preview, setPreview ] = useState( false );

	function updateQuestion( value ) {
		setAttributes( { question: value } );
	}

	function deleteAnswer( indexToDelete ) {
		const newAnswers = attributes.answers.filter( function ( x, index ) {
			return index != indexToDelete;
		} );
		setAttributes( { answers: newAnswers } );

		if ( indexToDelete == attributes.correctAnswer ) {
			setAttributes( { correctAnswer: undefined } );
		}
	}

	function markAsCorrect( index ) {
		setAttributes( { correctAnswer: index } );
	}

	return (
		<div { ...useBlockProps() }>
			<div
				style={ { backgroundColor: attributes.bgColor } }
			>
				<BlockControls>
					<AlignmentToolbar
						value={ attributes.theAlignment }
						onChange={ ( x ) =>
							setAttributes( { theAlignment: x } )
						}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title="Background Color" initialOpen={ true }>
						<PanelRow>
							<ChromePicker
								color={ attributes.bgColor }
								onChangeComplete={ ( x ) =>
									setAttributes( { bgColor: x.hex } )
								}
								disableAlpha={ true }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="Question:"
					value={ attributes.question }
					onChange={ updateQuestion }
					style={ { fontSize: '20px' } }
				/>
				<p style={ { fontSize: '13px', margin: '20px 0 8px 0' } }>
					Answers:
				</p>
				{ attributes.answers.map( function ( answer, index ) {
					return (
						<Flex key={ index }>
							<FlexBlock>
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									autoFocus={ answer == undefined }
									value={ answer }
									onChange={ ( newValue ) => {
										const newAnswers =
											attributes.answers.concat( [] );
										newAnswers[ index ] = newValue;
										setAttributes( {
											answers: newAnswers,
										} );
									} }
								/>
							</FlexBlock>
							<FlexItem>
								<Button
									onClick={ () => markAsCorrect( index ) }
								>
									<Icon
										className="mark-as-correct"
										icon={
											attributes.correctAnswer == index
												? starFilled
												: starEmpty
										}
									/>
								</Button>
							</FlexItem>
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
					isPrimary
					onClick={ () => {
						setAttributes( {
							answers: attributes.answers.concat( [
								'',
							] ),
						} );
					} }
				>
					Add another answer
				</Button>
			</div>
		</div>
	);
}
