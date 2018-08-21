/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getEditorPostId } from 'state/ui/editor/selectors';
// import { getEditedPostValue } from 'state/posts/selectors';
import { getSiteSlug } from 'state/sites/selectors';
import Button from 'components/button';
import Dialog from 'components/dialog';

class EditorGutenbergOptIn extends Component {
	state = {
		showDialog: true,
	};
	static propTypes = {
		translate: PropTypes.func,
		siteSlug: PropTypes.string,
		postID: PropTypes.string,
		postType: PropTypes.string,
	};

	render() {
		const { translate, siteSlug, postID } = this.props;
		const buttons = [
			<Button key="gutenberg" href={ `gutenberg/post/${ siteSlug }/${ postID || '' }` } primary>
				{ translate( 'Try the new editor' ) }
			</Button>,
			{ action: 'cancel', label: translate( 'Use the classic editor' ) },
		];
		return (
			<div>
				<Dialog
					isVisible={ this.state.showDialog }
					buttons={ buttons }
					className="editor-gutenberg-opt-in__dialog"
					onClose={ this.onCloseDialog }
				>
					<div className="editor-gutenberg-opt-in__left">
						<img src="/calypso/images/posts/gutenberg.png" alt="" />
					</div>
					<div className="editor-gutenberg-opt-in__right">
						<h1>{ translate( 'Try out the new building blocks of the web' ) }</h1>
						<p>
							{ translate(
								'A new publishing experience is coming to WordPress. The new editor lets you pick from a growing collection of blocks to build your ideal layout.'
							) }
						</p>
						<p>
							{ translate(
								'Be one of the first to try the new editor and help us make it the best publishing experience on the web.'
							) }
						</p>
					</div>
				</Dialog>

				<div className="editor-gutenberg-opt-in__sidebar">
					<p>Try our new editor and level-up your layout.</p>
					<Button onClick={ this.onShowDialog } action="show">
						Learn more
					</Button>
				</div>
			</div>
		);
	}

	onShowDialog = () => {
		this.setState( { showDialog: true } );
	};

	onCloseDialog = () => {
		this.setState( { showDialog: false } );
	};
}

export default connect( state => {
	const siteID = getSelectedSiteId( state );
	const postID = getEditorPostId( state );
	// const postType = getEditedPostValue( state, siteID, postID, 'type' );
	return {
		siteSlug: getSiteSlug( state, siteID ),
		postID: postID,
	};
} )( localize( EditorGutenbergOptIn ) );
