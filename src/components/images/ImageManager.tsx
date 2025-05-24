import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl?: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  previewUrl,
  label = 'Imagem do produto'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(previewUrl);
  const [error, setError] = useState<string | null>(null);
  
  // Manipular o arrastar e soltar
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Manipular o soltar do arquivo
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Manipular a seleção de arquivo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  // Processar o arquivo
  const handleFile = (file: File) => {
    // Verificar o tipo de arquivo
    if (!file.type.match('image.*')) {
      setError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }
    
    // Verificar o tamanho do arquivo (limite de 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('O arquivo é muito grande. O tamanho máximo é 5MB.');
      return;
    }
    
    // Limpar erro anterior
    setError(null);
    
    // Criar URL de visualização
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    
    // Chamar a função de callback
    onImageUpload(file);
  };
  
  // Remover a imagem
  const handleRemove = () => {
    setPreview(undefined);
    // Aqui você pode adicionar lógica para limpar o arquivo no componente pai
  };
  
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-700 hover:border-gray-600'
          } transition-colors cursor-pointer`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center">
            <Upload size={36} className="text-gray-500 mb-2" />
            <p className="text-gray-300 mb-1">
              Arraste e solte uma imagem aqui, ou clique para selecionar
            </p>
            <p className="text-gray-500 text-sm">
              PNG, JPG ou WEBP (máx. 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border border-gray-800 rounded-lg overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-contain bg-gray-900"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
            title="Remover imagem"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

interface ImageGalleryProps {
  images: string[];
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onRemove,
  onReorder
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // Iniciar o arrastar
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  // Manipular o soltar
  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
  };
  
  // Permitir o soltar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-white font-medium mb-3">Galeria de Imagens</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative border border-gray-800 rounded-lg overflow-hidden ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <img 
              src={image} 
              alt={`Imagem ${index + 1}`} 
              className="w-full h-32 object-cover"
            />
            
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-primary text-black text-xs font-bold px-2 py-1 rounded-md flex items-center">
                <Check size={12} className="mr-1" />
                Principal
              </div>
            )}
            
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
              title="Remover imagem"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {images.length > 0 && (
        <p className="text-gray-500 text-sm mt-2">
          Arraste e solte para reordenar as imagens. A primeira imagem será usada como imagem principal.
        </p>
      )}
    </div>
  );
};

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<string[]>([
    '/images/products/god-of-war.jpg',
    '/images/products/horizon.jpg',
    '/images/products/halo.jpg',
    '/images/products/zelda.jpg'
  ]);
  
  // Adicionar nova imagem
  const handleImageUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setImages(prev => [...prev, fileUrl]);
  };
  
  // Remover imagem
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Reordenar imagens
  const handleReorderImages = (startIndex: number, endIndex: number) => {
    const result = Array.from(images);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setImages(result);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 neon-text">Gerenciamento de Imagens</h1>
      
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Upload de Imagens</h2>
        
        <ImageUploader onImageUpload={handleImageUpload} />
        
        <ImageGallery 
          images={images}
          onRemove={handleRemoveImage}
          onReorder={handleReorderImages}
        />
        
        <div className="mt-6 flex justify-end">
          <button className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg transition-all button-glow">
            Salvar Alterações
          </button>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Otimização de Imagens</h2>
        
        <p className="text-gray-300 mb-4">
          As imagens são automaticamente otimizadas para garantir o melhor desempenho do site. 
          Recomendamos o upload de imagens com pelo menos 1200x1200 pixels para garantir boa qualidade.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ImageIcon size={20} className="text-primary mr-2" />
              <h3 className="text-white font-medium">Imagens de Produto</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Dimensões recomendadas: 1200x1200px<br />
              Formato: JPG ou PNG<br />
              Fundo: Transparente ou branco
            </p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ImageIcon size={20} className="text-primary mr-2" />
              <h3 className="text-white font-medium">Banners</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Dimensões recomendadas: 1920x500px<br />
              Formato: JPG<br />
              Texto: Legível em dispositivos móveis
            </p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ImageIcon size={20} className="text-primary mr-2" />
              <h3 className="text-white font-medium">Thumbnails</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Dimensões recomendadas: 400x400px<br />
              Formato: JPG ou PNG<br />
              Otimização: Automática
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImageUploader, ImageGallery, ImageManager };
