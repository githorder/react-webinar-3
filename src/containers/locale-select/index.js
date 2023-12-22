import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

function LocaleSelect() {
  const i18n = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  return (
    <Select onChange={i18n.setLang} value={i18n.lang} options={options.lang} />
  );
}

export default memo(LocaleSelect);
