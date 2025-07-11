/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Adiciona suporte para módulos CSS
// Permite a importação de arquivos CSS em componentes TypeScript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Adiciona suporte para módulos SCSS
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Adiciona suporte para importação de imagens
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

// Adiciona suporte para variáveis de ambiente
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    // Adicione outras variáveis de ambiente aqui, se necessário
  }
}
