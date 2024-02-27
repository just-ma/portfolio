import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllDocumentsList, { DOCUMENTS_LIST_TOP } from "./AllDocumentsList";

const Footer = styled.div<{ disabled: boolean }>`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  user-select: none;
  cursor: pointer;
  color: blue;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
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
  const [scrollAnimating, setScrollAnimating] = useState(false);

  const onScrollAnimatingChange = (value: boolean) => {
    scrollAnimatingRef.current = value;
    setScrollAnimating(value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    pathnameRef.current = pathname;
    onScrollAnimatingChange(true);

    window.scrollTo({
      top: pathname === "/all" ? DOCUMENTS_LIST_TOP : 0,
      behavior: "smooth",
    });

    const timeoutId = setTimeout(() => {
      onScrollAnimatingChange(false);
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
    onScrollAnimatingChange(true);
    window.scrollTo({
      top: DOCUMENTS_LIST_TOP,
      behavior: "smooth",
    });
    navigate("/all");
  };

  return (
    <>
      <Footer onClick={handleFooterClick} disabled={scrollAnimating}>
        <Message>show me everything</Message>
        <Arrow>V</Arrow>
      </Footer>
      <AllDocumentsList disabled={scrollAnimating} />
    </>
  );
};

export default HomePage;
