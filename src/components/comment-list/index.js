import PropTypes from "prop-types";

import "./style.css";

function CommentList({ list, renderItem, isReply, commentId, children }) {
  return (
    <>
      {Array.isArray(list) && list.length !== 0 && (
        <div className="CommentList">
          {list.map((comment) => {
            return (
              <div
                style={{ paddingLeft: (comment.level - 1) * 30 }}
                key={comment._id}
                className="Comment-item"
              >
                {renderItem(comment)}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      level: PropTypes.number,
    })
  ),
  renderItem: PropTypes.func,
};

CommentList.defaultProps = {
  list: [],
  renderItem: (comment) => {},
};

export default CommentList;
