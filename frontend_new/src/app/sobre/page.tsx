'use client';

import { Target, Eye, Heart, Users, HeartHandshake, Globe, ArrowRight } from 'lucide-react';

export default function SobrePage() {
  const valores = [
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      titulo: 'Missão',
      descricao: 'Transformar vidas através do poder da doação e do voluntariado',
      color: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <Eye className="w-6 h-6 text-teal-500" />,
      titulo: 'Visão',
      descricao: 'Ser referência nacional em plataforma de doações online',
      color: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      titulo: 'Valores',
      descricao: 'Transparência, ética e comprometimento com o bem-estar social',
      color: 'bg-pink-50 dark:bg-pink-900/20',
    },
  ];

  const estatisticas = [
    {
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
      numero: '1000+',
      descricao: 'Doações realizadas',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      numero: '500+',
      descricao: 'Beneficiários atendidos',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      numero: '100+',
      descricao: 'Parceiros cadastrados',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 dark:bg-blue-900/30 dark:text-blue-300">
          <Heart className="w-4 h-4 mr-2" />
          Nossa História
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-100 dark:to-cyan-100 bg-clip-text text-transparent">
          Sobre <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Nós</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Conheça nossa missão, visão e valores para transformar vidas através da doação
        </p>
      </div>

      {/* Nossa História */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 mb-16 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="relative z-10">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Nossa História
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Conectando corações que desejam ajudar a quem mais precisa
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              A ApiYourself foi fundada em 2025 com o objetivo de facilitar a conexão entre pessoas que desejam ajudar e instituições que precisam de apoio. Nossa plataforma nasceu da crença de que a solidariedade pode transformar realidades e construir um mundo mais justo e acolhedor.
            </p>
            <p className="text-lg leading-relaxed">
              Com uma equipe apaixonada por impacto social, desenvolvemos uma solução tecnológica que simplifica o processo de doação, tornando-o mais acessível, transparente e eficiente para todos os envolvidos.
            </p>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nossa Essência
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça os princípios que guiam o nosso trabalho e nos inspiram diariamente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {valores.map((item, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-2xl ${item.color} border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-sm mb-6 group-hover:shadow-md transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {item.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Estatísticas */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {estatisticas.map((estatistica, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${estatistica.color} rounded-2xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{estatistica.numero}</p>
                  <p className="text-blue-100">{estatistica.descricao}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  {estatistica.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Faça a Diferença
          </div>
          <h2 className="text-3xl font-bold mb-4">Junte-se a nós nessa missão</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Sua doação pode transformar vidas e construir um futuro melhor para todos
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/pontos"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Encontrar pontos de doação
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="/contato"
              className="px-6 py-3.5 border-2 border-white/80 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200 text-center"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
