import React, { type ReactNode, useState } from "react";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

interface HeaderProps {
  logoSrc: string;
  title: string;
  middleContent?: ReactNode; 
  rightContent?: ReactNode; 
  onHamburgerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc,
  title,
  middleContent,
  rightContent,
  onHamburgerClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);
    if (onHamburgerClick) onHamburgerClick();
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-purple-900 backdrop-blur-md shadow-xl z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        
        <div className="flex items-center space-x-4">
          <img
            src={logoSrc}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow-lg object-cover"
          />
          <h1 className="text-3xl font-extrabold text-white tracking-wide select-none">
            {title}
          </h1>
        </div>

        
        <div className="hidden md:flex flex-1 justify-center px-6">
          {middleContent}
        </div>

      
        <div className="hidden md:flex items-center space-x-4">
          {rightContent}
        </div>

       
        <div className="md:hidden flex items-center">
          <IconButton
            onClick={handleHamburgerClick}
            sx={{ color: "white" }}
            size="large"
            aria-label="menu"
          >
            {menuOpen ? (
              <CloseIcon fontSize="inherit" />
            ) : (
              <MenuIcon fontSize="inherit" />
            )}
          </IconButton>
        </div>
      </div>{" "}
      
      
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-indigo-800 to-purple-900 shadow-inner py-4 px-6 space-y-4">
          
          {middleContent && (
            <div className="w-full flex justify-center">{middleContent}</div>
          )}

          
          {rightContent && (
            <div className="w-full flex justify-center space-x-4">
              {rightContent}
            </div>
          )}
        </nav>
      )}{" "}
      
    </header>
  ); 
}; 

export default Header;
