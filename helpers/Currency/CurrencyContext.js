import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const [selectedCurr, selectedCurrency] = useState({
    currency: "IND",
    symbol: "₹",
    value: 60,
  });

  const currencyContext = {
    selectedCurr,
    selectedCurrency,
  };

  return (
    <Context.Provider
      value={{
        state: selectedCurr,
        currencyContext: currencyContext,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as CurrencyContext,
  Provider as CurrencyContextProvider,
} from "./CurrencyContext";
