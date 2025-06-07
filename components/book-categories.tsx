import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Ficción", count: 1250, color: "bg-blue-500" },
  { name: "Romance", count: 890, color: "bg-pink-500" },
  { name: "Misterio", count: 670, color: "bg-purple-500" },
  { name: "Ciencia Ficción", count: 540, color: "bg-green-500" },
  { name: "Biografía", count: 430, color: "bg-orange-500" },
  { name: "Historia", count: 380, color: "bg-red-500" },
  { name: "Autoayuda", count: 320, color: "bg-yellow-500" },
  { name: "Fantasía", count: 290, color: "bg-indigo-500" },
]

export function BookCategories() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Explorar por Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} libros</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
