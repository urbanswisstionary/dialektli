import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Empty
// ---------------------------------------------------------------------------

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center gap-4 py-12 text-center",
      className,
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

// ---------------------------------------------------------------------------
// EmptyHeader
// ---------------------------------------------------------------------------

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center gap-2", className)}
    {...props}
  />
))
EmptyHeader.displayName = "EmptyHeader"

// ---------------------------------------------------------------------------
// EmptyMedia
// ---------------------------------------------------------------------------

const emptyMediaVariants = cva(
  "flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        icon: "rounded-full bg-muted p-3 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface EmptyMediaProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyMediaVariants> {}

const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  ),
)
EmptyMedia.displayName = "EmptyMedia"

// ---------------------------------------------------------------------------
// EmptyTitle
// ---------------------------------------------------------------------------

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold text-foreground", className)}
    {...props}
  >
    {children}
  </h3>
))
EmptyTitle.displayName = "EmptyTitle"

// ---------------------------------------------------------------------------
// EmptyDescription
// ---------------------------------------------------------------------------

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("max-w-xs text-sm text-muted-foreground", className)}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

// ---------------------------------------------------------------------------
// EmptyContent
// ---------------------------------------------------------------------------

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center gap-2", className)}
    {...props}
  />
))
EmptyContent.displayName = "EmptyContent"

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
}
