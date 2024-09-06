import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainAppPage from "./pages/MainAppPage";
import { PageNotFound } from "./pages/PageNotFound";
import Upload from "./pages/Upload";
import { BlackBoxDataObj } from "./dataManagement/BlackBoxDataObj";
import DataContext from "./dataContext";

const basename = import.meta.env.VITE_REACT_APP_BASENAME;

function App(): JSX.Element {
  const [data, setData] = React.useState<BlackBoxDataObj | undefined>(
    undefined
  );
  return (
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<MainAppPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
