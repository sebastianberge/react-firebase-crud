import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../actions/userAction';

class Login extends Component {
	componentWillMount() {
		if (this.props.user !== null) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nexProps) {
		if (nexProps.user !== null) {
			nexProps.history.push('/');
		}
	}

	render() {
		return (
			<div className="container-fluid mt-5">
				<div className="row text-center">
					<div className="col-sm-12 jumbotron" style={{ marginTop: '-20px' }}>
						<h1>
							Login to <b>CRUD-APP</b>
						</h1>
					</div>
				</div>
				<div className="row text-center">
					<div className="col-sm-12">
						<button
							className="btn btn-danger btn-lg"
							onClick={this.props.googleLogin}
						>
							Google Login
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({ user: state.user });

export default connect(
	mapStateToProps,
	{ googleLogin }
)(Login);
