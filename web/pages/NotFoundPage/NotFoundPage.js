import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';



@reduxForm({
	form: 'NotFoundPage',
})

@connect(() => ({
}))

export default class NotFoundPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	render() {
		return (
			<div id="NotFoundPage">
				<h1 className="text-center">Not Found</h1>
			</div>
		);
	}

}
