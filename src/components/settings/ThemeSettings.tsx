import React, { useState } from 'react';
import { Palette, Moon, Sun, Check, Sliders } from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  isDark: boolean;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'default',
    name: 'Padrão (Neon Verde)',
    primaryColor: '#10B981',
    accentColor: '#D946EF',
    isDark: true
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Azul',
    primaryColor: '#3B82F6',
    accentColor: '#EC4899',
    isDark: true
  },
  {
    id: 'retro-purple',
    name: 'Retro Roxo',
    primaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    isDark: true
  },
  {
    id: 'gaming-red',
    name: 'Gaming Vermelho',
    primaryColor: '#EF4444',
    accentColor: '#10B981',
    isDark: true
  },
  {
    id: 'light-mode',
    name: 'Modo Claro',
    primaryColor: '#10B981',
    accentColor: '#8B5CF6',
    isDark: false
  }
];

const ThemeSettings: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#10B981');
  const [customAccentColor, setCustomAccentColor] = useState('#D946EF');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  
  // Aplicar tema
  const applyTheme = () => {
    // Em um ambiente real, isso atualizaria as variáveis CSS ou enviaria para o backend
    alert('Tema aplicado com sucesso!');
  };
  
  // Selecionar tema predefinido
  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    setIsCustomTheme(false);
    
    const theme = themeOptions.find(t => t.id === themeId);
    if (theme) {
      setCustomPrimaryColor(theme.primaryColor);
      setCustomAccentColor(theme.accentColor);
      setIsDarkMode(theme.isDark);
    }
  };
  
  // Ativar tema personalizado
  const handleCustomTheme = () => {
    setIsCustomTheme(true);
    setSelectedTheme('custom');
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 neon-text">Configurações de Tema</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Temas Predefinidos */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Palette size={20} className="mr-2 text-primary" />
            Temas Predefinidos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {themeOptions.map(theme => (
              <div
                key={theme.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTheme === theme.id && !isCustomTheme
                    ? 'border-primary neon-border'
                    : 'border-gray-800 hover:border-gray-700'
                } ${theme.isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
                onClick={() => handleSelectTheme(theme.id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-medium ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                    {theme.name}
                  </h3>
                  {selectedTheme === theme.id && !isCustomTheme && (
                    <Check size={18} className="text-primary" />
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                    title="Cor primária"
                  ></div>
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                    title="Cor de destaque"
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      theme.isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                    title={theme.isDark ? 'Modo escuro' : 'Modo claro'}
                  >
                    {theme.isDark ? <Moon size={14} /> : <Sun size={14} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleCustomTheme}
            className={`w-full py-2 px-4 rounded-lg border ${
              isCustomTheme
                ? 'border-primary text-primary neon-border'
                : 'border-gray-700 text-gray-300 hover:border-gray-600'
            } transition-all`}
          >
            Personalizar Tema
          </button>
        </div>
        
        {/* Personalização de Tema */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Sliders size={20} className="mr-2 text-primary" />
            Personalização
          </h2>
          
          <div className="space-y-6">
            {/* Modo Claro/Escuro */}
            <div>
              <label className="form-label">Modo de Exibição</label>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
                    isDarkMode
                      ? 'bg-gray-800 text-white border border-primary'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } transition-colors`}
                >
                  <Moon size={18} className="mr-2" />
                  Escuro
                </button>
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
                    !isDarkMode
                      ? 'bg-gray-100 text-gray-900 border border-primary'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } transition-colors`}
                >
                  <Sun size={18} className="mr-2" />
                  Claro
                </button>
              </div>
            </div>
            
            {/* Cor Primária */}
            <div>
              <label htmlFor="primaryColor" className="form-label">
                Cor Primária
              </label>
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg"
                  style={{ backgroundColor: customPrimaryColor }}
                ></div>
                <input
                  type="color"
                  id="primaryColor"
                  value={customPrimaryColor}
                  onChange={(e) => setCustomPrimaryColor(e.target.value)}
                  className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700"
                />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Cor principal usada em botões e elementos de destaque.
              </p>
            </div>
            
            {/* Cor de Destaque */}
            <div>
              <label htmlFor="accentColor" className="form-label">
                Cor de Destaque
              </label>
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg"
                  style={{ backgroundColor: customAccentColor }}
                ></div>
                <input
                  type="color"
                  id="accentColor"
                  value={customAccentColor}
                  onChange={(e) => setCustomAccentColor(e.target.value)}
                  className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700"
                />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Cor secundária usada em elementos de destaque e efeitos neon.
              </p>
            </div>
            
            {/* Visualização */}
            <div className="mt-6">
              <label className="form-label">Visualização</label>
              <div
                className={`mt-2 p-4 rounded-lg border border-gray-700 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Exemplo de Título
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Este é um exemplo de como o tema ficará no site.
                </p>
                <button
                  className="py-2 px-4 rounded-lg font-bold transition-colors"
                  style={{
                    backgroundColor: customPrimaryColor,
                    color: isDarkMode ? '#000000' : '#FFFFFF'
                  }}
                >
                  Botão Primário
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botões de Ação */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={applyTheme}
          className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-6 rounded-lg transition-all button-glow"
        >
          Aplicar Tema
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;
