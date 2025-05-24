import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../product/ProductCard';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  platform: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'xbox' | 'nintendo' | 'acessorio';
  isNew?: boolean;
  isOnSale?: boolean;
  category: string;
}

interface CatalogProps {
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState({
    platforms: [] as string[],
    categories: [] as string[],
    priceRange: { min: 0, max: 1000 },
    sort: 'featured',
  });
  
  const [expandedFilters, setExpandedFilters] = useState({
    platforms: true,
    categories: true,
    price: true,
  });
  
  // Get unique platforms and categories
  const platforms = [...new Set(products.map(product => product.platform))];
  const categories = [...new Set(products.map(product => product.category))];
  
  // Toggle filter sections
  const toggleFilterSection = (section: 'platforms' | 'categories' | 'price') => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section],
    });
  };
  
  // Handle platform filter change
  const handlePlatformChange = (platform: string) => {
    const updatedPlatforms = activeFilters.platforms.includes(platform)
      ? activeFilters.platforms.filter(p => p !== platform)
      : [...activeFilters.platforms, platform];
    
    setActiveFilters({
      ...activeFilters,
      platforms: updatedPlatforms,
    });
    
    applyFilters({
      ...activeFilters,
      platforms: updatedPlatforms,
    });
  };
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    const updatedCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    setActiveFilters({
      ...activeFilters,
      categories: updatedCategories,
    });
    
    applyFilters({
      ...activeFilters,
      categories: updatedCategories,
    });
  };
  
  // Handle price range change
  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const updatedPriceRange = {
      ...activeFilters.priceRange,
      [type]: value,
    };
    
    setActiveFilters({
      ...activeFilters,
      priceRange: updatedPriceRange,
    });
    
    applyFilters({
      ...activeFilters,
      priceRange: updatedPriceRange,
    });
  };
  
  // Handle sort change
  const handleSortChange = (sortOption: string) => {
    setActiveFilters({
      ...activeFilters,
      sort: sortOption,
    });
    
    applyFilters({
      ...activeFilters,
      sort: sortOption,
    });
  };
  
  // Apply all filters
  const applyFilters = (filters: typeof activeFilters) => {
    let result = [...products];
    
    // Filter by platform
    if (filters.platforms.length > 0) {
      result = result.filter(product => filters.platforms.includes(product.platform));
    }
    
    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        result = result.filter(product => product.isNew).concat(result.filter(product => !product.isNew));
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
        break;
      default: // featured - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      platforms: [],
      categories: [],
      priceRange: { min: 0, max: 1000 },
      sort: 'featured',
    });
    
    setFilteredProducts(products);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 bg-gray-900 rounded-xl p-4 border border-gray-800 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Filter size={20} className="mr-2" />
              Filtros
            </h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-primary hover:underline"
            >
              Limpar Filtros
            </button>
          </div>
          
          {/* Platform Filter */}
          <div className="mb-6 border-b border-gray-800 pb-4">
            <button 
              className="flex items-center justify-between w-full text-left text-white font-bold mb-3"
              onClick={() => toggleFilterSection('platforms')}
            >
              Plataforma
              {expandedFilters.platforms ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedFilters.platforms && (
              <div className="space-y-2">
                {platforms.map(platform => (
                  <div key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`platform-${platform}`}
                      checked={activeFilters.platforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                      className="mr-2 h-4 w-4 rounded border-gray-700 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`platform-${platform}`} className="text-gray-300 capitalize">
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="mb-6 border-b border-gray-800 pb-4">
            <button 
              className="flex items-center justify-between w-full text-left text-white font-bold mb-3"
              onClick={() => toggleFilterSection('categories')}
            >
              Categoria
              {expandedFilters.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedFilters.categories && (
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={activeFilters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 h-4 w-4 rounded border-gray-700 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-300 capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <button 
              className="flex items-center justify-between w-full text-left text-white font-bold mb-3"
              onClick={() => toggleFilterSection('price')}
            >
              Faixa de Preço
              {expandedFilters.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedFilters.price && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="min-price" className="block text-gray-300 mb-1">
                    Mínimo: R$ {activeFilters.priceRange.min}
                  </label>
                  <input
                    type="range"
                    id="min-price"
                    min="0"
                    max="1000"
                    step="10"
                    value={activeFilters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label htmlFor="max-price" className="block text-gray-300 mb-1">
                    Máximo: R$ {activeFilters.priceRange.max}
                  </label>
                  <input
                    type="range"
                    id="max-price"
                    min="0"
                    max="1000"
                    step="10"
                    value={activeFilters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-gray-300">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-300 mr-2">
                Ordenar por:
              </label>
              <select
                id="sort"
                value={activeFilters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Destaque</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="newest">Lançamentos</option>
                <option value="discount">Maiores Descontos</option>
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  platform={product.platform}
                  isNew={product.isNew}
                  isOnSale={product.isOnSale}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
              <p className="text-gray-300 text-lg mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
              <button 
                onClick={resetFilters}
                className="bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
