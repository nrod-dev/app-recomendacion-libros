import { BookCard } from "@/components/book-card"
import { getFeaturedBooks } from "@/lib/api"

export async function FeaturedBooks() {
  const books = await getFeaturedBooks()

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Libros Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
