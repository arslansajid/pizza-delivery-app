
import React from "react";
import { Link, withRouter } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { connect } from 'react-redux';

import * as userAction from '../../actions/userAction';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

function ExamplesNavbar(props) {
  console.log("HEADER PROPS", props)
  const [navbarColor, setNavbarColor] = React.useState(props.location.pathname === "/" ? "navbar-transparent" : "navbar");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [authState, setAuthState] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };


  const clearSessionStorage = () => {
    sessionStorage.removeItem('jwt');
    setAuthState(!authState)
  }


  React.useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      props.loginSuccess();
    } else {
      props.loginUnSuccess();
    }

    const updateNavbarColor = () => {
      // if (
      //   document.documentElement.scrollTop > 99 ||
      //   document.body.scrollTop > 99
      // ) {
      //   setNavbarColor("");
      // } else if (
      //   document.documentElement.scrollTop < 100 ||
      //   document.body.scrollTop < 100
      // ) {
      //   setNavbarColor("navbar-transparent");
      // }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="EASY-Q Home"
            tag={Link}
            className="is-styled-font"
          >
            Pizza-Store
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/" tag={Link}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register" tag={Link}>
                Register
              </NavLink>
            </NavItem>
            {!props.loggedin ? (
              <NavItem>
                <NavLink to="/login" tag={Link}>
                  Log In
                </NavLink>
              </NavItem>
            )
              :
              (
                <>
                <NavItem onClick={clearSessionStorage}>
                  <NavLink to="/" tag={Link}>
                    Logout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/order" tag={Link}>
                  Order
                </NavLink>
                </NavItem>
                </>
              )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedin: state.user.loggedin,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: user => dispatch(userAction.LoginSuccess()),
    loginUnSuccess: user => dispatch(userAction.LoginUnSuccess())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExamplesNavbar));


// export default withRouter();
