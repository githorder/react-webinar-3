import PropTypes from "prop-types";

import "./style.css";

function ProfileSummary({ profile }) {
  return (
    <div className="ProfileSummary">
      <h3>Профиль</h3>
      <div>
        <p>
          <span>Имя: </span>
          <span>{profile.name}</span>
        </p>
        <p>
          <span>Телефон: </span>
          <span>{profile.phone}</span>
        </p>
        <p>
          <span>Email: </span>
          <span>{profile.email}</span>
        </p>
      </div>
    </div>
  );
}

ProfileSummary.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ProfileSummary;
