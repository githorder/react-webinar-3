import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import PropTypes from "prop-types";

import commentActions from "../../store-redux/comment/actions";

import useInit from "../../hooks/use-init";

import CommentHead from "../../components/comment-head";
import Spinner from "../../components/spinner";
import CommentList from "../../components/comment-list";

function Comment({ articleId }) {
  const dispatch = useDispatch();

  const select = useSelector(
    (state) => ({
      comment: state.comment.data,
      waiting: state.comment.waiting,
    }),
    shallowequal
  );

  console.log(select.comment.list);

  useInit(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  return (
    <Spinner active={select.waiting}>
      <CommentHead count={select.comment.count} />
      <CommentList list={select.comment.list} />
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
