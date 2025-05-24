import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo para o usuário
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

// Definindo o tipo para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o usuário já está autenticado (por exemplo, através de localStorage)
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulando uma chamada de API
      // Em um ambiente real, isso seria uma chamada para o backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Credenciais de teste para demonstração
      if (email === 'admin@utidosgames.com.br' && password === 'admin123') {
        const userData: User = {
          id: '1',
          name: 'Administrador',
          email: 'admin@utidosgames.com.br',
          role: 'admin',
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Valor do contexto
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
