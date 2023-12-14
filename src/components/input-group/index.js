import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function InputGroup({ children }) {
  const cn = bem("Input_group");

  return <div className={cn()}>{children}</div>;
}

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputGroup;
