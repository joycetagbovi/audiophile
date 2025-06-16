import { Link } from 'react-router';
import { useState } from 'react';
import { CartDropdown } from './cartdropdown';
import MobileMenuGrid from './mobilemenu';

export function Navbar({ bgColor = 'bg-black' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${bgColor} fixed top-0 left-0 right-0 w-full z-50`}>
      <div className='px-0 lg:px-6'>
        <div className='flex justify-between items-center container-fluid !py-6 border-b border-b-white/50'>
          <button
            className='lg:hidden p-2 text-white hover:text-primary transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          {/* Logo - Center on mobile, Left on desktop */}
          <Link to='/' className='text-2xl font-bold text-primary lg:mr-auto'>
            <img
              src='/assets/shared/desktop/logo.svg'
              alt='audio file logo'
            />
          </Link>

          {/* Desktop Navigation - Center on desktop */}
          <div className='hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2'>
            <Link to='/' className='navlink'>
              Home
            </Link>
            <Link to='/headphones' className='navlink'>
              Headphones
            </Link>
            <Link to='/speakers' className='navlink'>
              Speakers
            </Link>
            <Link to='/earphones' className='navlink'>
              Earphones
            </Link>
          </div>

          {/* Cart Button - Right */}
          <div className='flex items-center'>
            <CartDropdown />
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='lg:hidden py-4 border-t border-light-gray bg-white  '>
            <MobileMenuGrid/>
          </div>
        )}
      </div>
    </nav>
  );
}