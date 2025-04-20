import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-100 text-center py-4 text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Abstract Thoughts. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
