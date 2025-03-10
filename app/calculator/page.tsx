"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { calculateMealPlan } from "@/utils/calculateMealPlan"

const schema = yup.object().shape({
  name: yup.string().required("Pet's name is required"),
  type: yup.string().oneOf(["dog", "cat"], "Please select a pet type").required("Pet type is required"),
  breed: yup.string().required("Breed is required"),
  weight: yup
    .number()
    .positive("Weight must be positive")
    .max(100, "Weight must be less than 100kg")
    .required("Weight is required"),
  age: yup
    .number()
    .positive("Age must be positive")
    .max(30, "Age must be less than 30 years")
    .required("Age is required"),
  activityLevel: yup
    .string()
    .oneOf(["low", "moderate", "high"], "Please select an activity level")
    .required("Activity level is required"),
})

type FormData = yup.InferType<typeof schema>

export default function Calculator() {
  const router = useRouter()
  const [currentPet, setCurrentPet] = useState<FormData | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const pets = JSON.parse(localStorage.getItem("pets") || "[]")
    const currentPetIndex = Number.parseInt(localStorage.getItem("currentPetIndex") || "0")
    if (pets[currentPetIndex]) {
      const pet = pets[currentPetIndex]
      setCurrentPet(pet)
      reset(pet) // This will pre-fill the form with the current pet's data
    }
  }, [reset])

  const onSubmit = (data: FormData) => {
    const mealPlan = calculateMealPlan(data)

    // Update the current pet in localStorage
    const pets = JSON.parse(localStorage.getItem("pets") || "[]")
    const currentPetIndex = Number.parseInt(localStorage.getItem("currentPetIndex") || "0")
    pets[currentPetIndex] = data
    localStorage.setItem("pets", JSON.stringify(pets))

    // Store the meal plan
    localStorage.setItem("currentMealPlan", JSON.stringify(mealPlan))

    router.push("/results")
  }

  if (!currentPet) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dogBlue-light">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20">
        <h1 className="text-4xl font-bold mb-6 text-dogBrown-dark">Update {currentPet.name}'s Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <Label htmlFor="name" className="text-dogBrown">
              Pet's Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="border-dogBrown"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="type" className="text-dogBrown">
              Pet Type
            </Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={`border-dogBrown ${errors.type ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="breed" className="text-dogBrown">
              Breed
            </Label>
            <Input
              id="breed"
              {...register("breed")}
              className="border-dogBrown"
              aria-invalid={errors.breed ? "true" : "false"}
            />
            {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="weight" className="text-dogBrown">
              Weight (in kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              {...register("weight")}
              className="border-dogBrown"
              aria-invalid={errors.weight ? "true" : "false"}
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="age" className="text-dogBrown">
              Age (in years)
            </Label>
            <Input
              id="age"
              type="number"
              step="0.1"
              {...register("age")}
              className="border-dogBrown"
              aria-invalid={errors.age ? "true" : "false"}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="activityLevel" className="text-dogBrown">
              Activity Level
            </Label>
            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={`border-dogBrown ${errors.activityLevel ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.activityLevel && <p className="text-red-500 text-sm mt-1">{errors.activityLevel.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-dogBrown hover:bg-dogBrown-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Update and Calculate Meal Plan
          </Button>
        </form>
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please correct the errors in the form before submitting.</AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  )
}

