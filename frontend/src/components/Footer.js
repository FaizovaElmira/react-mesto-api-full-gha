import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const hideCopyRight =
    location.pathname === "/sign-up" || location.pathname === "/sign-in";

  return (
    <footer className="footer">
      {!hideCopyRight && (
        <p className="footer__copyright">&copy;2023 Mesto Russia</p>
      )}
    </footer>
  );
}

export default Footer;
