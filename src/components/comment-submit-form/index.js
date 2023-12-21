import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

const cn = bem("CommentSubmitForm");

function CommentSubmitForm({
  isAuthorized,
  changeText,
  submitComment,
  text,
  isReply,
}) {
  return (
    <div className={cn()}>
      {!isAuthorized && !isReply ? (
        <p>
          <Link to={"/login"}>Войдите</Link>, чтобы иметь возможность
          комментировать.
        </p>
      ) : isAuthorized && !isReply ? (
        <div className={cn("form_container")}>
          <p>Новый комментарий</p>
          <form className={cn("form")}>
            <textarea value={text} onChange={changeText} placeholder="Текст" />
            <button onClick={submitComment} type="submit">
              Отправить
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

CommentSubmitForm.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  changeText: PropTypes.func,
  submitComment: PropTypes.func,
  text: PropTypes.string,
  isReply: PropTypes.bool,
};

CommentSubmitForm.defaultProps = {
  changeText: () => {},
  submitComment: () => {},
};

export default CommentSubmitForm;
