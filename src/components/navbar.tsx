import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/navbar.module.scss';
import styles_menu from '../styles/navabar_menu.module.scss';
import { Link } from "react-router-dom";


const Navbar = (props: { navbarButtons: string[] }) => {
  const { navbarButtons } = props;

  let navbarButtonLinks: string[] = navbarButtons;
  navbarButtonLinks = navbarButtonLinks.map(text => {
    text = text.toLowerCase().replaceAll(' ', '-');
    return "/" + text;
  });

  //window max scroll height
  const handleScroll = () => {
    const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
    const position = window.scrollY;
    //find the spans in the navbar h1
    const navSpans = document.querySelectorAll('#navbar__char');
    //map the current scroll position to the number of spans
    const scrollPercent = Math.floor(position / maxScrollHeight * navSpans.length - 1);
    for (const [index, span] of navSpans.entries()) {
      if (index <= scrollPercent) {
        span.ariaHidden = 'true';
      } else {
        span.ariaHidden = 'false';
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const menuBtn = document.querySelector(`.${styles_menu.btn}`);
    const nav = document.querySelector(`.${styles.navbar__menu}`);
    if (menuOpen) {
      menuBtn?.classList.remove(styles_menu.notactive);
      menuBtn?.classList.add(styles_menu.active);
      nav?.classList.add(styles.navbar__open);

    } else {
      menuBtn?.classList.remove(styles_menu.active);
      menuBtn?.classList.add(styles_menu.notactive);
      nav?.classList.remove(styles.navbar__open);
    }
  }, [menuOpen])


  return (
    <>
      <nav className={`${styles.navbar}`}>
        {/* WokVault text*/}
        <Link to='/' onClick={() => setMenuOpen(false)}>
          <h1 className={styles.navbar__title}>
            {[...'WokVault'].map((char, index) => (
              <span
                key={index}
                className={styles.navbar__char}
                id='navbar__char'
                aria-hidden='false'
              >
                {char}
              </span>
            ))}
          </h1>
        </Link>
        <div className={styles_menu.btn_box} onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`${styles_menu.btn} ${styles_menu.notactive}`}>
            <span className={styles_menu.line}></span>
            <span className={styles_menu.line}></span>
            <span className={styles_menu.line}></span>
          </div>
        </div>
      </nav>
      <div className={styles.navbar__menu}>
        {/* Buttons mapped to the input*/}
        {navbarButtons.map((button, index) => {
          if (index === navbarButtons.length - 1) {
            {/* All of the buttons */ }
            return (
              <Link to={navbarButtonLinks[index]} key={index} className={styles.b} onClick={() => setMenuOpen(false)}>
                <div className={styles.a}>
                  {button}
                </div>
              </Link>
            )
          }
          {/* The last button */ }
          return (
            <Link to={navbarButtonLinks[index]} key={index} className={styles.b} onClick={() => setMenuOpen(false)}>
              <div className={styles.a}>
                {button}
              </div>
            </Link>
          )
        }
        )}
      </div>
    </>
  );
};

export default Navbar;