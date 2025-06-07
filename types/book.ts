export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverImage?: string
  rating: number
  reviewCount: number
  genres: string[]
  pages: number
  publisher: string
  publishDate: string
  isbn: string
  language: string
  format: string
  readingStatus?: "want-to-read" | "reading" | "read"
}

export interface Review {
  id: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  comment: string
  date: string
  helpful: boolean
  bookId: string
}

export interface UserBook {
  bookId: string
  status: "want-to-read" | "reading" | "read"
  rating?: number
  review?: string
  dateAdded: string
  dateRead?: string
}

export interface SearchFilters {
  genre?: string
  author?: string
  rating?: string
  readingStatus?: string
}
