import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Target, Calendar, Trophy } from "lucide-react"

export function ReadingStats() {
  const stats = {
    booksThisYear: 24,
    yearlyGoal: 30,
    totalBooks: 156,
    averageRating: 4.2,
    readingStreak: 12,
    favoriteMonth: "Octubre",
  }

  const progress = (stats.booksThisYear / stats.yearlyGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Estadísticas de lectura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Meta anual</span>
            <span className="text-sm text-muted-foreground">
              {stats.booksThisYear}/{stats.yearlyGoal}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% completado</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
            </div>
            <p className="font-bold">{stats.totalBooks}</p>
            <p className="text-xs text-muted-foreground">Total leídos</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 mr-1 text-green-500" />
            </div>
            <p className="font-bold">{stats.averageRating}</p>
            <p className="text-xs text-muted-foreground">Calificación promedio</p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Calendar className="h-4 w-4 mr-1 text-orange-500" />
          </div>
          <p className="font-bold">{stats.readingStreak} días</p>
          <p className="text-xs text-muted-foreground">Racha de lectura</p>
        </div>
      </CardContent>
    </Card>
  )
}
