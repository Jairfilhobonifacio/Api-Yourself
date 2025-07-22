import Link from "next/link"
import { Github, Twitter, Linkedin, Heart, MapPin, Mail, Phone, Shield } from "lucide-react"

/**
 * SiteFooter é o componente de rodapé do site.
 * Exibe informações de contato, links úteis e redes sociais.
 * @returns {JSX.Element} O elemento JSX que representa o rodapé.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-100 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      {/* Efeito de brilho sutil */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full filter blur-3xl dark:bg-blue-600/20" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-400/20 rounded-full filter blur-3xl dark:bg-teal-600/20" />
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Api</span>
              <Heart className="h-6 w-6 text-pink-500 fill-current mx-1 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Yourself</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Conectando doadores a quem mais precisa. Juntos, podemos fazer a diferença na vida de muitas pessoas.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="https://github.com/seu-usuario" icon={Github} label="GitHub" />
              <SocialIcon href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialIcon href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Início" />
              <FooterLink href="/sobre" label="Sobre Nós" />
              <FooterLink href="/contato" label="Contato" />
              <FooterLink href="/mapa" label="Mapa de Doações" />
              <FooterLink href="/estatisticas" label="Estatísticas" />
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Rua Exemplo, 123<br />São Paulo - SP, 00000-000
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <a href="mailto:contato@apiyourself.com" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  contato@apiyourself.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <a href="tel:+5511999999999" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Inscreva-se para receber nossas atualizações.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-slate-500 dark:text-slate-500">
              &copy; {new Date().getFullYear()} ApiYourself. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="/privacidade" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
      
      {/* Padrão de ondas na parte inferior */}
      <div className="relative mt-12 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900/50 dark:to-slate-900/70">
          <svg 
            className="absolute bottom-0 w-full h-20" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity="0.25" 
              className="fill-blue-100 dark:fill-slate-800"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,141.56,72.19V0Z" 
              opacity="0.5" 
              className="fill-blue-100 dark:fill-slate-800"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-blue-50 dark:fill-slate-900"
            />
          </svg>
        </div>
      </div>
    </footer>
  )
}

// Componente auxiliar para links do rodapé
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
      >
        {label}
      </a>
    </li>
  )
}

// Componente auxiliar para ícones sociais
function SocialIcon({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
