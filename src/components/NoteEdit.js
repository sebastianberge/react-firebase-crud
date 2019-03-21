import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editNote } from '../actions/notesAction';

class NoteEdit extends Component {
	state = {
		title: this.props.note.title,
		body: this.props.note.body
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const note = {
			title: this.state.title,
			body: this.state.body,
			uid: this.props.uid
		};
		this.props.editNote(this.props.match.params.id, note);
		this.setState({
			title: '',
			body: ''
		});
		this.props.history.push('/');
	};

	render() {
		const { title, body } = this.state;

		return (
			<div className="container-fluid mt-5">
				<div className="row flex justify-content-center">
					<div className="col-sm-6 col-sm-offset-3">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input
									onChange={this.handleChange}
									value={title}
									type="text"
									name="title"
									className="form-control no-border"
									placeholder="Title"
									required
								/>
							</div>
							<div className="form-group">
								<textarea
									onChange={this.handleChange}
									value={body}
									type="text"
									name="body"
									className="form-control no-border"
									placeholder="Post"
									required
								/>
							</div>
							<div className="form-group">
								<button className="btn btn-primary col-sm-12">Update</button>
							</div>
						</form>
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

export default connect(
	mapStateToProps,
	{ editNote }
)(NoteEdit);
