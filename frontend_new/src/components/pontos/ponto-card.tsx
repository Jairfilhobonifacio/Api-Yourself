'use client';

import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PontoCardProps {
  nome?: string
  endereco?: string
  telefone?: string
  email?: string
  horarioFuncionamento?: string
  necessidades?: (string | number | boolean)[]
  site?: string
  className?: string
}

export function PontoCard({
  nome = 'Sem nome',
  endereco = 'Endereço não informado',
  telefone = 'Não informado',
  email,
  horarioFuncionamento = 'Horário não informado',
  necessidades = [],
  site,
  className,
}: PontoCardProps) {
  // Verifica se o telefone é válido para o link tel:
  const isPhoneValid = telefone && telefone !== 'Não informado' && /^[0-9+\-\s()]+$/.test(telefone);
  
  // Verifica se o email é válido
  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full flex flex-col", className)}>
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-semibold mb-2">{nome || 'Ponto sem nome'}</h3>
            
            {Array.isArray(necessidades) && necessidades.length > 0 ? (
              <div className="flex gap-2 flex-wrap justify-end">
                {necessidades
                  .filter((n): n is string => typeof n === 'string' && n.trim() !== '')
                  .slice(0, 3)
                  .map((necessidade, index) => (
                    <Badge 
                      key={`${String(necessidade)}-${index}`} 
                      variant="secondary" 
                      className="whitespace-nowrap"
                    >
                      {String(necessidade)}
                    </Badge>
                  ))}
                {necessidades.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{necessidades.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <Badge variant="outline" className="text-xs">
                Sem itens
              </Badge>
            )}
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{endereco}</p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{horarioFuncionamento}</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {isPhoneValid ? (
                <a 
                  href={`tel:${telefone.replace(/[^0-9+]/g, '')}`} 
                  className="text-sm text-muted-foreground hover:underline"
                >
                  {telefone}
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">{telefone}</span>
              )}
            </div>

            {(email || isEmailValid) && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                {isEmailValid ? (
                  <a 
                    href={`mailto:${email}`} 
                    className="text-sm text-muted-foreground hover:underline break-all"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{email}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {site && (
          <div className="pt-2 mt-auto">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="w-full"
            >
              <a 
                href={site.startsWith('http') ? site : `https://${site}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Visitar site <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
