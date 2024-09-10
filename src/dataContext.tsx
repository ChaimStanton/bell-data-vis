import React from "react";

interface DataContextType {
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = React.createContext<DataContextType>({} as DataContextType);

export default DataContext;
