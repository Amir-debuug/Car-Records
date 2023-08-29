import { ReactNode, createContext, useState } from "react";
import { ThemeContextType } from "../typescript/types";

export const CreateAuthContext = createContext<ThemeContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(localStorage.getItem("accesstoken"));
  const [search, setSearch] = useState<string>("");

  return (
    <CreateAuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, updateList, setUpdateList, search, setSearch }}>
      {children}
    </CreateAuthContext.Provider>
  );
};
