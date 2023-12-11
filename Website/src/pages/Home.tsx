import React, { useState, useEffect } from 'react'
import wokvaultLogo from '../assets/wokvault.svg'
import styles from '../styles/home.module.scss'
import { Link } from 'react-router-dom'
import star from '../assets/icons/icon_star.svg';
import squareOne from '../assets/icons/icon_square_one.svg';
import squareFour from '../assets/icons/icon_square_four.svg';
import squareCorners from '../assets/icons/icon_square_corners.svg';
import gate from '../assets/icons/icon_gate.svg';
import eye from '../assets/icons/icon_eye.svg';
import circleVeryJagged from '../assets/icons/icon_circle_very_jagged.svg';
import circleJagged from '../assets/icons/icon_circle_jagged.svg';
import circleGear from '../assets/icons/icon_circle_gear.svg';



function App() {

  useEffect(() => {
    document.title = 'WokVault | an opensource hybrid password manager';

    const stickySections = [...document.querySelectorAll(`#horizontalSticky`)];

    const offsetHorizontal = (element: Element) => {
      const offsetTop = element.parentElement?.offsetTop;
      const scrollElement = element.querySelector(`#features`) as HTMLElement;
      const scrollElement2 = element.querySelector(`#features2`) as HTMLElement;
      const scrollElement3 = element.querySelector(`#features3`) as HTMLElement;

      let precentage = ((window.scrollY - offsetTop!) / window.innerHeight) * 100;
      precentage = precentage < 2.5 ? 0 : precentage > 197.5 ? 200 : precentage > 95 && precentage < 105 ? 100 : precentage;


      scrollElement.style.transform = `translate3d(-${precentage}dvw, 0, 0)`;
      scrollElement2.style.transform = `translate3d(${-200 + precentage}dvw, 0, 0)`;
      scrollElement3.style.transform = `translate3d(-${precentage}dvw, 0, 0)`;
    };

    const handleScroll = () => {
      const scrollWrap = document.querySelector(`#scrollWrap`) as HTMLElement;
      let scrollWrapOpacity = (150 - window.scrollY) / 1000;
      scrollWrap.style.opacity = `${scrollWrapOpacity}`;

      scrollWrapOpacity < 0 ? scrollWrap.style.display = 'none' : scrollWrap.style.display = 'flex';




      for (let i = 0; i < stickySections.length; i++) {
        offsetHorizontal(stickySections[i]);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  return (
    <>
      <div className={styles.main}>
        <div className={styles.heroWrap}>
          <div className={styles.scrollWrap} id='scrollWrap'><div className={styles.scrollOutline}><div className={styles.scrollButton}></div></div></div>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <div className={styles.textWrap}>
                <h1 className={styles.textTitle}>Unleash your<br /><span className={styles.textTitleExtra}>Security</span></h1>
                <p className={styles.textDesc}>with <span className={styles.textDescExtra}>WokVault</span> take control of your security, sync effortlessly, stay in charge. Simple, all in your hands.</p>
                <Link to="/get-started" type='button' role='button' className={styles.btn_getStarted} >Get Started</Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.heroLogoBackground}></div>
              <img src={wokvaultLogo} alt="WokVault Logo" className={styles.heroLogo} />
            </div>
          </div>
          <div className={styles.sloganSlider}>Your passwords, Your control. <div className={styles.sloganWrap}><span>Your passwords, Your control. </span><span>Your passwords, Your control. </span><span>Your passwords, Your control. </span><span>Your passwords, Your control. </span></div></div>
        </div>
        <div className={styles.horizontalWrap}>
          <div className={styles.horizontalSticky} id='horizontalSticky'>
            <div className={styles.features} id='features'>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={star} alt="Star Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Effortless Organization</h1>
                  <p>Say goodbye to password chaos and manage your credentials with ease.</p>
                </div>
                <div className={styles.featureImage}><img src={star} alt="Star Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={circleVeryJagged} alt="Very Jagged Circle Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Enhanced Security</h1>
                  <p>Protect your digital life with robust encryption and advanced security features.</p>
                </div>
                <div className={styles.featureImage}><img src={circleVeryJagged} alt="Very Jagged Circle Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={circleGear} alt="Gear Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Cross-Platform Access</h1>
                  <p>Access your passwords securely from any device, anywhere.</p>
                </div>
                <div className={styles.featureImage}><img src={circleGear} alt="Gear Icon" className={styles.icon} /></div>
              </div>
            </div>
            <div className={styles.features} id='features2'>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={squareCorners} alt="Square Corners Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Safeguard Your Identity</h1>
                  <p>Security is not a choice; it's a necessity in an interconnected world.</p>
                </div>
                <div className={styles.featureImage}><img src={squareCorners} alt="Square Corners Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={eye} alt="Eye Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Privacy Matters</h1>
                  <p>Keep your personal information private and shielded from prying eyes.</p>
                </div>
                <div className={styles.featureImage}><img src={eye} alt="Eye Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={circleJagged} alt="Jagged Circle Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Local Wisdom</h1>
                  <p>Store passwords locally because your security should never be compromised.</p>
                </div>
                <div className={styles.featureImage}><img src={circleJagged} alt="Jagged Circle Icon" className={styles.icon} /></div>
              </div>
            </div>
            <div className={styles.features} id='features3'>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={gate} alt="Gate Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Open Doors, Open Source</h1>
                  <p>Enter a world of trust and transparency with our open-source commitment.</p>
                </div>
                <div className={styles.featureImage}><img src={gate} alt="Gate Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={squareOne} alt="Square One Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>Local Storage Philosophy</h1>
                  <p>Ownership matters. Your passwords stay with you, protected by your decisions.</p>
                </div>
                <div className={styles.featureImage}><img src={squareOne} alt="Square One Icon" className={styles.icon} /></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureImage}><img src={squareFour} alt="Square Four Icon" className={styles.icon} /></div>
                <div className={styles.featureText}>
                  <h1>User-Centric Security</h1>
                  <p>We built this for you—the empowered user who values control over their security.</p>
                </div>
                <div className={styles.featureImage}><img src={squareFour} alt="Square Four Icon" className={styles.icon} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
