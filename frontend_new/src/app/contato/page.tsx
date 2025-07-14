'use client';

import { ArrowLeft, Mail, PhoneCall, Linkedin, Facebook, Instagram, Twitter, MapPin, Globe } from 'lucide-react';

export default function ContatoPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card de Informações de Contato */}
        <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Email</h3>
                <p className="text-sm text-gray-600">contato@apiyourself.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Telefone</h3>
                <p className="text-sm text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Linkedin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">LinkedIn</h3>
                <p className="text-sm text-gray-600">linkedin.com/apiyourself</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Redes Sociais */}
        <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Redes Sociais</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Facebook className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Facebook</h3>
                <p className="text-sm text-gray-600">facebook.com/apiyourself</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Instagram className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Instagram</h3>
                <p className="text-sm text-gray-600">instagram.com/apiyourself</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Twitter className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Twitter</h3>
                <p className="text-sm text-gray-600">twitter.com/apiyourself</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Endereço */}
        <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Endereço</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Endereço</h3>
                <p className="text-sm text-gray-600">Rua Exemplo, 123</p>
                <p className="text-sm text-gray-600">São Paulo, SP</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-600">Horário de Funcionamento</h3>
                <p className="text-sm text-gray-600">Segunda a Sexta: 9h às 18h</p>
                <p className="text-sm text-gray-600">Sábado: 9h às 12h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Contato */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Formulário de Contato</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
            <textarea
              id="mensagem"
              rows={4}
              placeholder="Sua mensagem..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>

      <button 
        className="flex items-center px-4 py-2 text-blue-600 font-medium bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para a página anterior
      </button>
    </div>
  );
}
