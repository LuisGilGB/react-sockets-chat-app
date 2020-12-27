import { createContext, useMemo } from "react";

export const AutoCompleteContext = createContext();

export const AutoCompleteProvider = ({ children }) => {
  const autoCompleteBool = useMemo(
    () => process.env.NODE_ENV === "production",
    []
  );
  const autoComplete = useMemo(() => (autoCompleteBool ? "on" : "off"), [
    autoCompleteBool,
  ]);

  return (
    <AutoCompleteContext.Provider value={{ autoComplete, autoCompleteBool }}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
