import { useCallback, memo } from "react";
import { Link } from "react-router-dom";

import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

import AuthNavLayout from "../../components/auth-nav-layout";
import SignInLink from "../../components/sign-in-link";

function AuthControls() {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    profile: state.user.profile,
  }));

  const callbacks = {
    signOut: useCallback(() => store.actions.user.signOut(), [store]),
  };

  return (
    <>
      {!select.profile ? (
        <SignInLink labelText={t("login.linkText")} />
      ) : (
        <AuthNavLayout>
          <Link to="/profile">{select.profile.name}</Link>
          <button onClick={callbacks.signOut}>Выход</button>
        </AuthNavLayout>
      )}
    </>
  );
}

export default memo(AuthControls);
