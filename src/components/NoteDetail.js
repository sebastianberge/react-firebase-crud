import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from './Comment';

class NoteDetail extends Component {
	renderComment() {
		const { note } = this.props;
		return _.map(note.comments, (comment, key) => {
			return (
				<Comment key={key} id={key}>
					{comment.commentBody}
				</Comment>
			);
		});
	}

	render() {
		const { note } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<h1>{note.title}</h1>
						<p>{note.body}</p>
						<SubmitComment id={this.props.match.params.id} />
						{this.renderComment()}
						<br />
						<Link to="/">Back</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	note: state.notes[props.match.params.id],
	uid: state.user.uid
});

export default connect(mapStateToProps)(NoteDetail);
