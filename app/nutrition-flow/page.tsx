"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Meal {
  time: string
  portion: number
}

export default function NutritionFlow() {
  const [dogProfile, setDogProfile] = useState<any>(null)
  const [mealPlan, setMealPlan] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedProfile = localStorage.getItem("dogProfile")
    const storedPlan = localStorage.getItem("mealPlan")
    if (storedProfile && storedPlan) {
      setDogProfile(JSON.parse(storedProfile))
      setMealPlan(JSON.parse(storedPlan))
    } else {
      router.push("/calculator")
    }
  }, [router])

  if (!dogProfile || !mealPlan) {
    return <div>Loading...</div>
  }

  const timeSlots = ["Morning", "Noon", "Evening", "Night"]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-dogBrown-dark">{dogProfile.name}'s Nutrition Flow</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeSlots.map((slot) => {
            const meal = mealPlan.meals.find((m: Meal) => m.time === slot)
            return (
              <Card key={slot} className="bg-white border-dogBrown">
                <CardHeader className="bg-dogBrown-light">
                  <CardTitle className="text-white">{slot}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {meal ? (
                    <p className="text-2xl font-semibold text-dogBrown">{meal.portion}g</p>
                  ) : (
                    <p className="text-xl text-dogBrown-light">No meal scheduled</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/results">
            <Button className="bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Back to Meal Plan
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

