import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveComment } from '../actions/notesAction';

class SubmitComment extends Component {
	state = {
		commentBody: ''
	};

	handleChange = event => {
		this.setState({ commentBody: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const comment = {
			commentBody: this.state.commentBody,
			uid: this.props.uid
		};
		this.props.saveComment(this.props.id, comment);
		this.setState({ commentBody: '' });
	};

	render() {
		const { commentBody } = this.state;

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<textarea
							onChange={this.handleChange}
							value={commentBody}
							type="text"
							name="commentBody"
							className="form-control no-border"
							placeholder="Write a comment"
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-success">Add comment</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({ uid: state.user.uid });

export default connect(
	mapStateToProps,
	{ saveComment }
)(SubmitComment);
