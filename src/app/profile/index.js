import { memo } from "react";
import { Link } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import ProfileSummary from "../../components/profile-summary";

import LocaleSelect from "../../containers/locale-select";
import AuthControls from "../../containers/auth-controls";

import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Profile() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    profile: state.profile.profile,
  }));

  return (
    <PageLayout>
      <AuthControls />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileSummary profile={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);
