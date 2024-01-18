import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import WebsitesPage from "./websites/WebsitesPage";
import FilmsPage from "./films/FilmsPage";
import DJPage from "./dj/DJPage";
import ArtworkPage from "./artwork/ArtworkPage";
import ContactPage from "./contact/ContactPage";
import MainCanvas from "./components/MainCanvas";
import useHomeMenu from "./home/useHomeMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsitePage from "./websites/WebsitePage";
import PhotosPage from "./photos/PhotosPage";
import MainHeader from "./components/MainHeader";
import { createContext, useRef } from "react";

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
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/websites/:websiteId" element={<WebsitePage />} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/dj" element={<DJPage />} />
            <Route path="/artwork" element={<ArtworkPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
