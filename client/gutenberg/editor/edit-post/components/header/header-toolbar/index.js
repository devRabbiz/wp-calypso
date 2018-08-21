/**
 * External dependencies
 *
 * @format
 */
import React from 'react';
import { findLast } from 'lodash';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';
import page from 'page';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Inserter,
	BlockToolbar,
	TableOfContents,
	EditorHistoryRedo,
	EditorHistoryUndo,
	NavigableToolbar,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Drafts from 'layout/masterbar/drafts';
import Site from 'blocks/site';
import { addSiteFragment } from 'lib/route';
import { recordTracksEvent } from 'state/analytics/actions';
import { getSelectedSite } from 'state/ui/selectors';
import { getRouteHistory } from 'state/ui/action-log/selectors';

function getCloseButtonPath( routeHistory, site, post ) {
	// @see post-editor/editor-ground-control/index.jsx
	const lastNonEditorPath = findLast(
		routeHistory,
		action => ! action.path.match( /^\/gutenberg\/(post|page|(edit\/[^\/]+))\/[^\/]+(\/\d+)?$/i )
	);
	if ( lastNonEditorPath ) {
		return lastNonEditorPath.path;
	}

	// @see post-editor/post-editor.jsx
	const { type } = post;
	let path = '';
	switch ( type ) {
		case 'page':
			path = '/pages';
			break;
		case 'post':
			path = '/posts';
			break;
		default:
			path = `/types/${ type }`;
	}
	if ( type === 'post' && site && ! site.jetpack && ! site.single_user_site ) {
		path += '/my';
	}
	if ( site ) {
		path = addSiteFragment( path, site.slug );
	}
	return path;
}

/* eslint-disable wpcalypso/jsx-classname-namespace */
function HeaderToolbar( {
	hasFixedToolbar,
	isLargeViewport,
	recordCloseButtonClick,
	recordSiteButtonClick,
	routeHistory,
	post,
	site,
	translate,
} ) {
	const onCloseButtonClick = () => {
		recordCloseButtonClick();
		page.show( getCloseButtonPath( routeHistory, site, post ) );
	};

	return (
		<NavigableToolbar className="edit-post-header-toolbar" aria-label={ __( 'Editor Toolbar' ) }>
			<Button
				borderless
				className="edit-post-header-toolbar__back"
				onClick={ onCloseButtonClick }
				aria-label={ translate( 'Close' ) }
			>
				{ translate( 'Close' ) }
			</Button>
			<Site compact site={ site } indicator={ false } onSelect={ recordSiteButtonClick } />
			<Drafts />
			<Inserter position="bottom right" />
			<EditorHistoryUndo />
			<EditorHistoryRedo />
			<TableOfContents />
			{ hasFixedToolbar &&
				isLargeViewport && (
					<div className="edit-post-header-toolbar__block-toolbar">
						<BlockToolbar />
					</div>
				) }
		</NavigableToolbar>
	);
}
/* eslint-enable wpcalypso/jsx-classname-namespace */

const mapStateToProps = state => ( {
	routeHistory: getRouteHistory( state ),
	site: getSelectedSite( state ),
} );

const mapDispatchToProps = {
	recordSiteButtonClick: () => recordTracksEvent( 'calypso_gutenberg_editor_site_button_click' ),
	recordCloseButtonClick: () => recordTracksEvent( 'calypso_gutenberg_editor_close_button_click' ),
};

export default compose( [
	withSelect( select => ( {
		hasFixedToolbar: select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ),
	} ) ),
	withViewportMatch( { isLargeViewport: 'medium' } ),
] )(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)( localize( HeaderToolbar ) )
);
