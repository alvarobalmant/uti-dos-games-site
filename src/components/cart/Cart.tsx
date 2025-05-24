import React, { useState } from 'react';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  platform: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free if subtotal > 150)
  const shipping = subtotal > 150 ? 0 : 15;
  
  // Calculate total
  const total = subtotal - couponDiscount + shipping;
  
  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };
  
  // Handle coupon application
  const handleApplyCoupon = () => {
    // This would normally validate with backend
    if (couponCode.toUpperCase() === 'UTIDOS10') {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.1); // 10% discount
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };
  
  // Generate WhatsApp message with cart items
  const generateWhatsAppMessage = () => {
    let message = 'Olá! Gostaria de finalizar meu pedido:\n\n';
    
    items.forEach(item => {
      message += `- ${item.title} (${item.platform}) x${item.quantity}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\nSubtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    if (couponDiscount > 0) {
      message += `\nDesconto: R$ ${couponDiscount.toFixed(2).replace('.', ',')}`;
    }
    
    message += `\nFrete: ${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}`;
    message += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    
    return encodeURIComponent(message);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Carrinho de Compras</h1>
      
      {items.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
          <div className="mb-4">
            <ShoppingCart size={64} className="mx-auto text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-400 mb-6">Adicione produtos ao seu carrinho para continuar.</p>
          <Link 
            to="/catalogo" 
            className="bg-primary hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-lg transition-all inline-block button-glow"
          >
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Itens do Carrinho</h2>
                
                <div className="divide-y divide-gray-800">
                  {items.map(item => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product Image */}
                      <Link to={`/produto/${item.id}`} className="w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                      
                      {/* Product Info */}
                      <div className="sm:ml-4 flex-grow">
                        <Link to={`/produto/${item.id}`} className="text-white font-medium hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-gray-400 text-sm">Plataforma: {item.platform}</p>
                        <p className="text-primary font-bold mt-1">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      
                      {/* Quantity */}
                      <div className="flex items-center mt-4 sm:mt-0">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="bg-gray-800 text-white px-2 py-1 rounded-l-lg"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          className="bg-gray-900 border-y border-gray-700 text-white text-center w-12 py-1"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-gray-800 text-white px-2 py-1 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-4 mt-4 sm:mt-0"
                        aria-label="Remover item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link 
                to="/catalogo" 
                className="text-primary hover:underline flex items-center"
              >
                <ArrowRight size={16} className="mr-1 transform rotate-180" />
                Continuar Comprando
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Desconto</span>
                    <span className="text-green-500">- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Frete</span>
                  <span className="text-white">
                    {shipping === 0 ? (
                      <span className="text-green-500">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>
                
                <div className="border-t border-gray-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-white font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    ou 12x de R$ {(total / 12).toFixed(2).replace('.', ',')} sem juros
                  </p>
                </div>
              </div>
              
              {/* Coupon Code */}
              <div className="mb-6">
                <label htmlFor="coupon" className="block text-gray-300 mb-2">
                  Cupom de Desconto
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Digite seu cupom"
                    className="bg-gray-800 border border-gray-700 text-white rounded-l-lg py-2 px-3 flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="bg-primary text-black font-bold py-2 px-4 rounded-r-lg hover:bg-opacity-90 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-500 text-sm mt-1">
                    Cupom aplicado com sucesso!
                  </p>
                )}
              </div>
              
              {/* Checkout Buttons */}
              <div className="space-y-3">
                <a 
                  href={`https://wa.me/5511999999999?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Finalizar pelo WhatsApp
                </a>
                
                <button className="w-full bg-primary hover:bg-opacity-90 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all button-glow">
                  <ShoppingCart size={20} className="mr-2" />
                  Finalizar Compra
                </button>
              </div>
              
              {/* Secure Payment */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm mb-2">Formas de Pagamento</p>
                <div className="flex justify-center space-x-2">
                  <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
                  <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/images/payment/pix.svg" alt="Pix" className="h-6" />
                  <img src="/images/payment/boleto.svg" alt="Boleto" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
