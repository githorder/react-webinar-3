import PropTypes from "prop-types";

import "style.css";

function CommentHead({ count }) {
  return <h2 className="CommentHead">Комментарии ({count})</h2>;
}

CommentHead.propTypes = {
  count: PropTypes.number,
};

CommentHead.defaultProps = {
  count: 0,
};

export default CommentHead;
