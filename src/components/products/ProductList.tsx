import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, ChevronDown, ChevronUp } from 'lucide-react';

// Tipo para os produtos
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  platform: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'xbox' | 'nintendo' | 'acessorio';
  category: string;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dados de exemplo para demonstração
const mockProducts: Product[] = [
  {
    id: 'prod-001',
    title: 'God of War Ragnarök',
    description: 'Embarque com Kratos e Atreus em uma jornada épica em busca de respostas antes do Ragnarök profetizado.',
    price: 299.90,
    originalPrice: 349.90,
    images: ['/images/products/god-of-war.jpg'],
    platform: 'ps5',
    category: 'Jogos',
    inStock: true,
    stockQuantity: 15,
    featured: true,
    isNew: false,
    isOnSale: true,
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-11-20T14:45:00Z'
  },
  {
    id: 'prod-002',
    title: 'Horizon Forbidden West',
    description: 'Junte-se a Aloy para desbravar o Oeste Proibido, uma fronteira perigosa que esconde novas ameaças misteriosas.',
    price: 249.90,
    images: ['/images/products/horizon.jpg'],
    platform: 'ps5',
    category: 'Jogos',
    inStock: true,
    stockQuantity: 8,
    featured: true,
    isNew: false,
    isOnSale: false,
    createdAt: '2023-09-05T08:20:00Z',
    updatedAt: '2023-09-05T08:20:00Z'
  },
  {
    id: 'prod-003',
    title: 'Halo Infinite',
    description: 'O lendário Master Chief retorna em sua aventura mais épica para salvar a humanidade.',
    price: 199.90,
    originalPrice: 249.90,
    images: ['/images/products/halo.jpg'],
    platform: 'xbox',
    category: 'Jogos',
    inStock: true,
    stockQuantity: 12,
    featured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2023-08-12T15:10:00Z',
    updatedAt: '2023-10-18T11:25:00Z'
  },
  {
    id: 'prod-004',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Uma nova aventura épica no mundo de Hyrule, onde Link deve mais uma vez salvar o reino.',
    price: 349.90,
    images: ['/images/products/zelda.jpg'],
    platform: 'nintendo',
    category: 'Jogos',
    inStock: true,
    stockQuantity: 5,
    featured: true,
    isNew: true,
    isOnSale: false,
    createdAt: '2023-11-01T09:45:00Z',
    updatedAt: '2023-11-01T09:45:00Z'
  },
  {
    id: 'prod-005',
    title: 'Controle DualSense',
    description: 'Controle sem fio para PlayStation 5 com feedback háptico e gatilhos adaptáveis.',
    price: 449.90,
    originalPrice: 499.90,
    images: ['/images/products/dualsense.jpg'],
    platform: 'ps5',
    category: 'Acessórios',
    inStock: true,
    stockQuantity: 20,
    featured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2023-07-20T13:15:00Z',
    updatedAt: '2023-09-30T16:40:00Z'
  }
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    platform: [] as string[],
    category: [] as string[],
    inStock: false,
    onSale: false,
    featured: false,
    isNew: false
  });
  
  // Carregar produtos (simulando uma chamada de API)
  useEffect(() => {
    // Em um ambiente real, isso seria uma chamada para o backend
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);
  
  // Aplicar filtros e pesquisa
  useEffect(() => {
    let result = [...products];
    
    // Aplicar termo de pesquisa
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar filtros de plataforma
    if (filters.platform.length > 0) {
      result = result.filter(product => filters.platform.includes(product.platform));
    }
    
    // Aplicar filtros de categoria
    if (filters.category.length > 0) {
      result = result.filter(product => filters.category.includes(product.category));
    }
    
    // Aplicar outros filtros
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    if (filters.onSale) {
      result = result.filter(product => product.isOnSale);
    }
    
    if (filters.featured) {
      result = result.filter(product => product.featured);
    }
    
    if (filters.isNew) {
      result = result.filter(product => product.isNew);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Resetar para a primeira página ao filtrar
  }, [searchTerm, filters, products]);
  
  // Obter produtos da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Mudar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Manipular mudanças nos filtros
  const handleFilterChange = (filterType: string, value: string | boolean) => {
    if (typeof value === 'string') {
      // Para filtros de array (plataforma, categoria)
      setFilters(prev => {
        const currentArray = prev[filterType as 'platform' | 'category'];
        if (currentArray.includes(value)) {
          return {
            ...prev,
            [filterType]: currentArray.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [filterType]: [...currentArray, value]
          };
        }
      });
    } else {
      // Para filtros booleanos
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };
  
  // Resetar filtros
  const resetFilters = () => {
    setFilters({
      platform: [],
      category: [],
      inStock: false,
      onSale: false,
      featured: false,
      isNew: false
    });
    setSearchTerm('');
  };
  
  // Excluir produto
  const handleDeleteProduct = (id: string) => {
    // Em um ambiente real, isso seria uma chamada para o backend
    setProducts(prev => prev.filter(product => product.id !== id));
  };
  
  // Obter plataformas e categorias únicas para os filtros
  const platforms = [...new Set(products.map(product => product.platform))];
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0 neon-text">Produtos</h1>
        <button className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg flex items-center transition-all button-glow">
          <Plus size={18} className="mr-2" />
          Adicionar Produto
        </button>
      </div>
      
      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="form-input pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <Filter size={18} className="mr-2" />
            Filtros
            {showFilters ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
          </button>
        </div>
        
        {/* Painel de Filtros */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro de Plataforma */}
            <div>
              <h3 className="text-white font-medium mb-2">Plataforma</h3>
              <div className="space-y-2">
                {platforms.map(platform => (
                  <div key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`platform-${platform}`}
                      checked={filters.platform.includes(platform)}
                      onChange={() => handleFilterChange('platform', platform)}
                      className="form-checkbox"
                    />
                    <label htmlFor={`platform-${platform}`} className="text-gray-300 ml-2 capitalize">
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filtro de Categoria */}
            <div>
              <h3 className="text-white font-medium mb-2">Categoria</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={filters.category.includes(category)}
                      onChange={() => handleFilterChange('category', category)}
                      className="form-checkbox"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-300 ml-2">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Outros Filtros */}
            <div>
              <h3 className="text-white font-medium mb-2">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={filters.inStock}
                    onChange={() => handleFilterChange('inStock', !filters.inStock)}
                    className="form-checkbox"
                  />
                  <label htmlFor="inStock" className="text-gray-300 ml-2">
                    Em estoque
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="onSale"
                    checked={filters.onSale}
                    onChange={() => handleFilterChange('onSale', !filters.onSale)}
                    className="form-checkbox"
                  />
                  <label htmlFor="onSale" className="text-gray-300 ml-2">
                    Em promoção
                  </label>
                </div>
              </div>
            </div>
            
            {/* Destaques */}
            <div>
              <h3 className="text-white font-medium mb-2">Destaques</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={filters.featured}
                    onChange={() => handleFilterChange('featured', !filters.featured)}
                    className="form-checkbox"
                  />
                  <label htmlFor="featured" className="text-gray-300 ml-2">
                    Produtos em destaque
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={filters.isNew}
                    onChange={() => handleFilterChange('isNew', !filters.isNew)}
                    className="form-checkbox"
                  />
                  <label htmlFor="isNew" className="text-gray-300 ml-2">
                    Lançamentos
                  </label>
                </div>
              </div>
            </div>
            
            {/* Botão para Limpar Filtros */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-primary hover:underline"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Tabela de Produtos */}
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID</th>
              <th className="table-header-cell">Imagem</th>
              <th className="table-header-cell">Nome</th>
              <th className="table-header-cell">Plataforma</th>
              <th className="table-header-cell">Categoria</th>
              <th className="table-header-cell">Preço</th>
              <th className="table-header-cell">Estoque</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Ações</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentItems.length > 0 ? (
              currentItems.map(product => (
                <tr key={product.id} className="table-row">
                  <td className="table-cell">{product.id}</td>
                  <td className="table-cell">
                    <img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="table-cell font-medium text-white">{product.title}</td>
                  <td className="table-cell capitalize">{product.platform}</td>
                  <td className="table-cell">{product.category}</td>
                  <td className="table-cell">
                    <div>
                      <span className="text-primary font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm block">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`${product.stockQuantity <= 5 ? 'text-red-500' : 'text-gray-300'}`}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex flex-wrap gap-1">
                      {product.inStock ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-100">
                          Em estoque
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-900 text-red-100">
                          Esgotado
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-900 text-blue-100">
                          Novo
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-900 text-purple-100">
                          Promoção
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="table-cell text-center py-8">
                  <p className="text-gray-400">Nenhum produto encontrado.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginação */}
      {filteredProducts.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`pagination-item ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Anterior
            </button>
            
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
              className={`pagination-item ${currentPage === Math.ceil(filteredProducts.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
