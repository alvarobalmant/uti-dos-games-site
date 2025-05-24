import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold neon-text font-['Cyberpunk']">UTI DOS GAMES</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/catalogo" className="text-gray-300 hover:text-white hover:neon-text transition-all duration-300">
              Catálogo
            </Link>
            <Link to="/lancamentos" className="text-gray-300 hover:text-white hover:neon-text transition-all duration-300">
              Lançamentos
            </Link>
            <Link to="/promocoes" className="text-gray-300 hover:text-white hover:neon-purple-text transition-all duration-300">
              Promoções
            </Link>
            <Link to="/quem-somos" className="text-gray-300 hover:text-white hover:neon-text transition-all duration-300">
              Quem Somos
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-white hover:neon-text transition-all duration-300">
              FAQ
            </Link>
          </nav>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/carrinho" 
              className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Buscar jogos, acessórios..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 px-4 bg-gray-900 rounded-lg">
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/catalogo" 
                  className="block text-gray-300 hover:text-white hover:neon-text py-2 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link 
                  to="/lancamentos" 
                  className="block text-gray-300 hover:text-white hover:neon-text py-2 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link 
                  to="/promocoes" 
                  className="block text-gray-300 hover:text-white hover:neon-purple-text py-2 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Promoções
                </Link>
              </li>
              <li>
                <Link 
                  to="/quem-somos" 
                  className="block text-gray-300 hover:text-white hover:neon-text py-2 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="block text-gray-300 hover:text-white hover:neon-text py-2 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-primary to-purple-900 py-1.5">
        <p className="text-center text-white text-sm font-medium">
          🎮 FRETE GRÁTIS em compras acima de R$150 | Entrega em até 24h na região 🎮
        </p>
      </div>
    </header>
  );
};

export default Header;
