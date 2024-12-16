import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainCanvas from "./components/canvas/MainCanvas";
import { AppProvider } from "./hooks/useAppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsiteDetailsPage from "./pages/websites/WebsiteDetailsPage";
import MainHeader from "./components/main/MainHeader";
import FilmDetailsPage from "./pages/films/FilmDetailsPage";
import AboutPage from "./pages/about/AboutPage";
import DJDetailsPage from "./pages/dj/DJDetailsPage";
import { OPTION_TYPE_TO_ROOT_PATH } from "./constants";
import MainMenu from "./components/main/MainMenu";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";
import AppleMurdererPage from "./pages/appleMurderer/AppleMurdererPage";
import { APPLE_MURDERER_ROOT_PATH } from "./pages/appleMurderer/constants";
import AppleMurdererLandingPage from "./pages/appleMurderer/AppleMurdererLandingPage";
import HomePage from "./pages/home/HomePage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <MainHeader />
          <MainMenu />

          <Routes>
            {/* home */}
            <Route path="/" element={<HomePage />} />
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["website"]}
              element={<HomePage />}
            />
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["film"]}
              element={<HomePage />}
            />
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["dj"]}
              element={<HomePage />}
            />
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["blog"]}
              element={<HomePage />}
            />

            {/* websites */}
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["website"]}/:websiteId`}
              element={<WebsiteDetailsPage />}
            />

            {/* films */}
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["film"]}/:filmId`}
              element={<FilmDetailsPage />}
            />

            {/* dj */}
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["dj"]}/:djId`}
              element={<DJDetailsPage />}
            />

            {/* blog */}
            <Route
              path={`${OPTION_TYPE_TO_ROOT_PATH["blog"]}/:blogId`}
              element={<BlogDetailsPage />}
            />

            {/* about */}
            <Route
              path={OPTION_TYPE_TO_ROOT_PATH["about"]}
              element={<AboutPage />}
            />

            {/* apple murderer */}
            <Route
              path={APPLE_MURDERER_ROOT_PATH}
              element={<AppleMurdererLandingPage />}
            />
            <Route
              path={`${APPLE_MURDERER_ROOT_PATH}/:pageNum`}
              element={<AppleMurdererPage />}
            />
          </Routes>
          <MainCanvas />
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
