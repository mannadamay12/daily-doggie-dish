"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Pet {
  name: string
  type: string
  breed: string
  weight: number
  age: number
  photo: string | null
}

export default function Dashboard() {
  const [pets, setPets] = useState<Pet[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedPets = localStorage.getItem("pets")
    if (storedPets) {
      setPets(JSON.parse(storedPets))
    }
  }, [])

  const handlePetClick = (index: number) => {
    localStorage.setItem("currentPetIndex", index.toString())
    router.push("/results")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-dogBrown-dark">Pet Dashboard</h1>
        {pets.length === 0 ? (
          <Card className="bg-white border-dogBrown mb-6">
            <CardContent className="p-6">
              <p className="text-center text-dogBrown">No pets added yet. Add your first pet!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {pets.map((pet, index) => (
              <Card
                key={index}
                className="bg-white border-dogBrown cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handlePetClick(index)}
              >
                <CardHeader className="bg-dogBrown-light flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    {pet.photo ? (
                      <Image src={pet.photo || "/placeholder.svg"} alt={pet.name} layout="fill" objectFit="cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No photo</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-white">{pet.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-dogBrown">
                    <strong>Type:</strong> {pet.type}
                  </p>
                  <p className="text-dogBrown">
                    <strong>Breed:</strong> {pet.breed}
                  </p>
                  <p className="text-dogBrown">
                    <strong>Weight:</strong> {pet.weight} kg
                  </p>
                  <p className="text-dogBrown">
                    <strong>Age:</strong> {pet.age} years
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <Link href="/add-pet">
            <Button className="bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Add New Pet
            </Button>
          </Link>
          {pets.length > 0 && (
            <>
              <Link href="/results">
                <Button className="bg-dogBlue hover:bg-dogBlue-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  View Meal Plans
                </Button>
              </Link>
              <Link href="/calendar">
                <Button className="bg-dogBrown-light hover:bg-dogBrown text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Feeding Calendar
                </Button>
              </Link>
              <Link href="/weight-tracker">
                <Button className="bg-dogBlue-dark hover:bg-dogBlue text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Weight Tracker
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

