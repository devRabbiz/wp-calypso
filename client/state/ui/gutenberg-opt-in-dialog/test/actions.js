/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { showGutenbergOptInDialog, hideGutenbergOptInDialog } from '../actions';
import { GUTENBERG_OPT_IN_DIALOG_IS_SHOWING } from 'state/action-types';

describe( 'actions', () => {
	describe( 'showGutenbergOptInDialog()', () => {
		test( 'should return an action object', () => {
			const action = showGutenbergOptInDialog();

			expect( action ).to.eql( {
				type: GUTENBERG_OPT_IN_DIALOG_IS_SHOWING,
				isShowing: true,
			} );
		} );
	} );

	describe( 'hideGutenbergOptInDialog()', () => {
		test( 'should return an action object', () => {
			const action = hideGutenbergOptInDialog();

			expect( action ).to.eql( {
				type: GUTENBERG_OPT_IN_DIALOG_IS_SHOWING,
				isShowing: false,
			} );
		} );
	} );
} );
