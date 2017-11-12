import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';



@reduxForm({
	form: 'RemovedPage',
})

@connect(() => ({
}))

export default class RemovedPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	render() {
		return (
			<div id="RemovedPage">
				<h1 className="text-center">You have been removed!</h1>
			</div>
		);
	}

}
