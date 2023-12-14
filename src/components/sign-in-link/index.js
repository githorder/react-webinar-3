import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

function SignInLink({ labelText }) {
  return (
    <Link className="SignInLink" to={"/login"}>
      {labelText}
    </Link>
  );
}

SignInLink.propTypes = {
  labelText: PropTypes.string.isRequired,
};

export default SignInLink;
