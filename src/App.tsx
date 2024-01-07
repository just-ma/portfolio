import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import WebsitesPage from "./websites/WebsitesPage";
import FilmsPage from "./films/FilmsPage";
import DJPage from "./dj/DJPage";
import ArtworkPage from "./artwork/ArtworkPage";
import ContactPage from "./contact/ContactPage";
import MainCanvas from "./components/MainCanvas";
import useHomeMenu from "./home/useHomeMenu";

function App() {
  const { activeIndex, setActiveIndex, hovering, setHovering } = useHomeMenu();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setHovering={setHovering}
            />
          }
        />
        <Route path="/websites" element={<WebsitesPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/dj" element={<DJPage />} />
        <Route path="/artwork" element={<ArtworkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <MainCanvas
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        hovering={hovering}
      />
    </BrowserRouter>
  );
}

export default App;
