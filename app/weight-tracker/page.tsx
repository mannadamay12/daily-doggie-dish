"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface WeightEntry {
  date: string
  weight: number
}

interface Pet {
  id: string
  name: string
  weightHistory: WeightEntry[]
}

export default function WeightTracker() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)
  const [newWeight, setNewWeight] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const storedPets = localStorage.getItem("pets")
    if (storedPets) {
      const parsedPets = JSON.parse(storedPets).map((pet: any, index: number) => ({
        id: index.toString(),
        name: pet.name,
        weightHistory: pet.weightHistory || [],
      }))
      setPets(parsedPets)
      if (parsedPets.length > 0) {
        setSelectedPetId(parsedPets[0].id)
      }
    }
  }, [])

  const handleAddWeight = () => {
    if (selectedPetId && newWeight) {
      const updatedPets = pets.map((pet) => {
        if (pet.id === selectedPetId) {
          return {
            ...pet,
            weightHistory: [
              ...pet.weightHistory,
              { date: new Date().toISOString().split("T")[0], weight: Number.parseFloat(newWeight) },
            ],
          }
        }
        return pet
      })
      setPets(updatedPets)
      localStorage.setItem("pets", JSON.stringify(updatedPets))
      setNewWeight("")
    }
  }

  const selectedPet = pets.find((pet) => pet.id === selectedPetId)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-dogBlue-light">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-dogBrown-dark">Weight Tracker</h1>
        <Card className="mb-8 bg-white border-dogBrown">
          <CardHeader className="bg-dogBrown-light">
            <CardTitle className="text-white">Track Your Pet's Weight</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Label htmlFor="pet-select" className="text-dogBrown">
                Select Pet
              </Label>
              <Select onValueChange={setSelectedPetId} value={selectedPetId || undefined}>
                <SelectTrigger id="pet-select">
                  <SelectValue placeholder="Choose a pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="weight-input" className="text-dogBrown">
                New Weight (kg)
              </Label>
              <Input
                id="weight-input"
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>
            <Button onClick={handleAddWeight} className="w-full bg-dogBrown hover:bg-dogBrown-dark text-white">
              Add Weight Entry
            </Button>
          </CardContent>
        </Card>

        {selectedPet && selectedPet.weightHistory.length > 0 && (
          <Card className="mb-8 bg-white border-dogBrown">
            <CardHeader className="bg-dogBrown-light">
              <CardTitle className="text-white">{selectedPet.name}'s Weight History</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedPet.weightHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")} className="bg-dogBlue hover:bg-dogBlue-dark text-white">
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  )
}

