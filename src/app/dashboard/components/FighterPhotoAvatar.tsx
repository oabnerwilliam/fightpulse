"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type FighterPhotoAvatarProps = {
  src?: string | null
  alt: string
  className: string
  isLoading?: boolean
}

export function FighterPhotoAvatar({
  src,
  alt,
  className,
  isLoading = false,
}: FighterPhotoAvatarProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  if (isLoading) {
    return <Skeleton className={cn("shrink-0 rounded-full", className)} />
  }

  if (!src) {
    return <Skeleton className={cn("shrink-0 rounded-full", className)} />
  }

  return (
    <div className={cn("relative shrink-0", className)}>
      {!loaded && (
        <Skeleton className="absolute inset-0 size-full rounded-full" />
      )}
      <img
        alt={alt}
        src={src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "size-full rounded-full object-cover",
          !loaded && "opacity-0",
        )}
      />
    </div>
  )
}
