import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const cn = bem("CommentItem");

function CommentItem({ comment, showReplyForm, isReply, commentId, children }) {
  const date = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(comment.dateCreate));

  return (
    <>
      <div className={cn("info")}>
        <span className={cn("name")}>{comment.name}</span>
        <span className={cn("date")}>{date}</span>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button
        onClick={() => showReplyForm(comment._id)}
        className={cn("reply")}
      >
        Ответить
      </button>
      {isReply && comment._id === commentId ? children : null}
    </>
  );
}

CommentItem.propTypes = {
  children: PropTypes.node,
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    name: PropTypes.string,
  }),
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isReply: PropTypes.bool,
  showReplyForm: PropTypes.func,
};

CommentItem.defaultProps = {
  showReplyForm: (id) => {},
};

export default CommentItem;
