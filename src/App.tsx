import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import WebsitesListPage from "./websites/WebsitesListPage";
import FilmsPage from "./films/FilmsListPage";
import DJListPage from "./dj/DJListPage";
import MainCanvas from "./components/main/MainCanvas";
import { AppProvider } from "./hooks/useAppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsiteDetailsPage from "./websites/WebsiteDetailsPage";
import PhotosPage from "./photos/PhotosPage";
import MainHeader from "./components/main/MainHeader";
import FilmDetailsPage from "./films/FilmDetailsPage";
import AboutPage from "./about/AboutPage";
import DJDetailsPage from "./dj/DJDetailsPage";
import { OPTION_TYPE_TO_ROOT_PATH } from "./constants";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <MainHeader />

          <Routes>
            {/* home */}
            <Route path="/" element={<HomePage />} />

            {/* websites */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["website"]}
              element={<WebsitesListPage />}
            />
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["website"]}/:websiteId`}
              element={<WebsiteDetailsPage />}
            />

            {/* films */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["film"]}
              element={<FilmsPage />}
            />
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["film"]}/:filmId`}
              element={<FilmDetailsPage />}
            />

            {/* dj */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["dj"]}
              element={<DJListPage />}
            />
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["dj"]}/:djId`}
              element={<DJDetailsPage />}
            />

            {/* blog */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["blog"]}
              element={<PhotosPage />}
            />

            {/* about */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["about"]}
              element={<AboutPage />}
            />
          </Routes>
          <MainCanvas />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
