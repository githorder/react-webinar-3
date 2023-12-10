import PropTypes from "prop-types";

import { translations } from "../../utils";

function LangSwitch({ current, changeLocale }) {
  const handleChange = (e) => {
    const langCode = e.target.value;
    changeLocale(langCode);
  };

  return (
    <>
      <select onChange={handleChange} defaultValue={current}>
        {Object.keys(translations).map((langCode) => (
          <option value={langCode} key={langCode}>
            {langCode.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
}

LangSwitch.propTypes = {
  current: PropTypes.string.isRequired,
  changeLocale: PropTypes.func,
};

LangSwitch.defaultProps = {
  changeLocale: () => {},
};

export default LangSwitch;
