import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import WebsitesListPage from "./websites/WebsitesListPage";
import FilmsPage from "./films/FilmsListPage";
import DJListPage from "./dj/DJListPage";
import MainCanvas from "./components/main/MainCanvas";
import useHomeMenu from "./home/useHomeMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsiteDetailsPage from "./websites/WebsiteDetailsPage";
import PhotosPage from "./photos/PhotosPage";
import MainHeader from "./components/main/MainHeader";
import { createContext, useRef } from "react";
import FilmDetailsPage from "./films/FilmDetailsPage";
import AboutPage from "./about/AboutPage";
import DJDetailsPage from "./dj/DJDetailsPage";
import { DOCUMENT_TYPE_TO_ROOT_PATH } from "./sanity";

export const queryClient = new QueryClient();

export const AppContext = createContext<{
  scrollContainerRef: React.RefObject<HTMLDivElement> | null;
}>({
  scrollContainerRef: null,
});

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { activeIndex, setActiveIndex, hovering, setHovering } = useHomeMenu();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ scrollContainerRef }}>
        <BrowserRouter>
          <MainHeader />

          <Routes>
            {/* home */}
            <Route
              path="/"
              element={
                <HomePage
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  setHovering={setHovering}
                />
              }
            />

            {/* websites */}
            <Route
              path={DOCUMENT_TYPE_TO_ROOT_PATH["website"]}
              element={<WebsitesListPage />}
            />
            <Route
              path={`${DOCUMENT_TYPE_TO_ROOT_PATH["website"]}/:websiteId`}
              element={<WebsiteDetailsPage />}
            />

            {/* films */}
            <Route
              path={DOCUMENT_TYPE_TO_ROOT_PATH["film"]}
              element={<FilmsPage />}
            />
            <Route
              path={`${DOCUMENT_TYPE_TO_ROOT_PATH["film"]}/:filmId`}
              element={<FilmDetailsPage />}
            />

            {/* dj */}
            <Route
              path={DOCUMENT_TYPE_TO_ROOT_PATH["dj"]}
              element={<DJListPage />}
            />
            <Route
              path={`${DOCUMENT_TYPE_TO_ROOT_PATH["dj"]}/:djId`}
              element={<DJDetailsPage />}
            />

            {/* blog */}
            <Route
              path={DOCUMENT_TYPE_TO_ROOT_PATH["blog"]}
              element={<PhotosPage />}
            />

            {/* about */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <MainCanvas
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            hovering={hovering}
          />
        </BrowserRouter>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
