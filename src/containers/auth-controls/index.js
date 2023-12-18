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
    profile: state.profile.profile,
    token: state.session.token,
  }));

  const callbacks = {
    signOut: useCallback(() => {
      store.actions.profile.deleteProfile();
      store.actions.auth.signOut(select.token);
      store.actions.session.delete();
    }, [store]),
  };

  return (
    <AuthNavLayout>
      {!select.profile ? (
        <SignInLink labelText={t("login.linkText")} />
      ) : (
        <>
          <Link to="/profile">{select.profile.name}</Link>
          <button onClick={callbacks.signOut}>Выход</button>
        </>
      )}
    </AuthNavLayout>
  );
}

export default memo(AuthControls);
