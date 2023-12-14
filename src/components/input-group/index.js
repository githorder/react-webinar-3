import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function InputGroup({ children, type }) {
  const cn = bem("Input_group");

  return <div className={`${cn()} ${cn({ type })}`}>{children}</div>;
}

InputGroup.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
};

export default InputGroup;
