import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import PropTypes from "prop-types";

import commentActions from "../../store-redux/comment/actions";

import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

import CommentHead from "../../components/comment-head";
import Spinner from "../../components/spinner";
import CommentList from "../../components/comment-list";
import CommentSubmitForm from "../../components/comment-submit-form";
import CommentReplyForm from "../../components/comment-reply-form";
import CommentItem from "../../components/comment-item";

function Comment({ articleId }) {
  const [commentText, setCommentText] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const dispatch = useDispatch();

  const select = useSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
  }));

  const selectRedux = useSelectorRedux(
    (state) => ({
      comment: state.comment.data,
      waiting: state.comment.waiting,
    }),
    shallowequal
  );

  const callbacks = {
    changeText: (e) => {
      setCommentText(e.target.value);
    },
    submitComment: (e) => {
      e.preventDefault();

      if (commentText.length) {
        dispatch(
          commentActions.create({
            id: articleId,
            text: commentText,
            type: "article",
            token: select.token,
            articleId,
          })
        );
        setCommentText("");
      }
    },
    replyComment: (e) => {
      e.preventDefault();

      if (commentText.length) {
        dispatch(
          commentActions.create({
            id: commentId,
            text: commentText,
            type: "comment",
            token: select.token,
            articleId,
          })
        );
        setIsReply(false);
        setCommentText("");
      }
    },
    showReplyForm: (id) => {
      setIsReply(true);
      setCommentId(id);
    },
    closeReplyForm: (e) => {
      e.preventDefault();
      setCommentId(null);
      setIsReply(false);
    },
  };

  useInit(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  const renders = {
    comment: useCallback((comment) => {
      return (
        <CommentItem
          showReplyForm={callbacks.showReplyForm}
          comment={comment}
          isReply={isReply}
          commentId={commentId}
        >
          <CommentReplyForm
            text={commentText}
            changeText={callbacks.changeText}
            isAuthorized={select.exists}
            closeReplyForm={callbacks.closeReplyForm}
            replyComment={callbacks.replyComment}
          />
        </CommentItem>
      );
    }),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentHead count={selectRedux.comment.count} />
      <CommentList
        list={selectRedux.comment.list}
        renderItem={renders.comment}
      />
      <CommentSubmitForm
        isReply={isReply}
        text={commentText}
        changeText={callbacks.changeText}
        submitComment={callbacks.submitComment}
        isAuthorized={select.exists}
      />
    </Spinner>
  );
}

Comment.propTypes = {
  articleId: PropTypes.string,
};

Comment.defaultProps = {
  articleId: "",
};

export default memo(Comment);
