'use client';

import { MapPin, Clock, Phone, Mail, ExternalLink, Trash2 } from "lucide-react"
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"
import { usePontosDoacao } from "@/context/PontosDoacaoContext"

// Estilos para a animação de spin
const spinStyle = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Estilos para o modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
} as React.CSSProperties;

const modalContentStyle = {
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  maxWidth: '450px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
} as React.CSSProperties;

const modalHeaderStyle = {
  marginBottom: '1rem',
};

const modalTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
};

const modalDescriptionStyle = {
  color: '#6b7280',
  marginBottom: '1.5rem',
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  marginTop: '1.5rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s',
};

const buttonPrimaryStyle = {
  ...buttonStyle,
  backgroundColor: '#dc2626',
  color: 'white',
  borderColor: '#dc2626',
};

const buttonSecondaryStyle = {
  ...buttonStyle,
  backgroundColor: 'white',
  color: '#4b5563',
  borderColor: '#d1d5db',
};

interface PontoCardProps {
  id?: string | number
  nome?: string
  endereco?: string
  telefone?: string
  email?: string
  horarioFuncionamento?: string
  necessidades?: (string | number | boolean)[]
  site?: string
  className?: string
  onDelete?: (id: string | number) => void
}

export function PontoCard({
  id,
  nome = 'Sem nome',
  endereco = 'Endereço não informado',
  telefone = 'Não informado',
  email,
  horarioFuncionamento = 'Horário não informado',
  necessidades = [],
  site,
  className,
  onDelete,
}: PontoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { removerPonto } = usePontosDoacao()
  
  // Adiciona estilos globais para a animação de spin
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = spinStyle;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await removerPonto(Number(id));
      // Usando alert nativo para feedback
      alert("Ponto de doação removido com sucesso.");
      onDelete?.(id);
    } catch (error) {
      console.error("Erro ao remover ponto:", error);
      // Usando alert nativo para feedback de erro
      alert("Não foi possível remover o ponto de doação. Tente novamente.");
    } finally {
      setIsDeleting(false);
      // Fechar o modal após a ação
      setIsModalOpen(false);
    }
  };
  // Verifica se o telefone é válido para o link tel:
  const isPhoneValid = telefone && telefone !== 'Não informado' && /^[0-9+\-\s()]+$/.test(telefone);
  
  // Verifica se o email é válido
  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => !isDeleting && setIsModalOpen(false);

  return (
    <div className={cn("group relative rounded-lg border bg-white text-foreground shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md", className)}>
      {id && onDelete && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={openModal}
            disabled={isDeleting}
            className="h-8 w-8 rounded-full bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center"
            aria-label="Excluir ponto"
          >
            {isDeleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Excluir ponto</span>
          </button>

          {/* Modal de confirmação */}
          {isModalOpen && (
            <div style={modalOverlayStyle} onClick={closeModal}>
              <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                <div style={modalHeaderStyle}>
                  <h3 style={modalTitleStyle}>Confirmar exclusão</h3>
                  <p style={modalDescriptionStyle}>
                    {`Tem certeza que deseja remover o ponto de doação "${nome}"? Esta ação não pode ser desfeita.`}
                  </p>
                </div>
                
                <div style={modalFooterStyle}>
                  <button 
                    onClick={closeModal} 
                    style={buttonSecondaryStyle}
                    disabled={isDeleting}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleDelete}
                    style={buttonPrimaryStyle}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <div style={{display: 'inline-flex', alignItems: 'center'}}>
                        <div style={{
                          height: '1rem',
                          width: '1rem',
                          borderRadius: '50%',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          marginRight: '0.5rem',
                          animation: 'spin 1s linear infinite',
                        }} />
                        Excluindo...
                      </div>
                    ) : 'Excluir'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-semibold mb-2 text-foreground">{nome || 'Ponto sem nome'}</h3>
            
            {Array.isArray(necessidades) && necessidades.length > 0 ? (
              <div className="flex gap-2 flex-wrap justify-end">
                {necessidades
                  .filter((n): n is string => typeof n === 'string' && n.trim() !== '')
                  .slice(0, 3)
                  .map((necessidade, index) => (
                    <span 
                      key={`${String(necessidade)}-${index}`} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground whitespace-nowrap hover:bg-secondary/80 transition-colors"
                    >
                      {String(necessidade)}
                    </span>
                  ))}
                {necessidades.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-muted bg-transparent text-muted-foreground">
                    +{necessidades.length - 3}
                  </span>
                )}
              </div>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-muted bg-transparent text-muted-foreground">
                Sem itens
              </span>
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
            <a 
              href={site.startsWith('http') ? site : `https://${site}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Visitar site <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
