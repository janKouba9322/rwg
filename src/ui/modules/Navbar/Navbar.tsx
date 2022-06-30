import { useState } from "react";
import Link from "next/link";
import css from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const Toggle = () => {
    if (menuOpened === false) {
      setMenuOpened(true);
    }
    if (menuOpened === true) {
      setMenuOpened(false);
    }
  };
  return (
    <>
      <div className={css.container}>
        <button
          className={css.hamburgerBox}
          style={{ color: menuOpened ? "#FCA5A5" : "white" }}
          onClick={Toggle}
        >
          <i
            className="material-icons "
            id="hamburger"
            style={{ fontSize: "3rem" }}
          >
            menu
          </i>
        </button>
        <h1 className={css.title}>RANDOM WORD GENERATOR</h1>
        <Link href="/AddWord">
          <button className={css.newWordButton}>+ New word</button>
        </Link>
      </div>
      {menuOpened === true && (
        <ul>
          <li className={css.menuItem}>About us</li>
          <li className={css.menuItem}>Premium</li>
          <li className={css.menuItem}>Info</li>
        </ul>
      )}
    </>
  );
};
