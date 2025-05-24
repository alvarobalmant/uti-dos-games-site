import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqItems: FAQItem[] = [
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, Mastercard, Elo, American Express), cartões de débito, PIX, boleto bancário e transferência bancária. Para compras na loja física, também aceitamos dinheiro em espécie.'
    },
    {
      question: 'Qual o prazo de entrega dos produtos?',
      answer: 'O prazo de entrega varia de acordo com a sua localização. Para a região metropolitana de São Paulo, realizamos entregas em até 24 horas para pedidos confirmados até às 15h. Para outras regiões, o prazo pode variar de 2 a 10 dias úteis, dependendo da disponibilidade dos Correios ou transportadoras parceiras.'
    },
    {
      question: 'Como funciona a garantia dos produtos?',
      answer: 'Todos os produtos novos possuem garantia de fábrica, que varia de 3 meses a 1 ano, dependendo do fabricante. Produtos usados possuem garantia de 30 dias contra defeitos de funcionamento. Em caso de problemas, entre em contato conosco para orientações sobre o processo de garantia.'
    },
    {
      question: 'Vocês trabalham com jogos usados?',
      answer: 'Sim! Compramos, vendemos e trocamos jogos usados para diversas plataformas. Os jogos usados passam por rigorosa avaliação de qualidade antes de serem disponibilizados para venda, garantindo o melhor estado possível.'
    },
    {
      question: 'Como funciona o sistema de troca de jogos?',
      answer: 'Você pode trazer seus jogos usados para avaliação em nossa loja física. O valor oferecido dependerá do estado de conservação, popularidade e demanda do título. O valor pode ser utilizado como crédito para aquisição de outros produtos ou convertido em dinheiro (com desconto de 20% sobre o valor do crédito).'
    },
    {
      question: 'Vocês realizam desbloqueio de consoles?',
      answer: 'Sim, oferecemos serviços de desbloqueio e modificação para diversos consoles, sempre respeitando as legislações vigentes. Entre em contato para verificar disponibilidade para seu modelo específico e valores.'
    },
    {
      question: 'Como faço para rastrear meu pedido?',
      answer: 'Após a confirmação do pagamento e envio do pedido, você receberá um e-mail com o código de rastreamento. Você pode acompanhar o status da entrega diretamente no site dos Correios ou da transportadora responsável, ou entrar em contato conosco via WhatsApp para mais informações.'
    },
    {
      question: 'Posso cancelar ou alterar meu pedido?',
      answer: 'Pedidos podem ser cancelados ou alterados antes da confirmação do pagamento. Após a confirmação, entre em contato conosco o mais rápido possível para verificarmos a possibilidade de cancelamento ou alteração, dependendo do estágio de processamento do pedido.'
    },
    {
      question: 'Vocês enviam para todo o Brasil?',
      answer: 'Sim, realizamos entregas para todo o território nacional através dos Correios ou transportadoras parceiras. Os prazos e valores de frete variam de acordo com a região e modalidade de envio escolhida.'
    },
    {
      question: 'Como funciona a compra pelo WhatsApp?',
      answer: 'É simples! Você pode entrar em contato conosco pelo WhatsApp, informar os produtos desejados, e nossa equipe irá confirmar a disponibilidade, valores e formas de pagamento. Após a confirmação do pagamento, o pedido será processado e enviado conforme combinado.'
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 neon-text text-center">Perguntas Frequentes</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="divide-y divide-gray-800">
            {faqItems.map((item, index) => (
              <div key={index} className="border-gray-800">
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{item.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="text-primary flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-primary flex-shrink-0" size={20} />
                    )}
                  </div>
                </button>
                <div
                  className={`px-6 pb-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-300 mb-6">
            Entre em contato conosco e teremos prazer em ajudar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Fale pelo WhatsApp
            </a>
            <a 
              href="mailto:contato@utidosgames.com.br"
              className="bg-primary hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all button-glow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Enviar E-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
