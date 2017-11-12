import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Loader from "../../components/Loader";


@connect((state) => ({
	user: state.user.data,
}))

@reduxForm({
	form: 'DashboardPage',
})

export default class DashboardPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	render() {
		const { user } = this.props;
		return (
			<div id="DashboardPage">
				{user ?
					<h1 className="text-center">Hello {user.userProfileFirstName || "New"} {user.userProfileLastName || "Guest"}</h1> :
					<Loader/>
				}
			</div>
		);
	}
}
