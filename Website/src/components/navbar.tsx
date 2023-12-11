import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/navbar.module.scss';
import { Link } from "react-router-dom";


const Navbar = (props: {navbarButtons: string[]}) => {
  const { navbarButtons } = props;
  let navbarButtonLinks: string[] = navbarButtons;
  navbarButtonLinks = navbarButtonLinks.map(text => {
    text = text.toLowerCase().replaceAll(' ', '-');
    return "/"+text;
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


  return (
    <>
      <nav className={styles.navbar}>
        <Link to='/'>
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
        <div className={styles.navbar__actions}>
          {navbarButtons.map((button, index) => {
            if (index === navbarButtons.length - 1) {
              return (
                <Link to={navbarButtonLinks[index]} key={index}>
                  <div className={styles.navbar__last_button_wrap}>{button}<div className={styles.navbar__last_button_text}><span>{button}</span><span>{button}</span><span>{button}</span><span>{button}</span></div></div>
                </Link>
              )
            }
            return (
              <Link to={navbarButtonLinks[index]} key={index}>
                <div className={styles.navbar__button}>{button}<div className={styles.navbar__button_text}><span>{button}</span><span>{button}</span><span>{button}</span></div></div>
              </Link>
            )
          }






          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;