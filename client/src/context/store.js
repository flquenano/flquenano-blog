import React, { createContext } from "react";

const authContext = createContext({});

export const Provider = authContext.Provider;
export const Consumer = authContext.Consumer;
export default authContext;
