import { memo, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../locale-select";
import AuthControls from "../auth-controls";
import Navigation from "../navigation";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function ProtectedRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslate();

  const store = useStore();
  const select = useSelector((state) => ({
    profile: state.profile.profile,
    waiting: state.session.waiting,
  }));

  useEffect(() => {
    (async () => {
      const session = await store.actions.session.load();

      if (session !== null) {
        store.actions.profile.setProfile(session);
      } else {
        navigate(`/login?redirectTo=${location.pathname}`);
      }
    })();
  }, []);

  return (
    <PageLayout>
      <AuthControls />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.profile && !select.waiting ? <Outlet /> : null}
    </PageLayout>
  );
}

export default memo(ProtectedRoute);
