/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';
import Button from 'components/button';
import EditorGutenbergOptInDialog from 'post-editor/editor-gutenberg-opt-in-dialog';

function EditorGutenbergOptInSidebar( { translate } ) {
	return (
		<div className="editor-gutenberg-opt-in-sidebar">
			<img src="/calypso/images/illustrations/gutenberg-mini.svg" alt="" />
			<p>{ translate( 'Try our new editor and level-up your layout.' ) }</p>
			<Button onClick={ EditorGutenbergOptInDialog.onShowDialog } action="show">
				{ translate( 'Learn more' ) }
			</Button>
		</div>
	);
}

EditorGutenbergOptInSidebar.propTypes = {
	translate: PropTypes.func,
};

export default localize( EditorGutenbergOptInSidebar );
