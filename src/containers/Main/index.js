import React, { memo, useCallback, useEffect, useState } from "react";
import intl from "react-intl-universal";
import Api from "../../services/api";
import Board from "./components/Board";
import Panel from "./components/Panel";
import { Container } from "./styles";

function Main() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("brazil");
  const updatedAt = new Date().toLocaleString();
  const [intlLoaded, setIntlLoaded] = useState(false);

  useEffect(() => {
    loadLocales();
  }, []);

  const loadLocales = async () => {
    const locales = {
      "pt-BR": require("../../locales/pt-BR.json"),
      "en-US": require("../../locales/en-US.json"),
    };
    const currentLocale = locales[navigator.language]
      ? navigator.language
      : "en-US";

    await intl.init({
      currentLocale,
      locales,
    });

    await setIntlLoaded(true);
  };

  const hundleChange = ({ target }) => {
    const country = target.value;
    setCountry(country);
  };
  const getCovidData = useCallback((country) => {
    Api.getCountry(country).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  useEffect(() => {
    getCovidData(country);
  }, [getCovidData, country]);

  return (
    <Container>
      {intlLoaded && (
        <>
          <div className="mb-2">
            <Panel
              intl={intl}
              data={data}
              updatedAt={updatedAt}
              onChange={hundleChange}
              country={country}
              getCovidData={getCovidData}
            />
          </div>
          <div className="pt-2">
            <Board data={data} intl={intl} />
          </div>
        </>
      )}
    </Container>
  );
}

export default memo(Main);
