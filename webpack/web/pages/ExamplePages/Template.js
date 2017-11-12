import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';



@reduxForm({
	form: 'Template',
})

@connect(() => ({
}))

export default class Template extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	render() {
		return (
			<div id="Template">
				<h1 className="text-center">Template Example</h1>
			</div>
		);
	}

}
