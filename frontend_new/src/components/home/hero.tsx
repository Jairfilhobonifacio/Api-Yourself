import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/custom-button"
import { ArrowRight, Heart, MapPin, Shield, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10" />
      
      {/* Efeitos de brilho decorativos */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full filter blur-3xl dark:bg-blue-600/20" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full filter blur-3xl dark:bg-cyan-600/20" />
      
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Conteúdo de texto */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Heart className="h-4 w-4" />
              <span>Faça a diferença hoje mesmo</span>
            </div>
            
            <h1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-blue-200 dark:to-cyan-200 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Conectando <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">doadores</span> a quem mais <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">precisa</span>
            </h1>
            
            <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
              Ajude a transformar vidas através de doações. Encontre pontos de coleta próximos a você e faça a diferença na sua comunidade de forma simples e segura.
            </p>
        
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
              <Link href="/pontos" className="relative z-10">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:brightness-105"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
                    Encontrar pontos de doação
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
              
              <Link href="/sobre" className="relative z-10">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group relative overflow-hidden border-2 border-blue-100 bg-white/80 px-8 py-6 text-base font-medium text-blue-600 backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-white hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-blue-400 dark:hover:border-slate-600 dark:hover:bg-slate-800/80 dark:hover:text-blue-300"
                >
                  <div className="flex items-center">
                    Saiba mais sobre nós
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 lg:justify-start">
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/50">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/50">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Fácil de usar</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/50">
                <div className="h-2 w-2 rounded-full bg-cyan-500" />
                <span>Impacto real</span>
              </div>
            </div>
          </div>

          {/* Imagem com bordas decorativas */}
          <div className="relative mt-12 lg:mt-0">
            <div className="relative z-10 mx-auto h-80 w-full overflow-hidden rounded-3xl border-8 border-white shadow-2xl dark:border-slate-800 sm:h-96 lg:h-[32rem] lg:w-full lg:max-w-xl">
              <Image
                src="/images/hero-donation.jpg"
                alt="Pessoas fazendo doações e ajudando a comunidade"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -bottom-6 -left-6 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 opacity-80 blur-xl dark:from-blue-900/30 dark:to-cyan-900/30" />
            <div className="absolute -right-6 -top-6 z-0 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 opacity-80 blur-xl dark:from-cyan-900/30 dark:to-blue-900/30" />
            
            {/* Badge decorativo */}
            <div className="absolute -bottom-4 -right-4 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-lg dark:bg-slate-800 dark:text-blue-400">
              <Shield className="h-5 w-5 text-green-500" />
              <span>+10.000 vidas impactadas</span>
            </div>
            
            {/* Destaque flutuante */}
            <div className="absolute -left-4 -top-4 z-20 hidden animate-float items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-lg dark:bg-slate-800 dark:text-blue-400 md:flex">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span>Doe com segurança</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
    </section>
  )
}
