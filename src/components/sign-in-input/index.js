import PropTypes from "prop-types";

import "./style.css";

function SignInInput({ label, value, changeValue, type, id }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={changeValue} value={value} type={type} />
    </>
  );
}

SignInInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  changeValue: PropTypes.func,
  id: PropTypes.string,
};

SignInInput.defaultProps = {
  label: "",
  changeValue: () => {},
  id: "",
};

export default SignInInput;
