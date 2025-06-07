import { BookDetail } from "@/components/book-detail"
import { RelatedBooks } from "@/components/related-books"
import { BookReviews } from "@/components/book-reviews"

interface BookPageProps {
  params: {
    id: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BookDetail bookId={params.id} />
        <div className="mt-12 space-y-8">
          <RelatedBooks bookId={params.id} />
          <BookReviews bookId={params.id} />
        </div>
      </div>
    </div>
  )
}
