import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-center py-4 text-sm font-thin text-blue-700">
      <p>&copy; {new Date().getFullYear()} Abstract Thoughts. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
