import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

const cn = bem("CommentReplyForm");

function CommentReplyForm({
  isAuthorized,
  changeText,
  replyComment,
  text,
  closeReplyForm,
  onSignIn,
}) {
  return (
    <div className={`${cn()} ${cn("nested")}`}>
      {!isAuthorized ? (
        <p>
          <a href="" onClick={onSignIn}>
            Войдите
          </a>
          , чтобы иметь возможность комментировать.
          <button className={cn("close")} onClick={closeReplyForm}>
            Отмена
          </button>
        </p>
      ) : isAuthorized ? (
        <div className={cn("form_container")}>
          <p>Новый Ответ</p>
          <form className={cn("form")}>
            <textarea value={text} onChange={changeText} placeholder="Текст" />
            <div className={cn("btn_group")}>
              <button onClick={replyComment} type="submit">
                Отправить
              </button>
              <button onClick={closeReplyForm}>Отмена</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

CommentReplyForm.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  changeText: PropTypes.func,
  replyComment: PropTypes.func,
  closeReplyForm: PropTypes.func,
  text: PropTypes.string,
  goToLogin: PropTypes.func,
};

CommentReplyForm.defaultProps = {
  changeText: () => {},
  replyComment: () => {},
  closeReplyForm: () => {},
  goToLogin: () => {},
};

export default CommentReplyForm;
