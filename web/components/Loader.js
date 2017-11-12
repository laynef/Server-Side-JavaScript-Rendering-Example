import React, { Component } from 'react';
import { connect } from 'react-redux';
import MDSpinner from "react-md-spinner";


@connect(() => ({
}))

export default class Loader extends Component {

	render() {
		return (
			<div id="Loader">
				<MDSpinner />
			</div>
		);
	}

}
