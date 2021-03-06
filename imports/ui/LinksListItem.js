import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';

export default class LinksListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		}
	}

	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);	
		
		this.clipboard.on('success', () => {
			this.setState({ justCopied: true });
			setTimeout(() => {
				this.setState({ justCopied: false });
			}, 1000);
		}).on('error', (err) => {
			alert('Unable to copy, please manually copy the link.');
		});
	}
	
	componentWillUnmount() {
		this.clipboard.destroy();
	}

	render () {
		return (
			<div>
				<p>{this.props.url}</p>
				<p>{this.props.shortUrl}</p>				
				<p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p>
				<button ref="copy" data-clipboard-text={this.props.shortUrl}>
					{this.state.justCopied ? 'Copied' : 'Copy'}
				</button>
				<button onClick = {() =>{
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
				}}>
					{this.props.visible ? 'Hide' : 'Unhide'}
				</button>
			</div>
		);
	};
};

LinksListItem.propTypes = {
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	shortUrl: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	visitedCount: PropTypes.number.isRequired,
	lastVisitedAt: PropTypes.number
};