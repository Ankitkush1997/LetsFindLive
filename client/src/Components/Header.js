import React from 'react';

const Header = () => {
  return (
    <header className='header'>
      <a
        className='logo'
        href='/'
        alt='Go to Info.com Homepage'
        aria-label='Go to Info.com Homepage'
        style={{ userSelect: 'none' }}
      >
        {/* <img alt='Info.com logo' src='./images/logo.svg' className='logo__image' /> */}
        <span className='header-title-1'>letsfind</span>
        <span className='header-title-2'>.live</span>
      </a>
    </header>
  );
};

export default Header;
