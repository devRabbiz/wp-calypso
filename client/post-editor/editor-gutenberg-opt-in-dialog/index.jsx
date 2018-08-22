/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCurrentRoute from 'state/selectors/get-current-route';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';
import Button from 'components/button';
import Dialog from 'components/dialog';

class EditorGutenbergOptInDialog extends Component {
	state = {
		showDialog: true,
	};
	static propTypes = {
		translate: PropTypes.func,
		gutenbergURL: PropTypes.string,
	};

	render() {
		const { translate, gutenbergURL } = this.props;
		const buttons = [
			<Button key="gutenberg" href={ gutenbergURL } primary>
				{ translate( 'Try the new editor' ) }
			</Button>,
			{ action: 'cancel', label: translate( 'Use the classic editor' ) },
		];
		return (
			<Dialog
				isVisible={ this.state.showDialog }
				buttons={ buttons }
				className="editor-gutenberg-opt-in-dialog"
				onClose={ this.onCloseDialog }
			>
				<div className="editor-gutenberg-opt-in-dialog__left">
					<img src="/calypso/images/illustrations/gutenberg.svg" alt="" />
				</div>
				<div className="editor-gutenberg-opt-in-dialog__right">
					<header>
						<button
							onClick={ this.onCloseDialog }
							className="editor-gutenberg-opt-in-dialog__close"
						>
							<Gridicon icon="cross" />
						</button>
					</header>
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
	const currentRoute = getCurrentRoute( state );
	return {
		gutenbergURL: `/gutenberg${ currentRoute }`,
	};
} )( localize( EditorGutenbergOptInDialog ) );
