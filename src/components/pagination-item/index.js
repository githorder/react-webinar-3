import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function PaginationItem({ children, currentPage, onChangePage }) {
  const cn = bem("PaginationItem");

  const handleClick = () => {
    onChangePage(children);
  };

  return (
    <div
      onClick={handleClick}
      className={`${cn()} ${currentPage === children ? cn("active") : ""}`}
    >
      {children}
    </div>
  );
}

PaginationItem.propTypes = {
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
};

PaginationItem.defaultProps = {
  onChangePage: () => {},
};

export default memo(PaginationItem);
