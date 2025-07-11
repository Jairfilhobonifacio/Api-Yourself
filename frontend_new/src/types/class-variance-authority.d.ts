declare module 'class-variance-authority' {
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | string | number | undefined | null } | ClassValue[]
  
  export type ClassProp = {
    class?: ClassValue
    className?: ClassValue
  }
  
  export type ClassPropKey = keyof ClassProp
  
  export type ClassPropValue = ClassProp[ClassPropKey]
  
  export type VariantProps<T> = T extends (props: infer P) => string ? P : never
  
  export function cva<T extends (...args: unknown[]) => string>(
    base: string,
    config?: {
      variants?: {
        [key: string]: {
          [key: string]: string
        }
      }
      defaultVariants?: {
        [key: string]: string
      }
      compoundVariants?: {
        [key: string]: string[]
      }[]
    }
  ): T
  
  export function cx(...args: ClassValue[]): string
}
