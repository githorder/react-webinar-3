import PropTypes from "prop-types";

import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

import "./style.css";

function transformCommentList(list) {
  let lev = 1;
  return treeToList(listToTree(list), (item, level) => {
    return {
      name: item?.author?.profile?.name || item?.name,
      dateCreate: item?.dateCreate,
      isDeleted: item?.isDeleted,
      _id: item?._id,
      text: item?.text,
      level,
      parentId: item?.parent?._id,
      children: item?.children,
    };
  }).reduce((arr, item) => {
    if (item.dateCreate) {
      lev = (item.level - 1) * 30 < 1024 - 550 ? item.level - 1 : 0;

      const data = { ...item, level: lev };

      return [...arr, data];
    }

    return arr;
  }, []);
}

function CommentList({ list, renderItem }) {
  return (
    <>
      {Array.isArray(list) && list.length !== 0 && (
        <div className="CommentList">
          {transformCommentList(list).map((comment, i) => {
            return (
              <div
                style={{
                  paddingLeft: comment.level * 30,
                }}
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
