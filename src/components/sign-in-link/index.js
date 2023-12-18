import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

function SignInLink({ labelText }) {
  const location = useLocation();

  return (
    <Link className="SignInLink" to={`/login?redirectTo=${location.pathname}`}>
      {labelText}
    </Link>
  );
}

SignInLink.propTypes = {
  labelText: PropTypes.string.isRequired,
};

export default SignInLink;
