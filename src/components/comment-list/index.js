import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const cn = bem("Comment");

function CommentList({ list }) {
  return (
    <div className="CommentList">
      {Array.isArray(list) &&
        list.map((comment) => {
          const day = new Date(comment.dateCreate).getDate();
          const month = new Date(comment.dateCreate).toLocaleString("ru-RU", {
            month: "long",
          });
          const year = new Date(comment.dateCreate).getFullYear();
          const time = new Date(comment.dateCreate)
            .toLocaleTimeString("ru-RU")
            .slice(0, 5);

          return (
            <div
              style={{ paddingLeft: (comment.level - 1) * 30 }}
              key={comment._id}
              className={cn()}
            >
              <div className={cn("info")}>
                <span className={cn("name")}>{comment.name}</span>
                <span
                  className={cn("date")}
                >{`${day} ${month} ${year} в ${time}`}</span>
              </div>
              <p className={cn("text")}>{comment.text}</p>
              <button className={cn("reply")}>Ответить</button>
            </div>
          );
        })}
    </div>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
};

CommentList.defaultProps = {
  list: [],
};

export default CommentList;
