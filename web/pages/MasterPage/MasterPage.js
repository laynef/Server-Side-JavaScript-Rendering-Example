import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import Header from '../../components/Header';


@asyncConnect([{
	promise: () => {
		const promises = [];
		return Promise.all(promises);
	},
}])

@connect(() => ({

}))

@reduxForm({
	form: 'MasterPage',
})

export default class MasterPage extends Component {

	render() {
		const { children } = this.props;
		return (
			<div className="app">
				<Header />
				{ children }
			</div>
		);
	}
}
