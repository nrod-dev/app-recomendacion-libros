import { UserProfile } from "@/components/user-profile"
import { UserBooks } from "@/components/user-books"
import { UserReviews } from "@/components/user-reviews"
import { ReadingStats } from "@/components/reading-stats"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfile />
            <div className="mt-6">
              <ReadingStats />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <UserBooks />
            <UserReviews />
          </div>
        </div>
      </div>
    </div>
  )
}
