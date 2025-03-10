"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { calculateMealPlan } from "@/utils/calculateMealPlan"

interface Pet {
  name: string
  type: string
  breed: string
  weight: number
  age: number
  activityLevel: "low" | "moderate" | "high"
  photo?: string | null
}

export default function Results() {
  const [currentPet, setCurrentPet] = useState<Pet | null>(null)
  const [mealPlan, setMealPlan] = useState<any>(null)

  useEffect(() => {
    try {
      const pets = JSON.parse(localStorage.getItem("pets") || "[]")
      const currentPetIndex = Number.parseInt(localStorage.getItem("currentPetIndex") || "0")

      if (pets[currentPetIndex]) {
        const pet = pets[currentPetIndex]
        setCurrentPet(pet)

        // Only calculate meal plan if we have all required fields
        if (pet.weight && pet.age && pet.activityLevel) {
          const calculatedMealPlan = calculateMealPlan({
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            weight: Number(pet.weight),
            age: Number(pet.age),
            activityLevel: pet.activityLevel,
          })
          setMealPlan(calculatedMealPlan)
        }
      }
    } catch (error) {
      console.error("Error loading pet data:", error)
    }
  }, [])

  if (!currentPet || !mealPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
        <Card className="w-full max-w-4xl bg-white">
          <CardContent className="p-6">
            <p className="text-dogBrown">No meal plan found. Please add a pet first.</p>
            <Link href="/add-pet">
              <Button className="mt-4 bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                Add Pet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
      <main className="w-full max-w-4xl">
        <Alert className="mb-6 bg-dogBlue-light border-dogBlue">
          <InfoIcon className="h-4 w-4 text-dogBlue" />
          <AlertDescription className="text-dogBlue-dark">
            This meal plan is for informational purposes only. Please consult with your veterinarian before making any
            significant changes to your pet's diet.
          </AlertDescription>
        </Alert>

        <h1 className="text-4xl font-bold mb-6 text-center text-dogBrown-dark">{currentPet.name}'s Meal Plan</h1>

        <Card className="mb-8 bg-white border-dogBrown">
          <CardHeader className="bg-dogBrown-light">
            <CardTitle className="text-white">Pet Profile</CardTitle>
            <CardDescription className="text-dogBlue-light">Information used for calculation</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-dogBrown">Type</dt>
                <dd className="capitalize">{currentPet.type || "Not specified"}</dd>
              </div>
              <div>
                <dt className="font-medium text-dogBrown">Breed</dt>
                <dd>{currentPet.breed || "Not specified"}</dd>
              </div>
              <div>
                <dt className="font-medium text-dogBrown">Weight</dt>
                <dd>{currentPet.weight} kg</dd>
              </div>
              <div>
                <dt className="font-medium text-dogBrown">Age</dt>
                <dd>{currentPet.age} years</dd>
              </div>
              <div>
                <dt className="font-medium text-dogBrown">Activity Level</dt>
                <dd className="capitalize">{currentPet.activityLevel || "Not specified"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white border-dogBrown">
          <CardHeader className="bg-dogBrown-light">
            <CardTitle className="text-white">Daily Recommended Portion</CardTitle>
            <CardDescription className="text-dogBlue-light">
              Based on calculated needs of {mealPlan.dailyCalories} calories per day
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-semibold mb-4 text-dogBrown">{mealPlan.dailyPortionGrams}g per day</p>
            <h3 className="text-xl font-semibold mb-2 text-dogBrown-dark">Suggested Meal Times:</h3>
            <ul className="list-disc list-inside mb-4 text-dogBrown">
              {mealPlan.meals.map((meal: any, index: number) => (
                <li key={index}>
                  {meal.time}: {meal.portion}g
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2 text-dogBrown-dark">Nutritional Breakdown:</h3>
            <ul className="list-disc list-inside mb-4 text-dogBrown">
              <li>Protein: {mealPlan.nutrition.protein}%</li>
              <li>Fat: {mealPlan.nutrition.fat}%</li>
              <li>Carbohydrates: {mealPlan.nutrition.carbs}%</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/dashboard">
            <Button className="bg-dogBlue hover:bg-dogBlue-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/nutrition-flow">
            <Button className="bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              View Nutrition Flow
            </Button>
          </Link>
          <Link href="/health-checklist">
            <Button className="bg-dogBrown-light hover:bg-dogBrown text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Health Checklist
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

