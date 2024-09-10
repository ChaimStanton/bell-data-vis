import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainAppPage from "./pages/MainAppPage";
import { PageNotFound } from "./pages/PageNotFound";
import Upload from "./pages/Upload";
import DataContext from "./dataContext";
import { useState } from "react";
import { DbConn } from "./DbConn";

export default function App(): JSX.Element {
  new DbConn(); // just to initialize the database connection and setup WASM stuff;
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <DataContext.Provider value={{ isLoaded, setIsLoaded }}>
      <BrowserRouter basename={import.meta.env.VITE_REACT_APP_BASENAME}>
        <Routes>
          <Route
            path="/"
            element={isLoaded ? <MainAppPage /> : <Navigate to="/upload" />}
          />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}
