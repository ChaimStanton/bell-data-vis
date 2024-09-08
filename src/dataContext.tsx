import { BlackBoxDataObj } from "./dataManagement/BlackBoxDataObj";
import { createContext } from "react";

export type DataContextType = {
  data: BlackBoxDataObj | undefined;
  setData: React.Dispatch<React.SetStateAction<BlackBoxDataObj | undefined>>;
};

const DataContext = createContext<DataContextType>({
  data: undefined,
  setData: () => {}, // Provide a default no-op function
});

export default DataContext;
