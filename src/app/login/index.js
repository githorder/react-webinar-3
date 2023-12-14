import { memo } from "react";
import { Link } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import SignInLink from "../../components/sign-in-link";

import LocaleSelect from "../../containers/locale-select";
import SignInForm from "../../containers/sign-in-form";

import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    profile: state.user.profile,
  }));

  return (
    <PageLayout>
      <SideLayout padding="medium" side="end">
        {!select.profile ? (
          <SignInLink labelText={t("login.linkText")} />
        ) : (
          <>
            <Link to="/profile">{select.profile.name}</Link>
            <button>Выход</button>
          </>
        )}
      </SideLayout>
      <Head title={t("login.title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SignInForm />
    </PageLayout>
  );
}

export default memo(Login);
