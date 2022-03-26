import React from "react";

const DataContext = React.createContext(null);

const useData = () => React.useContext(DataContext);

export { DataContext, useData };
