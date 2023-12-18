import { memo } from "react";

import ProfileSummary from "../../components/profile-summary";

import useSelector from "../../hooks/use-selector";

function Profile() {
  const select = useSelector((state) => ({
    profile: state.profile.profile,
  }));

  return <ProfileSummary profile={select.profile} />;
}

export default memo(Profile);
