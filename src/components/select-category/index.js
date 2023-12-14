import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function SelectCategory(props) {
  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="SelectCategory" value={props.value} onChange={onSelect}>
      <option value="">Все</option>
      {props.options.map((item) => (
        <option key={item.id} value={item.id}>
          {`${"-".repeat(item.nested)} ${item.title}`}
        </option>
      ))}
    </select>
  );
}

SelectCategory.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      nested: PropTypes.number,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

SelectCategory.defaultProps = {
  onChange: () => {},
};

export default memo(SelectCategory);
