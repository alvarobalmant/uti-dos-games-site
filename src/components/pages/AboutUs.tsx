import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, Award, ShieldCheck } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 neon-text text-center">Quem Somos</h1>
      
      {/* Hero Section */}
      <div className="bg-gray-900 rounded-xl overflow-hidden mb-12 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-4 neon-purple-text">UTI DOS GAMES</h2>
            <p className="text-gray-300 mb-6">
              Desde 2010, a UTI DOS GAMES tem sido referência no universo gamer, oferecendo os melhores jogos, consoles e acessórios para todas as plataformas. Nossa missão é proporcionar experiências incríveis aos gamers mais exigentes, com produtos de qualidade e atendimento personalizado.
            </p>
            <p className="text-gray-300">
              Somos apaixonados por games e entendemos o que nossos clientes buscam. Por isso, trabalhamos constantemente para trazer as últimas novidades e os clássicos mais queridos, garantindo diversão e satisfação para todos os tipos de jogadores.
            </p>
          </div>
          <div className="h-64 md:h-auto">
            <img 
              src="/images/about/store-front.jpg" 
              alt="Fachada da loja UTI DOS GAMES" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="bg-primary bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Comunidade</h3>
            <p className="text-gray-300">
              Acreditamos no poder da comunidade gamer. Promovemos eventos e criamos um espaço onde jogadores podem se conectar e compartilhar experiências.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="bg-primary bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Qualidade</h3>
            <p className="text-gray-300">
              Trabalhamos apenas com produtos originais e de alta qualidade. Nosso compromisso é oferecer o melhor para nossos clientes.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <div className="bg-primary bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Confiança</h3>
            <p className="text-gray-300">
              Construímos relacionamentos baseados em transparência e confiança. Nossos clientes sabem que podem contar conosco.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nossa Equipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="/images/team/team-member-1.jpg" 
              alt="Membro da equipe" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-white">Carlos Silva</h3>
              <p className="text-primary">Fundador & CEO</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="/images/team/team-member-2.jpg" 
              alt="Membro da equipe" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-white">Ana Oliveira</h3>
              <p className="text-primary">Gerente de Produtos</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="/images/team/team-member-3.jpg" 
              alt="Membro da equipe" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-white">Lucas Santos</h3>
              <p className="text-primary">Especialista em Consoles</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="/images/team/team-member-4.jpg" 
              alt="Membro da equipe" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-white">Juliana Costa</h3>
              <p className="text-primary">Atendimento ao Cliente</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Store Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Informações de Contato</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="mr-3 text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-white font-medium">Endereço</p>
                <p className="text-gray-300">Av. Exemplo, 1234 - Centro, São Paulo - SP, 01234-567</p>
              </div>
            </li>
            <li className="flex items-start">
              <Phone className="mr-3 text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-white font-medium">Telefone</p>
                <p className="text-gray-300">(11) 9999-9999</p>
              </div>
            </li>
            <li className="flex items-start">
              <Mail className="mr-3 text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-white font-medium">E-mail</p>
                <p className="text-gray-300">contato@utidosgames.com.br</p>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="mr-3 text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-white font-medium">Horário de Funcionamento</p>
                <p className="text-gray-300">Segunda a Sexta: 10h às 19h</p>
                <p className="text-gray-300">Sábado: 10h às 16h</p>
                <p className="text-gray-300">Domingo: Fechado</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Map */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="h-64 md:h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975893979244!2d-46.65390548502406!3d-23.56507868468041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1621436589517!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Localização da UTI DOS GAMES"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
