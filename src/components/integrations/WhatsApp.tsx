import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string;
  message: string;
  buttonText: string;
  className?: string;
  icon?: boolean;
  fullWidth?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phone,
  message,
  buttonText,
  className = '',
  icon = true,
  fullWidth = false,
}) => {
  // Formatar o número de telefone (remover caracteres não numéricos)
  const formattedPhone = phone.replace(/\D/g, '');
  
  // Criar a URL do WhatsApp
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && (
        <MessageCircle size={20} className="mr-2" />
      )}
      {buttonText}
    </a>
  );
};

interface ShareOnWhatsAppProps {
  url: string;
  title: string;
  buttonText?: string;
  className?: string;
  icon?: boolean;
}

const ShareOnWhatsApp: React.FC<ShareOnWhatsAppProps> = ({
  url,
  title,
  buttonText = 'Compartilhar no WhatsApp',
  className = '',
  icon = true,
}) => {
  // Criar a mensagem de compartilhamento
  const shareMessage = `${title} ${url}`;
  
  // Criar a URL de compartilhamento do WhatsApp
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors ${className}`}
    >
      {icon && (
        <Share2 size={18} className="mr-2" />
      )}
      {buttonText}
    </a>
  );
};

export { WhatsAppButton, ShareOnWhatsApp };
