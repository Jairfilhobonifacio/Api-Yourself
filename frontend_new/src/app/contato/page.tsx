'use client';

import { Mail, Phone, MapPin, Clock, Send, ArrowRight, MessageCircle, User, Mail as MailIcon } from 'lucide-react';
import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    console.log('Formulário enviado:', formData);
    // Aqui você pode adicionar a lógica de envio do formulário
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: 'Email',
      description: 'Envie-nos um e-mail',
      value: 'contato@apiyourself.com',
      link: 'mailto:contato@apiyourself.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-500" />,
      title: 'Telefone',
      description: 'Fale conosco',
      value: '(11) 99999-9999',
      link: 'tel:+5511999999999'
    },
    {
      icon: <MapPin className="w-6 h-6 text-pink-500" />,
      title: 'Endereço',
      description: 'Visite nosso escritório',
      value: 'Rua Exemplo, 123 - São Paulo, SP',
      link: 'https://maps.google.com'
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
      title: 'Horário',
      description: 'Horário de atendimento',
      value: 'Seg-Sex: 9h-18h | Sáb: 9h-12h',
      link: ''
    }
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 dark:bg-blue-900/30 dark:text-blue-300">
          <MessageCircle className="w-4 h-4 mr-2" />
          Fale conosco
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-100 dark:to-cyan-100 bg-clip-text text-transparent">
          Entre em <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Contato</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Tem alguma dúvida ou sugestão? Estamos aqui para ajudar! Entre em contato conosco.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700/50">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Informações de Contato</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Entre em contato conosco através dos canais abaixo ou preencha o formulário ao lado.
            </p>
          </div>
          
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{method.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-200 font-medium">{method.value}</p>
                </div>
                <ArrowRight className="ml-auto w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Envie-nos uma mensagem</h2>
            <p className="text-gray-500 dark:text-gray-400">Responderemos o mais rápido possível</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                  placeholder="Digite seu melhor e-mail"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensagem
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20 transition-all duration-200 shadow-sm resize-none"
                  placeholder="Como podemos ajudar?"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="group w-full flex justify-center items-center px-6 py-3.5 rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Enviar mensagem
                <Send className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Mapa */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-80 w-full bg-gray-200 dark:bg-gray-700 relative">
          {/* Aqui você pode adicionar um componente de mapa (Google Maps, Mapbox, etc) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
              <MapPin className="h-12 w-12 mx-auto text-blue-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Nossa Localização</h3>
              <p className="text-gray-600 dark:text-gray-300">Rua Exemplo, 123 - São Paulo, SP</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver no mapa <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
