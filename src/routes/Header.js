import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userAction';

class Header extends Component {
	render() {
		return (
			<nav
				className="navbar navbar-collapse navbar-dark bg-dark"
				id="#myNavbar"
			>
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">
							CRUD-APP
						</Link>
					</div>
					<ul className="nav navbar-nav navbar-right">
						{this.props.user === null ? (
							<li>
								<Link to="/login">Login</Link>
							</li>
						) : (
							<li>
								<Link to="/logout" onClick={() => this.props.logout()}>
									Logout
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({ user: state.user });

export default connect(
	mapStateToProps,
	{ getUser, logout }
)(Header);
