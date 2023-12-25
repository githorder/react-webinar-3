import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const cn = bem("CommentItem");

function findLastChild(comment) {
  const lastChild = comment?.children[comment?.children.length - 1];
  if (lastChild) {
    return findLastChild(lastChild);
  } else {
    return comment;
  }
}

function CommentItem({
  comment,
  showReplyForm,
  isReply,
  commentId,
  lastChild,
  authName,
  children,
}) {
  const date = comment?.dateCreate
    ? new Intl.DateTimeFormat("ru-RU", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(comment?.dateCreate))
    : "";

  return (
    <>
      <div className={cn("info")}>
        <span
          className={`${cn("name")} ${
            authName === comment.name ? cn("name_active") : ""
          }`}
        >
          {comment.name}
        </span>
        <span className={cn("date")}>{date}</span>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button
        onClick={() =>
          showReplyForm({
            commentId: comment._id,
            child: findLastChild(comment),
          })
        }
        className={cn("reply")}
      >
        Ответить
      </button>
      {isReply && comment._id === (lastChild?._id || commentId)
        ? children
        : null}
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
  authName: PropTypes.string,
};

CommentItem.defaultProps = {
  showReplyForm: (id) => {},
};

export default CommentItem;
