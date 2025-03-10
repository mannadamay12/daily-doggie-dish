import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dogBlue-light">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-dogBrown-dark mb-4">
          Welcome to <span className="text-dogBlue-dark">Daily Doggie Dish</span>
        </h1>
        <p className="mt-3 text-2xl text-dogBrown">Calculate the perfect portion for your furry friends!</p>
        <div className="mt-6 space-x-4">
          <Link href="/dashboard">
            <Button className="bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/add-pet">
            <Button className="bg-dogBlue hover:bg-dogBlue-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Add New Pet
            </Button>
          </Link>
        </div>
        {/* Add a cute dog illustration */}
        <div className="mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-64 h-64">
            <path
              fill="#8B4513"
              d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm294.56 0c-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34-29.12-6.96-61.15 15.48-71.56 50.13zM256 160c79.41 0 144-64.59 144-144S335.41 0 256 0 112 64.59 112 144s64.59 16 144 16z"
            />
          </svg>
        </div>
      </main>
    </div>
  )
}

