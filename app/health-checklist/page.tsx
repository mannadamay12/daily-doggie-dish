"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HealthItem {
  id: string
  label: string
  checked: boolean
}

interface Pet {
  name: string
  healthItems?: HealthItem[]
}

export default function HealthChecklist() {
  const [currentPet, setCurrentPet] = useState<Pet | null>(null)
  const [healthItems, setHealthItems] = useState<HealthItem[]>([
    { id: "vaccination", label: "Up-to-date on vaccinations", checked: false },
    { id: "deworming", label: "Deworming treatment", checked: false },
    { id: "dental", label: "Dental check-up", checked: false },
    { id: "grooming", label: "Regular grooming", checked: false },
    { id: "exercise", label: "Daily exercise", checked: false },
  ])
  const router = useRouter()

  useEffect(() => {
    const pets = JSON.parse(localStorage.getItem("pets") || "[]")
    const currentPetIndex = Number.parseInt(localStorage.getItem("currentPetIndex") || "0")
    if (pets[currentPetIndex]) {
      const pet = pets[currentPetIndex]
      setCurrentPet(pet)
      if (pet.healthItems) {
        setHealthItems(pet.healthItems)
      }
    } else {
      router.push("/dashboard")
    }
  }, [router])

  const handleCheckboxChange = (id: string) => {
    const updatedItems = healthItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    setHealthItems(updatedItems)

    // Update localStorage
    const pets = JSON.parse(localStorage.getItem("pets") || "[]")
    const currentPetIndex = Number.parseInt(localStorage.getItem("currentPetIndex") || "0")
    if (pets[currentPetIndex]) {
      pets[currentPetIndex].healthItems = updatedItems
      localStorage.setItem("pets", JSON.stringify(pets))
    }
  }

  if (!currentPet) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-dogBrown-dark">{currentPet.name}'s Health Checklist</h1>
        <Card className="bg-white border-dogBrown mb-6">
          <CardHeader className="bg-dogBrown-light">
            <CardTitle className="text-white">Health Items</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {healthItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 mb-2">
                <Checkbox id={item.id} checked={item.checked} onCheckedChange={() => handleCheckboxChange(item.id)} />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/results">
            <Button className="bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Back to Meal Plan
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-dogBlue hover:bg-dogBlue-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

