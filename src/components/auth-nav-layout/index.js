import PropTypes from "prop-types";

import "./style.css";

function AuthNavLayout({ children }) {
  return <div className="AuthNavLayout">{children}</div>;
}

AuthNavLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthNavLayout;
