import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer__class">
      ©️ {new Date().getFullYear()}, Thank You GreekTrust
    </div>
  );
};

export default Footer;
