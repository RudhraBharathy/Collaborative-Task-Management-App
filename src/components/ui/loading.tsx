import { Loader2 } from "lucide-react"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function Loading({ size = "md", text = "Loading...", className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
} 