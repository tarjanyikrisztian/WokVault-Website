import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../styles/footer.module.scss'
import { Link } from "react-router-dom";
import wokvaultLogo from '../assets/wokvault_white.svg'

const footer = () => {

    return (
        <footer>
            <nav className={styles.navigation}>
                <div className={styles.logoDescription}>
                    <div className={styles.logoContainer}>
                        <img src={wokvaultLogo} className={styles.logo} alt="WokVault Logo" />
                        <h1 className={styles.logo_name}>WokVault</h1>
                    </div>
                    <p className={styles.description}>
                        WokVault is a free and open source password manager that is trusting the user with their own data.
                    </p>
                </div>
                <ul className={styles.link_wrapper}>
                    <p className={styles.link_titles}>
                        User Interaction
                    </p>
                    <li>
                        <Link to="/sign-up" className={styles.link}>Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/downloads" className={styles.link}>Downloads</Link>
                    </li>
                    <li>
                        <Link to="/feedback" className={styles.link}>Feedback</Link>
                    </li>
                </ul>
                <ul className={styles.link_wrapper}>
                    <p className={styles.link_titles}>
                        Information &amp; Support
                    </p>
                    <li>
                        <Link to="/get-started" className={styles.link}>Get Started</Link>
                    </li>
                    <li>
                        <Link to="/documentation" className={styles.link}>Documentation</Link>
                    </li>
                    <li>
                        <Link to="/faq" className={styles.link}>FAQ</Link>
                    </li>
                </ul>
                <ul className={styles.link_wrapper}>
                    <p className={styles.link_titles}>
                        Legal and Policies
                    </p>
                    <li>
                        <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/terms-of-service" className={styles.link}>Terms of Service</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.divider}></div>
            <div className={styles.newsletter_wrap}>
                <div className={styles.newsletter_text}>
                    <h2 className={styles.newsletter_title}>
                        Subscribe to our newsletter
                    </h2>
                    <p className={styles.newsletter_description}>
                        We will send you updates about WokVault and our community.
                    </p>
                </div>
                <form className={styles.newsletter_form}>
                    <input type="email" placeholder="Email" className={styles.newsletter_input} id="newsletter_email" name="newsletter_email" required />
                    <label htmlFor="newsletter_email" className={styles.newsletter_label}>Email</label>
                    <button className={styles.newsletter_button} type="submit" id="newsletter_submit" disabled>Subscribe</button>
                </form>
            </div>
        </footer>
    );
};

export default footer