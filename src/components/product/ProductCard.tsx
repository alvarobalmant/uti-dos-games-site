import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  platform: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'xbox' | 'nintendo' | 'acessorio';
  isNew?: boolean;
  isOnSale?: boolean;
}

const platformIcons: Record<string, string> = {
  ps5: '/images/platforms/ps5.svg',
  ps4: '/images/platforms/ps4.svg',
  ps3: '/images/platforms/ps3.svg',
  ps2: '/images/platforms/ps2.svg',
  xbox: '/images/platforms/xbox.svg',
  nintendo: '/images/platforms/nintendo.svg',
  acessorio: '/images/platforms/acessorio.svg',
};

const platformColors: Record<string, string> = {
  ps5: 'bg-blue-600',
  ps4: 'bg-blue-500',
  ps3: 'bg-blue-400',
  ps2: 'bg-blue-300',
  xbox: 'bg-green-600',
  nintendo: 'bg-red-500',
  acessorio: 'bg-purple-500',
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  platform,
  isNew = false,
  isOnSale = false,
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 card-hover transition-all duration-300 h-full flex flex-col">
      {/* Badge */}
      {(isNew || isOnSale) && (
        <div className={`absolute top-3 left-3 ${isOnSale ? 'bg-primary' : 'bg-accent'} text-black text-xs font-bold px-2 py-1 rounded-md z-10`}>
          {isOnSale ? `${discount}% OFF` : 'NOVO'}
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 bg-black bg-opacity-50 p-1.5 rounded-full z-10 hover:bg-gray-800 transition-colors"
        aria-label="Adicionar aos favoritos"
      >
        <Heart size={18} className="text-white hover:text-red-500 transition-colors" />
      </button>
      
      {/* Image Container */}
      <Link to={`/produto/${id}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Platform Badge */}
        <div className="absolute bottom-3 left-3">
          <div className={`${platformColors[platform]} p-1 rounded-md`}>
            <img 
              src={platformIcons[platform]} 
              alt={platform} 
              className="w-6 h-6"
            />
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/produto/${id}`} className="block">
          <h3 className="font-bold text-white hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
            {title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4">
          {/* Price */}
          <div className="flex items-baseline mb-3">
            {originalPrice && (
              <span className="text-gray-500 line-through text-sm mr-2">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-white font-bold text-xl neon-text">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <button className="w-full bg-primary hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all button-glow">
            <ShoppingCart size={18} className="mr-2" />
            Adicionar
          </button>
          
          {/* WhatsApp Button */}
          <a 
            href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto: ${title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Tirar Dúvidas
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
