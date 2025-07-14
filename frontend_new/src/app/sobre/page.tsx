'use client';

import { ArrowLeft, Mail, Phone, Target, Eye, Heart } from 'lucide-react';

export default function SobrePage() {
  const valores = [
    {
      icon: <Target className="w-4 h-4 text-blue-600" />,
      titulo: 'Missão',
      descricao: 'Transformar vidas através do poder da doação e do voluntariado',
    },
    {
      icon: <Eye className="w-4 h-4 text-blue-600" />,
      titulo: 'Visão',
      descricao: 'Ser referência nacional em plataforma de doações online',
    },
    {
      icon: <Heart className="w-4 h-4 text-blue-600" />,
      titulo: 'Valores',
      descricao: 'Transparência, ética e comprometimento com o bem-estar social',
    },
  ];

  const estatisticas = [
    {
      numero: '1000+',
      descricao: 'Doações realizadas',
    },
    {
      numero: '500+',
      descricao: 'Beneficiários atendidos',
    },
    {
      numero: '100+',
      descricao: 'Parceiros cadastrados',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Sobre Nós</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conheça mais sobre nossa plataforma e como ajudamos a transformar vidas
        </p>
      </div>

      {/* Nossa História */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nossa História</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            A ApiYourself foi fundada em 2024 com o objetivo de facilitar a conexão entre
            pessoas que desejam doar e instituições que precisam de ajuda. Desde então,
            já ajudamos milhares de pessoas através de nossa plataforma.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <ArrowLeft className="w-4 h-4 text-blue-600" />
              </div>
              <span>Fundada em 2024</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <span>1000+ doações realizadas</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <span>500+ beneficiários atendidos</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Nossos Valores */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nossos Valores</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {valores.map((valor, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                {valor.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{valor.titulo}</h3>
              <p className="text-gray-600">{valor.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {estatisticas.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.numero}</h3>
            <p className="text-gray-600">{stat.descricao}</p>
          </div>
        ))}
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <button 
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.href = '/contato'}
        >
          <Mail className="mr-2 h-5 w-5" />
          Entre em Contato
        </button>
        <button 
          className="flex items-center justify-center px-6 py-3 text-blue-600 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para a página anterior
        </button>
      </div>
    </div>
  );
}
