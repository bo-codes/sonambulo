import React from "react";
import github from "./github.png";
import linkedin from "./linkedin.png";
import "./footer.css";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      <ul>
        <li>
          <h3
            style={{
              color: "white",
            }}
          >
            Elias Rodriguez
          </h3>
          <div className="footer-links">
            <a
              href="https://github.com/bo-codes"
              rel="noreferrer"
              target="_blank"
            >
              <img src={github} alt="Git Hub" />
            </a>
            <a
              href="https://www.linkedin.com/in/elias-rodriguez-066080155/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={linkedin} alt="Linked In" />
            </a>
          </div>
        </li>
        <li>
          <h2>ⓒ Sonambulo 2022</h2>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
