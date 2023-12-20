import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import PropTypes from "prop-types";

import commentActions from "../../store-redux/comment/actions";

import useInit from "../../hooks/use-init";

import CommentHead from "../../components/comment-head";
import Spinner from "../../components/spinner";

function Comment({ articleId }) {
  const dispatch = useDispatch();

  const select = useSelector(
    (state) => ({
      comments: state.comment.data,
      waiting: state.comment.waiting,
    }),
    shallowequal
  );

  console.log(select.comments);

  useInit(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  return (
    <Spinner active={select.waiting}>
      <div>
        <CommentHead count={select.comments.count} />
      </div>
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
