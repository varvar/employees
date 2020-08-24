import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <ul className="right">
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
            to="/"
          >
            Employees Manager
          </Link>
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
