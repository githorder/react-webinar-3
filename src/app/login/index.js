import { memo } from "react";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";

import LocaleSelect from "../../containers/locale-select";
import SignInForm from "../../containers/sign-in-form";
import AuthControls from "../../containers/auth-controls";

import useTranslate from "../../hooks/use-translate";

function Login() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <SideLayout padding="medium" side="end">
        <AuthControls />
      </SideLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SignInForm />
    </PageLayout>
  );
}

export default memo(Login);
