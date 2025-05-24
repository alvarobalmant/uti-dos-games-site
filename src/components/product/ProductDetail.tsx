import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  platform: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'xbox' | 'nintendo' | 'acessorio';
  category: string;
  inStock: boolean;
  rating: number;
  features?: string[];
  relatedProducts?: {
    id: string;
    title: string;
    price: number;
    image: string;
    platform: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'xbox' | 'nintendo' | 'acessorio';
  }[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  title,
  description,
  price,
  originalPrice,
  images,
  platform,
  category,
  inStock,
  rating,
  features,
  relatedProducts,
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-500">/</span>
                <Link to={`/categoria/${category.toLowerCase()}`} className="text-gray-400 hover:text-white">
                  {category}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-500">/</span>
                <Link to={`/plataforma/${platform.toLowerCase()}`} className="text-gray-400 hover:text-white">
                  {platform.toUpperCase()}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-300 truncate max-w-[150px] md:max-w-xs">
                  {title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Voltar
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-800">
            <img 
              src={mainImage} 
              alt={title} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(image)}
                className={`bg-gray-900 rounded-lg overflow-hidden border ${
                  mainImage === image ? 'border-primary neon-border' : 'border-gray-800'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${title} - imagem ${index + 1}`} 
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-400">({rating.toFixed(1)})</span>
          </div>
          
          {/* Platform Badge */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              platform === 'ps5' || platform === 'ps4' || platform === 'ps3' || platform === 'ps2' 
                ? 'bg-blue-900 text-blue-100' 
                : platform === 'xbox' 
                  ? 'bg-green-900 text-green-100' 
                  : platform === 'nintendo' 
                    ? 'bg-red-900 text-red-100' 
                    : 'bg-purple-900 text-purple-100'
            }`}>
              {platform.toUpperCase()}
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {originalPrice && (
              <div className="flex items-center mb-1">
                <span className="text-gray-400 line-through text-lg mr-2">
                  R$ {originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="bg-primary text-black text-sm font-bold px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white neon-text">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
              <span className="ml-2 text-gray-400">à vista</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              ou 12x de R$ {(price / 12).toFixed(2).replace('.', ',')} sem juros
            </p>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              inStock ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
            }`}>
              {inStock ? 'Em estoque' : 'Fora de estoque'}
            </span>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-300 mb-2">
              Quantidade:
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="bg-gray-800 text-white px-3 py-2 rounded-l-lg disabled:opacity-50"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                className="bg-gray-900 border-y border-gray-700 text-white text-center w-16 py-2"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="bg-gray-800 text-white px-3 py-2 rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <button 
              className="w-full bg-primary hover:bg-opacity-90 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all button-glow"
              disabled={!inStock}
            >
              <ShoppingCart size={20} className="mr-2" />
              {inStock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
            </button>
            
            <a 
              href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto: ${title} (R$ ${price.toFixed(2)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Comprar pelo WhatsApp
            </a>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Heart size={18} className="mr-2" />
                Favoritar
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                <Share2 size={18} className="mr-2" />
                Compartilhar
              </button>
            </div>
          </div>
          
          {/* Features */}
          {features && features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Destaques:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-800">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Descrição
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Especificações
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-medium text-sm border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Avaliações
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-line">{description}</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b border-gray-800 pb-3">
                  <p className="text-gray-400 text-sm">Plataforma</p>
                  <p className="text-white">{platform.toUpperCase()}</p>
                </div>
                <div className="border-b border-gray-800 pb-3">
                  <p className="text-gray-400 text-sm">Categoria</p>
                  <p className="text-white">{category}</p>
                </div>
                <div className="border-b border-gray-800 pb-3">
                  <p className="text-gray-400 text-sm">Garantia</p>
                  <p className="text-white">3 meses</p>
                </div>
                <div className="border-b border-gray-800 pb-3">
                  <p className="text-gray-400 text-sm">Código</p>
                  <p className="text-white">{id}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-white">{rating.toFixed(1)}</span>
                <span className="text-gray-400 ml-2">de 5</span>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
                <p className="text-center text-gray-300">
                  Seja o primeiro a avaliar este produto!
                </p>
                <div className="mt-4 text-center">
                  <button className="bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-6 rounded-lg transition-all">
                    Escrever Avaliação
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 card-hover transition-all duration-300">
                <Link to={`/produto/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="font-bold text-white hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="mt-2">
                    <span className="text-white font-bold">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
