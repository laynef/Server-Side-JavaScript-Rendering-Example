import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../redux/actions/user';
import { links } from './linkData';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from 'reactstrap';


@connect((state) => ({
	user: state.user.data,
}))

export default class Header extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			isOpen: false,
			collapse: false,
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
	}

	toggleMenu() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	toggleCollapse() {
		this.setState({
			isOpen: !this.state.collapse,
		});
	}

	render() {
		const { isOpen, collapse } = this.state;
		const { user, dispatch } = this.props;
		return (
			<div id="Header">
				<Navbar color="faded" dark expand="md">
					<Link className="text-white navbar-brand" to={user && user.userId ? '/dashboard' : '/'}>
                        RENS Framework
					</Link>
					<NavbarToggler onClick={this.toggleCollapse} className="mr-2" />
					<Collapse isOpen={collapse} navbar>
						<Nav className="ml-auto" navbar>
							{user && user.userId ? (
								<NavDropdown isOpen={isOpen} toggle={this.toggleMenu}>
									<DropdownToggle nav caret>
                                        Menu
									</DropdownToggle>
									<DropdownMenu className={`${isOpen ? 'menuDropdown': ''}`}>
										{links
											.filter(e => {
												switch (user.userPermissions) {
													case 'guest':
														return e.guest === true;
													case 'admin':
														return e.admin === true;
													case 'visitor':
														return e.visitor === true;
													default:
														return e;
												}
											})
											.map((e, i) => (
												<Link key={i} to={e.link}>
													<DropdownItem>
														{e.name}
													</DropdownItem>
												</Link>
											))}
										<DropdownItem onClick={() => dispatch(logout(user.userId))}>Logout</DropdownItem>
									</DropdownMenu>
								</NavDropdown>
							) : !user ? (
								<NavItem>
									<Link className="nav-link react-link" to="/signup">
                                        Login/Sign Up
									</Link>
								</NavItem>
							) : null}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}

}
