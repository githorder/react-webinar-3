import { memo } from "react";

import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import SignInLink from "../../components/sign-in-link";
import SideLayout from "../../components/side-layout";

import Navigation from "../../containers/navigation";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <SideLayout padding="medium" side="end">
        <SignInLink labelText={t("login.linkText")} />
      </SideLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
