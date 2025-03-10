import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Daily Doggie Dish",
  description: "Calculate the perfect portion for your furry friend!"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative min-h-screen bg-dogBlue-light">
          {/* Paw print background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div
              className="h-full w-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M12 6a4 4 0 110 8 4 4 0 010-8zm12 0a4 4 0 110 8 4 4 0 010-8zm-6 12a4 4 0 110 8 4 4 0 010-8zm12 0a4 4 0 110 8 4 4 0 010-8zM6 18a4 4 0 110 8 4 4 0 010-8z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          {/* Main content */}
          <main className="relative z-10">{children}</main>
          {/* Dog silhouette footer */}
          <footer className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path
                fill="#5D3A1A"
                fillOpacity="1"
                d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,181.3C840,171,960,181,1080,181.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </footer>
        </div>
      </body>
    </html>
  )
}