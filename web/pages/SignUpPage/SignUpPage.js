import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { renderIconInput } from '../../redux/utils/forms';
import { register, login } from '../../redux/actions/user';

@reduxForm({
	form: 'SignUpPage',
})

@connect(() => ({
}))

export default class SignUpPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	formSignUpSubmit(data) {
		const { dispatch } = this.props;
		data.email = data.suEmail;
		data.password = data.suPassword;
		dispatch(register(data));
	}

	formLoginSubmit(data) {
		const { dispatch } = this.props;
		dispatch(login(data));
	}

	guestEntry() {
		const { dispatch } = this.props;
		dispatch(login({
			email: 'guest@email.com',
			password: 'pass1234',
		}));
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div id="SignUpPage" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<h1 className="text-center">Authentication</h1>
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<div className="card">
						<div className="card-header">
							<h4>Sign Up</h4>
						</div>
						<div className="card-body">
							<Form onSubmit={handleSubmit(this.formSignUpSubmit.bind(this))} action>
								<Field component={renderIconInput} type="text" placeholder="Enter first name" cname="1" icon="fa fa-user" name="firstName" />
								<Field component={renderIconInput} type="text" placeholder="Enter last name" cname="1" icon="fa fa-user" name="lastName" />
								<Field component={renderIconInput} type="email" placeholder="Enter email" cname="1" icon="fa fa-envelope" name="suEmail" />
								<Field component={renderIconInput} type="password" cname="1" placeholder="Enter password" icon="fa fa-lock" name="suPassword" />
								<Field component={renderIconInput} type="password" cname="2" placeholder="Confirm password" icon="fa fa-lock" name="repassword" />
								<button className="btn btn-info">Sign Up</button>
							</Form>
						</div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<div className="card">
						<div className="card-header">
							<h4>Login</h4>
						</div>
						<div className="card-body">
							<Form onSubmit={handleSubmit(this.formLoginSubmit.bind(this))} action>
								<Field component={renderIconInput} type="email" placeholder="Enter email" cname="1" icon="fa fa-envelope" name="email" />
								<Field component={renderIconInput} type="password" cname="1" placeholder="Enter password" icon="fa fa-lock" name="password" />
								<button className="btn btn-info">Login</button>
								<span className="btn btn-primary" onClick={() => this.guestEntry()}>Enter as Guest</span>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
