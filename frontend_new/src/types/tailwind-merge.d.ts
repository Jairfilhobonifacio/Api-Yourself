declare module 'tailwind-merge' {
  type ClassNameValue = string | number | boolean | undefined | null | { [key: string]: boolean | string | number | undefined | null } | ClassNameValue[]
  
  /**
   * A function to merge Tailwind CSS classes without style conflicts.
   */
  function twMerge(...classes: ClassNameValue[]): string
  
  export = twMerge
  export default twMerge
}
