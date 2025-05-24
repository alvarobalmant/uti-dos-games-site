import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900 via-primary to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold neon-text">RECEBA NOVIDADES E PROMOÇÕES</h3>
              <p className="text-gray-200 mt-1">Cadastre-se e ganhe 5% OFF na primeira compra!</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-opacity-90 transition-all button-glow">
                  CADASTRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h4 className="text-lg font-bold mb-4 neon-purple-text">SOBRE A UTI DOS GAMES</h4>
            <p className="text-gray-400 mb-4">
              Somos especialistas em games, acessórios e serviços para todas as plataformas. 
              Desde 2010 trazendo as melhores experiências para os gamers mais exigentes.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4 neon-purple-text">CATEGORIAS</h4>
            <ul className="space-y-2">
              <li>
                <a href="/playstation" className="text-gray-400 hover:text-white transition-colors">PlayStation</a>
              </li>
              <li>
                <a href="/xbox" className="text-gray-400 hover:text-white transition-colors">Xbox</a>
              </li>
              <li>
                <a href="/nintendo" className="text-gray-400 hover:text-white transition-colors">Nintendo</a>
              </li>
              <li>
                <a href="/acessorios" className="text-gray-400 hover:text-white transition-colors">Acessórios</a>
              </li>
              <li>
                <a href="/desbloqueios" className="text-gray-400 hover:text-white transition-colors">Desbloqueios</a>
              </li>
              <li>
                <a href="/promocoes" className="text-gray-400 hover:text-white transition-colors">Promoções</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Help */}
          <div>
            <h4 className="text-lg font-bold mb-4 neon-purple-text">AJUDA</h4>
            <ul className="space-y-2">
              <li>
                <a href="/como-comprar" className="text-gray-400 hover:text-white transition-colors">Como Comprar</a>
              </li>
              <li>
                <a href="/formas-pagamento" className="text-gray-400 hover:text-white transition-colors">Formas de Pagamento</a>
              </li>
              <li>
                <a href="/entrega" className="text-gray-400 hover:text-white transition-colors">Prazos de Entrega</a>
              </li>
              <li>
                <a href="/garantia" className="text-gray-400 hover:text-white transition-colors">Garantia</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 neon-purple-text">CONTATO</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 text-primary flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">Av. Exemplo, 1234 - Centro<br />São Paulo - SP, 01234-567</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-primary flex-shrink-0" size={18} />
                <a href="tel:+551199999999" className="text-gray-400 hover:text-white transition-colors">(11) 9999-9999</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-primary flex-shrink-0" size={18} />
                <a href="mailto:contato@utidosgames.com.br" className="text-gray-400 hover:text-white transition-colors">contato@utidosgames.com.br</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} UTI DOS GAMES. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
            <div className="flex space-x-4">
              <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/images/payment/pix.svg" alt="Pix" className="h-6" />
              <img src="/images/payment/boleto.svg" alt="Boleto" className="h-6" />
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contato via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
