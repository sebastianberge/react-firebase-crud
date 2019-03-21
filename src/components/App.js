import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getNotes, saveNote, deleteNote } from '../actions/notesAction';
import NoteCard from './NoteCard';
import { getUser } from '../actions/userAction';
import { Link } from 'react-router-dom';

class App extends Component {
	state = {
		title: '',
		body: ''
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
			uid: this.props.user.uid
		};
		this.props.saveNote(note);
		this.setState({
			title: '',
			body: ''
		});
	};

	renderNotes() {
		return _.map(this.props.notes, (note, key) => {
			return (
				<NoteCard key={key}>
					<Link to={`/${key}`}>
						<h2>{note.title}</h2>
					</Link>
					<p>{note.body}</p>
					{note.uid === this.props.user.uid && (
						<div>
							<button
								className="btn btn-danger btn-xs"
								onClick={() => this.props.deleteNote(key)}
							>
								Delete
							</button>
							<button className="btn btn-info btn-xs pull-right">
								<Link to={`/${key}/edit`}>Update</Link>
							</button>
						</div>
					)}
				</NoteCard>
			);
		});
	}

	render() {
		const { title, body } = this.state;

		return (
			<div className="container-fluid mt-5">
				<div className="row flex justify-content-center">
					<div className="col-sm-2 text-center">
						<img
							alt="User"
							src={this.props.user.photoURL}
							height="100px"
							className="img img-responsive circle"
							style={{ padding: '20px' }}
						/>
						<h4>Welcome back {this.props.user.displayName}</h4>
					</div>
					<div className="col-sm-10">
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
								<button className="btn btn-primary col-sm-12">Save</button>
							</div>
						</form>
						{this.renderNotes()}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		notes: state.notes,
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{ getNotes, saveNote, deleteNote, getUser }
)(App);
