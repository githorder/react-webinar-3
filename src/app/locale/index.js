import { memo, useCallback } from "react";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import LangSwitch from "../../components/lang-switch";

function Locale() {
  const store = useStore();

  const { current } = useSelector((state) => ({
    current: state.locale.current,
  }));

  const callbacks = {
    changeLocale: useCallback(
      (langCode) => store.actions.locale.changeLocale(langCode),
      [store]
    ),
  };

  return <LangSwitch changeLocale={callbacks.changeLocale} current={current} />;
}

export default memo(Locale);
