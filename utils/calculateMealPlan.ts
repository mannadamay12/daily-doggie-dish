interface Pet {
  name: string
  type: string
  breed: string
  weight: number
  age: number
  activityLevel: "low" | "moderate" | "high"
}

interface MealPlan {
  dailyCalories: number
  dailyPortionGrams: number
  meals: Array<{ time: string; portion: number }>
  nutrition: {
    protein: number
    fat: number
    carbs: number
  }
  feedingTips: string[]
}

export function calculateMealPlan(pet: Pet): MealPlan {
  // Base metabolic rate (BMR) calculation
  const bmr = 70 * Math.pow(pet.weight, 0.75)

  // Activity level multiplier
  const activityMultipliers = {
    low: 1.2,
    moderate: 1.4,
    high: 1.6,
  }
  const activityMultiplier = activityMultipliers[pet.activityLevel]

  // Age adjustment
  const ageMultiplier = pet.age < 1 ? 1.8 : pet.age > 7 ? 0.8 : 1.0

  // Pet type adjustment
  const typeMultiplier = pet.type === "cat" ? 0.9 : 1.0

  // Calculate daily calories
  const dailyCalories = bmr * activityMultiplier * ageMultiplier * typeMultiplier

  // Convert calories to grams (assuming average of 4 calories per gram of pet food)
  const dailyPortionGrams = Math.round(dailyCalories / 4)

  // Calculate meal portions (default to 2 meals per day)
  const meals = [
    { time: "Morning", portion: Math.round(dailyPortionGrams * 0.5) },
    { time: "Evening", portion: Math.round(dailyPortionGrams * 0.5) },
  ]

  // Nutrition breakdown (adjust based on pet type and age)
  let nutrition = {
    protein: 30,
    fat: 20,
    carbs: 50,
  }

  if (pet.type === "cat") {
    nutrition = {
      protein: 40,
      fat: 30,
      carbs: 30,
    }
  } else if (pet.age < 1) {
    nutrition = {
      protein: 35,
      fat: 25,
      carbs: 40,
    }
  }

  // Feeding tips
  const feedingTips = [
    "Stick to a consistent feeding schedule",
    "Use a measuring cup or scale for accurate portions",
    "Provide fresh water at all times",
    "Adjust portions based on your pet's weight changes",
    "Consult with your veterinarian for personalized advice",
  ]

  return {
    dailyCalories: Math.round(dailyCalories),
    dailyPortionGrams,
    meals,
    nutrition,
    feedingTips,
  }
}

