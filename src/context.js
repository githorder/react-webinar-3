import React, { useEffect, useState } from "react";

import Services from "./services";
import config from "./config";

/**
 * Контекст для Services
 * @type {React.Context<Services>}
 */
export const ServicesContext = React.createContext();

export const ServicesProvider = function ({ children }) {
  const services = new Services(config);

  const [lang, setLang] = useState(services.i18n.lang);

  services.i18n.subscribe(lang, setLang);
  services.api.setHeader("Accept-Language", lang);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
