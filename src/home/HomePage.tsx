import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllDocumentsList, { DOCUMENTS_LIST_TOP } from "./AllDocumentsList";

const Footer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  user-select: none;
  cursor: pointer;
  color: blue;
`;

const Message = styled.div`
  text-decoration: underline;
`;

const Arrow = styled.div`
  font-family: "SyneMono-Regular";
  text-align: center;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnameRef = useRef(pathname);
  const scrollAnimatingRef = useRef(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    pathnameRef.current = pathname;
    scrollAnimatingRef.current = true;

    window.scrollTo({
      top: pathname === "/all" ? DOCUMENTS_LIST_TOP : 0,
      behavior: "smooth",
    });

    const timeoutId = setTimeout(() => {
      scrollAnimatingRef.current = false;
      handleScroll();
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  const handleScroll = () => {
    if (scrollAnimatingRef.current) {
      return;
    }

    const threshold = window.innerHeight / 5;
    const isAll =
      pathnameRef.current === "/"
        ? window.scrollY > threshold
        : window.scrollY > DOCUMENTS_LIST_TOP - threshold;
    const nextPath = isAll ? "/all" : "/";

    if (pathnameRef.current !== nextPath) {
      navigate(nextPath);
    }
  };

  const handleFooterClick = () => {
    scrollAnimatingRef.current = true;
    window.scrollTo({
      top: DOCUMENTS_LIST_TOP,
      behavior: "smooth",
    });
    navigate("/all");
  };

  return (
    <>
      <Footer onClick={handleFooterClick}>
        <Message>show me everything</Message>
        <Arrow>V</Arrow>
      </Footer>
      <AllDocumentsList />
    </>
  );
};

export default HomePage;
