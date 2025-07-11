import * as React from "react"
import { VariantProps } from "class-variance-authority"

declare const badgeVariants: (
  props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined
  } & import("class-variance-authority/dist/types").ClassProp) | undefined
) => string

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export declare const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLDivElement>
>

export { badgeVariants }
