import React, { createContext } from "react";

interface Creds {
  email: string;
  password: string;
}

const ValidCreds: Creds = {
  email: "nikhil@gmail.com",
  password: "nikhil123",
};
const MyContext = createContext(ValidCreds);

const MyProvider = ({ children }: any) => {
  return (
    <MyContext.Provider value={ValidCreds}>{children}</MyContext.Provider>
  );
};

export { MyProvider, MyContext };
