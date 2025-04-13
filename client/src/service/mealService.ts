import { MealType } from "@/types/mealType";
import axios from "axios";

export function createMeal(accessToken: string, mealData: MealType) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/meal`,
    { ...mealData },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}

export function getAllMeals(accessToken: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/meal`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function getOneMeal(accessToken: string, mealId: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/meal`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function updateMeal(
  accessToken: string,
  mealId: string,
  mealData: MealType
) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_KEY}/meal/${mealId}`,
    { ...mealData },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}

export function deleteMeal(accessToken: string, mealId: string) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/meal/${mealId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
