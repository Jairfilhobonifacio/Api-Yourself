// Garantir que o TypeScript reconheça os caminhos do @/
declare module '@/components/*' {
  import { ComponentType, HTMLAttributes } from 'react';
  const component: ComponentType<HTMLAttributes<HTMLElement>>;
  export default component;
}

declare module '@/components/pontos/PontoDoacaoForm' {
  import { ComponentType } from 'react';
  import { PontoDoacao, CriarPontoData, AtualizarPontoData } from '@/types/api';
  
  interface PontoDoacaoFormProps {
    pontoInicial?: PontoDoacao;
    onSubmitAction: (data: CriarPontoData | AtualizarPontoData) => Promise<void>;
    onCancelAction: () => void;
  }
  
  const PontoDoacaoForm: ComponentType<PontoDoacaoFormProps>;
  export default PontoDoacaoForm;
}
