// Importa o componente Link do Next.js para navegação.
import Link from "next/link"
// Importa ícones da biblioteca lucide-react.
import { Github, Twitter, Linkedin, Heart } from "lucide-react"

/**
 * SiteFooter é o componente de rodapé do site.
 * Exibe informações de copyright e links para redes sociais.
 * @returns {JSX.Element} O elemento JSX que representa o rodapé.
 */
export function SiteFooter() {
  return (
    // O elemento <footer> define o rodapé da página, com uma borda superior.
    <footer className="border-t border-white/10 bg-gradient-to-r from-indigo-500/10 via-fuchsia-600/10 to-indigo-500/10 backdrop-blur-md py-6 md:py-0">
      {/* O container centraliza o conteúdo e ajusta o layout para diferentes tamanhos de tela. */}
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        {/* Parágrafo com a informação de copyright. O ano é obtido dinamicamente. */}
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} 
          <Link href="/" className="inline-flex items-center ml-1 group">
            <span className="font-semibold">Api</span>
            <Heart className="h-4 w-4 text-pink-500 fill-current mx-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Yourself</span>
          </Link>. Todos os direitos reservados.
        </p>
        {/* Div que agrupa os ícones de redes sociais. */}
        <div className="flex items-center space-x-4">
          {/* Link para o perfil do GitHub, abrindo em uma nova aba. */}
          <Link
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            {/* O span com a classe sr-only é para acessibilidade, fornecendo texto para leitores de tela. */}
            <span className="sr-only">GitHub</span>
          </Link>
          {/* Link para o perfil do Twitter. */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          {/* Link para o perfil do LinkedIn. */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
