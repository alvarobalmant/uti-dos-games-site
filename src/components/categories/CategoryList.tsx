import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Tipo para as categorias
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Dados de exemplo para demonstração
const mockCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Jogos',
    slug: 'jogos',
    description: 'Todos os jogos para diversas plataformas',
    createdAt: '2023-08-10T10:30:00Z',
    updatedAt: '2023-08-10T10:30:00Z'
  },
  {
    id: 'cat-002',
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Controles, headsets e outros acessórios para games',
    createdAt: '2023-08-10T10:35:00Z',
    updatedAt: '2023-08-10T10:35:00Z'
  },
  {
    id: 'cat-003',
    name: 'Consoles',
    slug: 'consoles',
    description: 'PlayStation, Xbox, Nintendo e outros consoles',
    createdAt: '2023-08-10T10:40:00Z',
    updatedAt: '2023-08-10T10:40:00Z'
  },
  {
    id: 'cat-004',
    name: 'Jogos PS5',
    slug: 'jogos-ps5',
    description: 'Jogos exclusivos para PlayStation 5',
    parentId: 'cat-001',
    createdAt: '2023-08-10T10:45:00Z',
    updatedAt: '2023-08-10T10:45:00Z'
  },
  {
    id: 'cat-005',
    name: 'Jogos Xbox',
    slug: 'jogos-xbox',
    description: 'Jogos exclusivos para Xbox Series X/S',
    parentId: 'cat-001',
    createdAt: '2023-08-10T10:50:00Z',
    updatedAt: '2023-08-10T10:50:00Z'
  }
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: ''
  });
  
  // Carregar categorias (simulando uma chamada de API)
  useEffect(() => {
    // Em um ambiente real, isso seria uma chamada para o backend
    setCategories(mockCategories);
  }, []);
  
  // Abrir modal para adicionar nova categoria
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      parentId: ''
    });
    setIsModalOpen(true);
  };
  
  // Abrir modal para editar categoria existente
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      parentId: category.parentId || ''
    });
    setIsModalOpen(true);
  };
  
  // Excluir categoria
  const handleDeleteCategory = (id: string) => {
    // Em um ambiente real, isso seria uma chamada para o backend
    setCategories(prev => prev.filter(category => category.id !== id));
  };
  
  // Manipular mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gerar slug automaticamente a partir do nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    setFormData(prev => ({
      ...prev,
      name,
      slug
    }));
  };
  
  // Salvar categoria (adicionar ou atualizar)
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCategory) {
      // Atualizar categoria existente
      const updatedCategory: Category = {
        ...currentCategory,
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        parentId: formData.parentId || undefined,
        updatedAt: new Date().toISOString()
      };
      
      setCategories(prev => prev.map(cat => 
        cat.id === currentCategory.id ? updatedCategory : cat
      ));
    } else {
      // Adicionar nova categoria
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        parentId: formData.parentId || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCategories(prev => [...prev, newCategory]);
    }
    
    setIsModalOpen(false);
  };
  
  // Obter categorias principais (sem parentId)
  const parentCategories = categories.filter(category => !category.parentId);
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0 neon-text">Categorias</h1>
        <button 
          onClick={handleAddCategory}
          className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg flex items-center transition-all button-glow"
        >
          <Plus size={18} className="mr-2" />
          Adicionar Categoria
        </button>
      </div>
      
      {/* Tabela de Categorias */}
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID</th>
              <th className="table-header-cell">Nome</th>
              <th className="table-header-cell">Slug</th>
              <th className="table-header-cell">Descrição</th>
              <th className="table-header-cell">Categoria Pai</th>
              <th className="table-header-cell">Data de Criação</th>
              <th className="table-header-cell">Ações</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id} className="table-row">
                  <td className="table-cell">{category.id}</td>
                  <td className="table-cell font-medium text-white">{category.name}</td>
                  <td className="table-cell">{category.slug}</td>
                  <td className="table-cell">{category.description || '-'}</td>
                  <td className="table-cell">
                    {category.parentId 
                      ? categories.find(cat => cat.id === category.parentId)?.name || '-'
                      : '-'
                    }
                  </td>
                  <td className="table-cell">
                    {new Date(category.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="table-cell text-center py-8">
                  <p className="text-gray-400">Nenhuma categoria encontrada.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal de Adicionar/Editar Categoria */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              {currentCategory ? 'Editar Categoria' : 'Adicionar Categoria'}
            </h2>
            
            <form onSubmit={handleSaveCategory}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="slug" className="form-label">Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <p className="text-gray-500 text-sm mt-1">
                  Identificador único para URLs (gerado automaticamente)
                </p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="form-label">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input min-h-[100px]"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="parentId" className="form-label">Categoria Pai</label>
                <select
                  id="parentId"
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Nenhuma (categoria principal)</option>
                  {parentCategories.map(category => (
                    <option 
                      key={category.id} 
                      value={category.id}
                      disabled={currentCategory?.id === category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
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
                  type="submit"
                  className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg transition-all button-glow"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
