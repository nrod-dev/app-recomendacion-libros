import { BookCard } from "@/components/book-card"
import { getRelatedBooks } from "@/lib/api"

interface RelatedBooksProps {
  bookId: string
}

export async function RelatedBooks({ bookId }: RelatedBooksProps) {
  const books = await getRelatedBooks(bookId)

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Libros relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
