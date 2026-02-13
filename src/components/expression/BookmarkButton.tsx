"use client"

import { useState, type FC } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  bookmarked?: boolean
  size?: "sm" | "default"
}

const BookmarkButton: FC<BookmarkButtonProps> = ({
  bookmarked: initialBookmarked = false,
  size = "default",
}) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setBookmarked(!bookmarked)}
      className={cn(
        "relative z-10 rounded-full transition-colors",
        bookmarked && "text-primary hover:text-primary",
      )}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        className={cn(
          size === "sm" ? "h-4 w-4" : "h-5 w-5",
          bookmarked && "fill-current",
        )}
      />
    </Button>
  )
}

export default BookmarkButton
