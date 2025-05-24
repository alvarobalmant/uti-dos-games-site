import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, Package, TrendingUp, Clock } from 'lucide-react';

// Dados de exemplo para o dashboard
const salesData = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
  { name: 'Jul', vendas: 3490 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 neon-text">Dashboard</h1>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Vendas Hoje</p>
              <h3 className="dashboard-stat text-primary neon-text">R$ 1.250,00</h3>
              <p className="text-green-500 text-sm flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +15% em relação a ontem
              </p>
            </div>
            <div className="bg-primary bg-opacity-20 p-3 rounded-lg">
              <DollarSign size={24} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Novos Pedidos</p>
              <h3 className="dashboard-stat text-accent neon-purple-text">8</h3>
              <p className="text-gray-400 text-sm flex items-center">
                <Clock size={14} className="mr-1" />
                Nas últimas 24 horas
              </p>
            </div>
            <div className="bg-accent bg-opacity-20 p-3 rounded-lg">
              <ShoppingBag size={24} className="text-accent" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Produtos</p>
              <h3 className="dashboard-stat text-blue-500">124</h3>
              <p className="text-blue-500 text-sm">12 com estoque baixo</p>
            </div>
            <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
              <Package size={24} className="text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 mb-1">Clientes</p>
              <h3 className="dashboard-stat text-yellow-500">45</h3>
              <p className="text-green-500 text-sm flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +5 novos este mês
              </p>
            </div>
            <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
              <Users size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráfico de Vendas */}
      <div className="dashboard-card mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Vendas Mensais</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="vendas" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Pedidos Recentes e Produtos Populares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pedidos Recentes */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-white mb-4">Pedidos Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">#1234</td>
                  <td className="px-4 py-3 text-sm text-gray-300">João Silva</td>
                  <td className="px-4 py-3 text-sm text-gray-300">R$ 350,00</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-100">
                      Concluído
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">#1235</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Maria Oliveira</td>
                  <td className="px-4 py-3 text-sm text-gray-300">R$ 120,00</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-900 text-yellow-100">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">#1236</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Carlos Santos</td>
                  <td className="px-4 py-3 text-sm text-gray-300">R$ 780,00</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-900 text-blue-100">
                      Em processamento
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">#1237</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Ana Pereira</td>
                  <td className="px-4 py-3 text-sm text-gray-300">R$ 250,00</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-100">
                      Concluído
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button className="text-primary hover:underline text-sm">
              Ver todos os pedidos
            </button>
          </div>
        </div>
        
        {/* Produtos Populares */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-white mb-4">Produtos Populares</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/products/god-of-war.jpg" 
                alt="God of War Ragnarök" 
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-medium">God of War Ragnarök</h3>
                <p className="text-gray-400 text-sm">PlayStation 5</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">R$ 299,90</p>
                <p className="text-gray-400 text-sm">32 vendas</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img 
                src="/images/products/horizon.jpg" 
                alt="Horizon Forbidden West" 
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-medium">Horizon Forbidden West</h3>
                <p className="text-gray-400 text-sm">PlayStation 5</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">R$ 249,90</p>
                <p className="text-gray-400 text-sm">28 vendas</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img 
                src="/images/products/halo.jpg" 
                alt="Halo Infinite" 
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-medium">Halo Infinite</h3>
                <p className="text-gray-400 text-sm">Xbox Series X</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">R$ 199,90</p>
                <p className="text-gray-400 text-sm">24 vendas</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img 
                src="/images/products/zelda.jpg" 
                alt="The Legend of Zelda: Tears of the Kingdom" 
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-medium">The Legend of Zelda: Tears of the Kingdom</h3>
                <p className="text-gray-400 text-sm">Nintendo Switch</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">R$ 349,90</p>
                <p className="text-gray-400 text-sm">22 vendas</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button className="text-primary hover:underline text-sm">
              Ver todos os produtos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
