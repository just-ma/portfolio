import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import WebsitesListPage from "./websites/WebsitesListPage";
import FilmsPage from "./films/FilmsListPage";
import DJListPage from "./dj/DJListPage";
import MainCanvas from "./components/MainCanvas";
import useHomeMenu from "./home/useHomeMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsiteDetailsPage from "./websites/WebsiteDetailsPage";
import PhotosPage from "./photos/PhotosPage";
import MainHeader from "./components/MainHeader";
import { createContext, useRef } from "react";
import FilmDetailsPage from "./films/FilmDetailsPage";
import AboutPage from "./about/AboutPage";

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
            <Route path="/websites" element={<WebsitesListPage />} />
            <Route
              path="/websites/:websiteId"
              element={<WebsiteDetailsPage />}
            />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/films/:filmId" element={<FilmDetailsPage />} />
            <Route path="/dj" element={<DJListPage />} />
            <Route path="/photos" element={<PhotosPage />} />
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
