import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import { textInput } from '../../redux/utils/forms';
import { getMessages, createMessage } from '../../redux/actions/message';
import _ from 'lodash';
import {
	Alert,
} from 'reactstrap';
import Loader from "../../components/Loader";


@reduxForm({
	form: 'MessagingPage',
})

@connect((state) => {
	let messages = state.messages.data && state.messages.data[1] ? _.uniq(state.messages.data[1]) : state.messages.data;
	return {
		message: messages,
		user: state.user.data,
	};
})

export default class MessagingPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [],
			initial: true,
		};
	}

	componentDidMount() {
		const { dispatch, user } = this.props;
		let { initial } = this.state;
		if (initial) {
			dispatch(getMessages(1));
		}
		if (user) {
			global.socket.emit('loginUser', `${user.userProfileFirstName} ${user.userProfileLastName}`);
		}
		global.socket.on('addNewMessage', data => this.broadcastNewMessage(data, this.state.messages));
	}

	componentWillUnmount() {
		global.socket.removeListener('loginUser');
		global.socket.removeListener('addNewMessage');
	}

	broadcastNewMessage(data, messages) {
		messages.push(data);
		this.setState({
			messages: messages,
		});
	}

	receivedProps(data) {
		this.setState({
			initial: false,
			messages: data,
		});
	}

	yourMessage(data, key) {
		return (
			<Alert key={key} className="your-chat-bubble" color="info">
				{`${data.text}`}
			</Alert>
		);
	}

	theirMessage(data, key) {
		return (
			<div key={key} className="their-chat-bubble">
				<Alert color="dark">
					{`${data.userProfileFirstName ? data.userProfileFirstName : 'Anonymous'} ${data.userProfileLastName ? data.userProfileLastName : 'Default'}: ${data.text}`}
				</Alert>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps) return true;
		return false;
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.initial && nextProps.message) {
			this.receivedProps(nextProps.message);
		}
	}

	formSubmit(data) {
		const { dispatch, user, reset } = this.props;
		data.threadId = 1;
		data.userId = user.userId;
		data.userProfileFirstName = user.userProfileFirstName;
		data.userProfileLastName = user.userProfileLastName;
		let nextState = this.state.messages.slice(0);
		nextState.push(data);
		this.setState({
			messages: nextState,
		});
		global.socket.emit('addNewMessage', data);
		delete data.userProfileFirstName;
		delete data.userProfileLastName;
		dispatch(createMessage(data));
		dispatch(reset('MessagingPage'));
	}

	render() {
		const { handleSubmit, user } = this.props;
		let { messages } = this.state;
		return (
			<div id="MessagingPage">
				<h1 className="text-center">Messaging Example</h1>
				<div className="col-xs-12 col-sm-12 col-md-9 col-lg-6">
					<div className="card">
						<div className="card-header">
							<h4>Chat Room</h4>
						</div>
						<Form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
							<div className="card-body chat-body">
								{user && user.userId && messages.length ? messages.map((e, i) => user.userId === e.userId ? this.yourMessage(e, i) : this.theirMessage(e, i))
									: <Loader/>}
							</div>
							<div className="card-footer">
								<Field component={textInput} placeholder="Enter message" name="text" />
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}

}
