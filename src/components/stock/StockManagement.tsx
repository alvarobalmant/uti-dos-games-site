import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

// Tipo para os produtos em estoque
interface StockItem {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  sku: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  lastUpdated: string;
}

// Dados de exemplo para demonstração
const mockStockItems: StockItem[] = [
  {
    id: 'stock-001',
    productId: 'prod-001',
    productName: 'God of War Ragnarök',
    platform: 'PS5',
    sku: 'GOW-PS5-001',
    quantity: 15,
    minStockLevel: 5,
    maxStockLevel: 30,
    lastUpdated: '2023-11-20T14:45:00Z'
  },
  {
    id: 'stock-002',
    productId: 'prod-002',
    productName: 'Horizon Forbidden West',
    platform: 'PS5',
    sku: 'HFW-PS5-001',
    quantity: 8,
    minStockLevel: 5,
    maxStockLevel: 25,
    lastUpdated: '2023-09-05T08:20:00Z'
  },
  {
    id: 'stock-003',
    productId: 'prod-003',
    productName: 'Halo Infinite',
    platform: 'Xbox',
    sku: 'HALO-XBX-001',
    quantity: 3,
    minStockLevel: 5,
    maxStockLevel: 20,
    lastUpdated: '2023-10-18T11:25:00Z'
  },
  {
    id: 'stock-004',
    productId: 'prod-004',
    productName: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo',
    sku: 'ZELDA-NSW-001',
    quantity: 5,
    minStockLevel: 5,
    maxStockLevel: 20,
    lastUpdated: '2023-11-01T09:45:00Z'
  },
  {
    id: 'stock-005',
    productId: 'prod-005',
    productName: 'Controle DualSense',
    platform: 'PS5',
    sku: 'CTRL-PS5-001',
    quantity: 20,
    minStockLevel: 10,
    maxStockLevel: 50,
    lastUpdated: '2023-09-30T16:40:00Z'
  }
];

const StockManagement: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState('');
  
  // Carregar itens de estoque (simulando uma chamada de API)
  useEffect(() => {
    // Em um ambiente real, isso seria uma chamada para o backend
    setStockItems(mockStockItems);
    setFilteredItems(mockStockItems);
  }, []);
  
  // Aplicar filtros e pesquisa
  useEffect(() => {
    let result = [...stockItems];
    
    // Aplicar termo de pesquisa
    if (searchTerm) {
      result = result.filter(item => 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar filtro de estoque baixo
    if (filterLowStock) {
      result = result.filter(item => item.quantity <= item.minStockLevel);
    }
    
    setFilteredItems(result);
  }, [searchTerm, filterLowStock, stockItems]);
  
  // Abrir modal para ajustar estoque
  const handleAdjustStock = (item: StockItem) => {
    setCurrentItem(item);
    setAdjustmentQuantity(0);
    setAdjustmentReason('');
    setIsModalOpen(true);
  };
  
  // Salvar ajuste de estoque
  const handleSaveAdjustment = () => {
    if (!currentItem || adjustmentQuantity === 0) return;
    
    const newQuantity = currentItem.quantity + adjustmentQuantity;
    
    // Verificar se a nova quantidade é válida
    if (newQuantity < 0) {
      alert('A quantidade não pode ser negativa.');
      return;
    }
    
    // Atualizar o item de estoque
    const updatedItem: StockItem = {
      ...currentItem,
      quantity: newQuantity,
      lastUpdated: new Date().toISOString()
    };
    
    // Atualizar a lista de itens
    setStockItems(prev => prev.map(item => 
      item.id === currentItem.id ? updatedItem : item
    ));
    
    // Em um ambiente real, você registraria o histórico de ajuste
    console.log('Ajuste de estoque:', {
      itemId: currentItem.id,
      productName: currentItem.productName,
      previousQuantity: currentItem.quantity,
      newQuantity,
      adjustment: adjustmentQuantity,
      reason: adjustmentReason,
      timestamp: new Date().toISOString()
    });
    
    // Fechar o modal
    setIsModalOpen(false);
  };
  
  // Obter classe de status de estoque
  const getStockStatusClass = (item: StockItem) => {
    if (item.quantity <= item.minStockLevel) {
      return 'text-red-500';
    } else if (item.quantity >= item.maxStockLevel) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };
  
  // Obter texto de status de estoque
  const getStockStatusText = (item: StockItem) => {
    if (item.quantity <= item.minStockLevel) {
      return 'Estoque Baixo';
    } else if (item.quantity >= item.maxStockLevel) {
      return 'Estoque Alto';
    } else {
      return 'Estoque Normal';
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 neon-text">Controle de Estoque</h1>
      
      {/* Estatísticas de Estoque */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total de Produtos</p>
              <h3 className="dashboard-stat text-white">{stockItems.length}</h3>
            </div>
            <div className="bg-primary bg-opacity-20 p-3 rounded-lg">
              <Package size={24} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Produtos com Estoque Baixo</p>
              <h3 className="dashboard-stat text-red-500">
                {stockItems.filter(item => item.quantity <= item.minStockLevel).length}
              </h3>
            </div>
            <div className="bg-red-500 bg-opacity-20 p-3 rounded-lg">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Produtos com Estoque Alto</p>
              <h3 className="dashboard-stat text-yellow-500">
                {stockItems.filter(item => item.quantity >= item.maxStockLevel).length}
              </h3>
            </div>
            <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
              <Package size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros e Pesquisa */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, SKU ou plataforma..."
              className="form-input"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="filterLowStock"
              checked={filterLowStock}
              onChange={() => setFilterLowStock(!filterLowStock)}
              className="form-checkbox"
            />
            <label htmlFor="filterLowStock" className="text-gray-300 ml-2">
              Mostrar apenas estoque baixo
            </label>
          </div>
        </div>
      </div>
      
      {/* Tabela de Estoque */}
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">SKU</th>
              <th className="table-header-cell">Produto</th>
              <th className="table-header-cell">Plataforma</th>
              <th className="table-header-cell">Quantidade</th>
              <th className="table-header-cell">Mín/Máx</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Última Atualização</th>
              <th className="table-header-cell">Ações</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <tr key={item.id} className="table-row">
                  <td className="table-cell">{item.sku}</td>
                  <td className="table-cell font-medium text-white">{item.productName}</td>
                  <td className="table-cell">{item.platform}</td>
                  <td className="table-cell font-bold">{item.quantity}</td>
                  <td className="table-cell">
                    {item.minStockLevel} / {item.maxStockLevel}
                  </td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.quantity <= item.minStockLevel
                        ? 'bg-red-900 text-red-100'
                        : item.quantity >= item.maxStockLevel
                          ? 'bg-yellow-900 text-yellow-100'
                          : 'bg-green-900 text-green-100'
                    }`}>
                      {getStockStatusText(item)}
                    </span>
                  </td>
                  <td className="table-cell">
                    {new Date(item.lastUpdated).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleAdjustStock(item)}
                      className="bg-primary hover:bg-opacity-90 text-black font-bold py-1 px-3 rounded-lg text-sm transition-all"
                    >
                      Ajustar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="table-cell text-center py-8">
                  <p className="text-gray-400">Nenhum item de estoque encontrado.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal de Ajuste de Estoque */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Ajustar Estoque: {currentItem.productName}
            </h2>
            
            <div className="mb-4">
              <p className="text-gray-400">SKU: {currentItem.sku}</p>
              <p className="text-gray-400">Plataforma: {currentItem.platform}</p>
              <p className="text-gray-400">
                Quantidade Atual: <span className={getStockStatusClass(currentItem)}>{currentItem.quantity}</span>
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="adjustmentQuantity" className="form-label">
                Ajuste de Quantidade
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setAdjustmentQuantity(prev => prev - 1)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-l-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowDown size={18} />
                </button>
                <input
                  type="number"
                  id="adjustmentQuantity"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(parseInt(e.target.value) || 0)}
                  className="form-input rounded-none text-center w-20"
                />
                <button
                  type="button"
                  onClick={() => setAdjustmentQuantity(prev => prev + 1)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-r-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Use valores negativos para reduzir o estoque.
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="adjustmentReason" className="form-label">
                Motivo do Ajuste
              </label>
              <textarea
                id="adjustmentReason"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                className="form-input min-h-[100px]"
                placeholder="Explique o motivo do ajuste de estoque..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveAdjustment}
                disabled={adjustmentQuantity === 0 || !adjustmentReason}
                className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg transition-all button-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Ajuste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
