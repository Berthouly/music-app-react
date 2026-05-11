import { useEffect, useState } from "react";
import "./PageTransition.css";

const PageTransition = ({ title, subtitle }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${hide ? "hide" : ""}`}>
      <div className="page-transition-content">
        <p>{subtitle}</p>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageTransition;