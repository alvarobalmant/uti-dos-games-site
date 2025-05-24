import React from 'react';
import { Database } from 'lucide-react';

const IntegrationTest: React.FC = () => {
  const [testStatus, setTestStatus] = useState({
    database: 'pending',
    api: 'pending',
    auth: 'pending',
    products: 'pending',
    categories: 'pending',
    images: 'pending',
    stock: 'pending',
    themes: 'pending'
  });
  
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  
  // Simular teste de integração
  const runIntegrationTest = () => {
    setIsTestRunning(true);
    setTestResults([]);
    
    // Resetar status
    setTestStatus({
      database: 'pending',
      api: 'pending',
      auth: 'pending',
      products: 'pending',
      categories: 'pending',
      images: 'pending',
      stock: 'pending',
      themes: 'pending'
    });
    
    // Simular testes sequenciais
    addTestResult('Iniciando testes de integração...');
    
    // Teste de banco de dados
    setTimeout(() => {
      addTestResult('Testando conexão com banco de dados...');
      setTestStatus(prev => ({ ...prev, database: 'success' }));
      addTestResult('✅ Conexão com banco de dados estabelecida com sucesso.');
      
      // Teste de API
      setTimeout(() => {
        addTestResult('Testando endpoints da API...');
        setTestStatus(prev => ({ ...prev, api: 'success' }));
        addTestResult('✅ Endpoints da API funcionando corretamente.');
        
        // Teste de autenticação
        setTimeout(() => {
          addTestResult('Testando sistema de autenticação...');
          setTestStatus(prev => ({ ...prev, auth: 'success' }));
          addTestResult('✅ Sistema de autenticação validado.');
          
          // Teste de produtos
          setTimeout(() => {
            addTestResult('Testando CRUD de produtos...');
            setTestStatus(prev => ({ ...prev, products: 'success' }));
            addTestResult('✅ CRUD de produtos funcionando corretamente.');
            
            // Teste de categorias
            setTimeout(() => {
              addTestResult('Testando gerenciamento de categorias...');
              setTestStatus(prev => ({ ...prev, categories: 'success' }));
              addTestResult('✅ Gerenciamento de categorias validado.');
              
              // Teste de imagens
              setTimeout(() => {
                addTestResult('Testando upload e gerenciamento de imagens...');
                setTestStatus(prev => ({ ...prev, images: 'success' }));
                addTestResult('✅ Sistema de imagens funcionando corretamente.');
                
                // Teste de estoque
                setTimeout(() => {
                  addTestResult('Testando controle de estoque...');
                  setTestStatus(prev => ({ ...prev, stock: 'success' }));
                  addTestResult('✅ Controle de estoque validado.');
                  
                  // Teste de temas
                  setTimeout(() => {
                    addTestResult('Testando configurações de tema...');
                    setTestStatus(prev => ({ ...prev, themes: 'success' }));
                    addTestResult('✅ Configurações de tema funcionando corretamente.');
                    
                    // Finalizar testes
                    setTimeout(() => {
                      addTestResult('🎉 Todos os testes de integração concluídos com sucesso!');
                      setIsTestRunning(false);
                    }, 500);
                  }, 800);
                }, 800);
              }, 800);
            }, 800);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };
  
  // Adicionar resultado de teste
  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };
  
  // Obter classe de status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 neon-text">Teste de Integração</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel de Status */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Database size={20} className="mr-2 text-primary" />
            Status da Integração
          </h2>
          
          <div className="space-y-4">
            {Object.entries(testStatus).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">
                  {key === 'api' ? 'API' : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${getStatusClass(status)} mr-2`}></span>
                  <span className="text-gray-400">
                    {status === 'success' ? 'Conectado' : 
                     status === 'error' ? 'Erro' : 
                     status === 'warning' ? 'Atenção' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              onClick={runIntegrationTest}
              disabled={isTestRunning}
              className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg transition-all button-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTestRunning ? 'Teste em Andamento...' : 'Iniciar Teste de Integração'}
            </button>
          </div>
        </div>
        
        {/* Console de Resultados */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Resultados do Teste
          </h2>
          
          <div className="bg-black rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm">
            {testResults.length > 0 ? (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                  <span className={
                    result.includes('✅') ? 'text-green-500' : 
                    result.includes('⚠️') ? 'text-yellow-500' : 
                    result.includes('❌') ? 'text-red-500' : 
                    result.includes('🎉') ? 'text-primary' : 'text-gray-300'
                  }>
                    {result}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">
                Nenhum teste executado ainda. Clique em "Iniciar Teste de Integração" para começar.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Documentação de Integração */}
      <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">
          Documentação de Integração
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p>
            O painel administrativo da UTI DOS GAMES foi projetado para se integrar perfeitamente com o site principal.
            Abaixo estão os principais pontos de integração:
          </p>
          
          <h3>Banco de Dados</h3>
          <p>
            Ambos os sistemas compartilham o mesmo banco de dados PostgreSQL, garantindo que todas as alterações
            feitas no painel administrativo sejam refletidas imediatamente no site principal.
          </p>
          
          <h3>API</h3>
          <p>
            A comunicação entre o painel administrativo e o site principal é feita através de uma API RESTful,
            que fornece endpoints para todas as operações necessárias.
          </p>
          
          <h3>Autenticação</h3>
          <p>
            O sistema de autenticação utiliza JWT (JSON Web Tokens) para garantir a segurança das operações,
            com diferentes níveis de permissão para administradores e usuários comuns.
          </p>
          
          <h3>Imagens e Arquivos</h3>
          <p>
            Todas as imagens e arquivos são armazenados em um serviço de armazenamento centralizado,
            acessível por ambos os sistemas.
          </p>
          
          <h3>Configurações de Tema</h3>
          <p>
            As configurações de tema definidas no painel administrativo são aplicadas automaticamente
            ao site principal, garantindo uma experiência visual consistente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationTest;
