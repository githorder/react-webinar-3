import PropTypes from "prop-types";

import "./style.css";

function SignInFormLayout({ children }) {
  return <div className="SignInFormlayout">{children}</div>;
}

SignInFormLayout.propTypes = {
  children: PropTypes.node,
};

export default SignInFormLayout;
