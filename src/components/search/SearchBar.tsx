import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  price: number;
  image: string;
  platform: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Mock search function - in real app would call API
  const searchProducts = (searchQuery: string) => {
    // This would be replaced with actual API call
    const mockResults: SearchResult[] = [
      {
        id: 'game1',
        title: 'God of War Ragnarök',
        price: 299.90,
        image: '/images/products/god-of-war.jpg',
        platform: 'ps5',
        category: 'Jogos'
      },
      {
        id: 'game2',
        title: 'Horizon Forbidden West',
        price: 249.90,
        image: '/images/products/horizon.jpg',
        platform: 'ps5',
        category: 'Jogos'
      },
      {
        id: 'game3',
        title: 'Halo Infinite',
        price: 199.90,
        image: '/images/products/halo.jpg',
        platform: 'xbox',
        category: 'Jogos'
      }
    ];
    
    // Filter based on query
    return mockResults.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsSearching(true);
      const searchResults = searchProducts(query);
      setResults(searchResults);
      setIsSearching(false);
      setShowResults(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };
  
  const handleBlur = () => {
    // Delay hiding results to allow for clicking on them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };
  
  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          onBlur={handleBlur}
          placeholder="Buscar jogos, acessórios..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">
              Buscando...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="p-3 border-b border-gray-800">
                <p className="text-gray-400 text-sm">
                  {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </p>
              </div>
              <ul>
                {results.map(result => (
                  <li key={result.id} className="border-b border-gray-800 last:border-b-0">
                    <Link 
                      to={`/produto/${result.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 transition-colors"
                      onClick={clearSearch}
                    >
                      <img 
                        src={result.image} 
                        alt={result.title} 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="ml-3">
                        <p className="text-white font-medium">{result.title}</p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                            result.platform === 'ps5' ? 'bg-blue-900 text-blue-100' : 
                            result.platform === 'xbox' ? 'bg-green-900 text-green-100' : 
                            'bg-red-900 text-red-100'
                          }`}>
                            {result.platform.toUpperCase()}
                          </span>
                          <span className="text-primary font-bold ml-2">
                            R$ {result.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="p-3 border-t border-gray-800 bg-gray-800">
                  <Link 
                    to={`/busca?q=${encodeURIComponent(query)}`}
                    className="text-primary hover:underline text-center block"
                    onClick={clearSearch}
                  >
                    Ver todos os resultados
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              Nenhum resultado encontrado para "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
