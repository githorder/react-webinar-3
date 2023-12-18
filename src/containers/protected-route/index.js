import { memo, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

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
        navigate("/login");
      }
    })();
  }, []);

  if (select.profile && !select.waiting) {
    return (
      <PageLayout>
        <AuthControls />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Outlet />
      </PageLayout>
    );
  }
}

export default memo(ProtectedRoute);
