declare module 'clsx' {
  type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | string | number | undefined | null } | ClassValue[]
  
  /**
   * A simple JavaScript utility for conditionally joining classNames together.
   */
  function clsx(...inputs: ClassValue[]): string
  
  export = clsx
  export default clsx
}
