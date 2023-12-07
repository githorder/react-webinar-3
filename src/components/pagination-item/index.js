import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function PaginationItem({ children, currentPage }) {
  const cn = bem("PaginationItem");
  return (
    <div className={`${cn()} ${currentPage === children ? cn("active") : ""}`}>
      {children}
    </div>
  );
}

PaginationItem.propTypes = {
  children: PropTypes.node,
  currentPage: PropTypes.number,
};

export default memo(PaginationItem);
