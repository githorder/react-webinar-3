import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

import { handleTranslation } from "../../utils";

function Menu({ langCode }) {
  const cn = bem("Menu");

  return (
    <div className={cn()}>
      <Link className={cn("main")} to="/">
        {handleTranslation("main", langCode)}
      </Link>
    </div>
  );
}

Menu.propTypes = {
  langCode: PropTypes.string,
};

Menu.defaultProps = {
  langCode: "en",
};

export default Menu;
