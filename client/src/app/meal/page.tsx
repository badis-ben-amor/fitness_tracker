"use client";
import NotAuthUser from "@/components/notAuth/notAuthUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createMealThunk,
  deleteMealThunk,
  getAllMealsThunk,
  updateMealThunk,
} from "@/redux/slices/mealSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { MealType } from "@/types/mealType";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Meal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { meals: mealsdata, accessToken } = useSelector(
    (state: RootState) => state.meal
  );
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState<MealType | null>(null);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [mealCreated, setMealCreated] = useState<MealType>({
    id: "",
    meal_name: "",
    calories: 0,
    carbs: 0,
    fats: 0,
    protein: 0,
  });
  // delete
  const [isOpen, setIsOpen] = useState(false);
  const [deletedMeal, setDeletedMeal] = useState<{
    meal_name: string;
    mealId: string;
  }>({
    meal_name: "",
    mealId: "",
  });

  useEffect(() => {
    dispatch(getAllMealsThunk(accessToken));
  }, []);

  useEffect(() => {
    setMeals(mealsdata);
  }, [mealsdata]);

  function handleOpenDialog(meal?: MealType) {
    setEditingMeal(meal || null);
    setIsOpen(true);
  }

  function handleCloseDIalog() {
    setIsOpen(false);
    setEditingMeal(null);
    setMealCreated({
      id: "",
      meal_name: "",
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingMeal) {
      setEditingMeal({ ...editingMeal, [e.target.name]: e.target.value });
    } else {
      setMealCreated({ ...mealCreated, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit() {
    const mealData = editingMeal ? editingMeal : mealCreated;

    const convertedMealData = {
      ...mealData,
      calories: Number(mealData.calories),
      carbs: Number(mealData.carbs),
      fats: Number(mealData.fats),
      protein: Number(mealData.protein),
    };
    if (editingMeal) {
      dispatch(
        updateMealThunk({
          accessToken,
          mealId: editingMeal.id,
          mealData: convertedMealData,
        })
      ).then(() => dispatch(getAllMealsThunk(accessToken)));
    } else {
      dispatch(
        createMealThunk({ accessToken, mealData: convertedMealData })
      ).then(() => dispatch(getAllMealsThunk(accessToken)));
    }
    handleCloseDIalog();
  }

  function handleOpenConfirmDialog(meal_name: string, mealId: string) {
    setDeletedMeal({ meal_name, mealId });
    setConfirmIsOpen(true);
  }

  function handleDeleteMeal(mealId: string) {
    dispatch(deleteMealThunk({ accessToken, mealId })).then(() =>
      dispatch(getAllMealsThunk(accessToken))
    );
    setConfirmIsOpen(false);
  }

  if (!user?.id) return <NotAuthUser />;

  return (
    <div className="p-4">
      <Button
        onClick={() => handleOpenDialog()}
        className="top-15 sticky mb-4 bg-sky-200 text-dark hover:bg-sky-300 text-dark"
      >
        Add New Meal
        <Plus />
      </Button>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 space-x-2 space-y-2">
        {meals?.map((mealInfo: MealType) => (
          <Card key={mealInfo.id}>
            <CardHeader>
              <CardTitle className="text-center">
                {mealInfo.meal_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div>
                <p>Colories : {mealInfo.calories}</p>
                <p>Protein : {mealInfo.protein}</p>
              </div>
              <div>
                <p>Carbs : {mealInfo.carbs}</p>
                <p>Fats : {mealInfo.fats}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                onClick={() => handleOpenDialog(mealInfo)}
                size="sm"
                className="bg-blue-100 text-dark hover:bg-blue-200"
              >
                <Pencil />
              </Button>
              <Button
                onClick={() =>
                  handleOpenConfirmDialog(mealInfo.meal_name, mealInfo.id)
                }
                size="sm"
                className="bg-red-300 text-dark hover:bg-red-500"
              >
                <Trash />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={handleCloseDIalog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMeal ? "Edite Meal" : "Add New Meal"}
            </DialogTitle>
          </DialogHeader>
          <div>
            <Label className="my-2" htmlFor="meal_name">
              Meal Name
            </Label>
            <Input
              type="text"
              id="meal_name"
              name="meal_name"
              value={
                editingMeal ? editingMeal.meal_name : mealCreated.meal_name
              }
              onChange={handleInputChange}
              placeholder="Enter Your Meal Name"
              required
            />
            <Label className="my-2" htmlFor="calories">
              Colories
            </Label>
            <Input
              type="number"
              id="colories"
              name="calories"
              value={editingMeal ? editingMeal.calories : mealCreated.calories}
              onChange={handleInputChange}
              placeholder="Enter Your Meal Colories"
              required
            />
            <Label className="my-2" htmlFor="protein">
              Protein
            </Label>
            <Input
              type="number"
              id="protein"
              name="protein"
              value={editingMeal ? editingMeal.protein : mealCreated.protein}
              onChange={handleInputChange}
              placeholder="Enter Your Meal Protein"
              required
            />
            <Label className="my-2" htmlFor="carbs">
              Carbs
            </Label>
            <Input
              type="number"
              id="carbs"
              name="carbs"
              value={editingMeal ? editingMeal.carbs : mealCreated.carbs}
              onChange={handleInputChange}
              placeholder="Enter Your Meal Carbs"
              required
            />
            <Label className="my-2" htmlFor="fats">
              Fats
            </Label>
            <Input
              type="number"
              id="fats"
              name="fats"
              value={editingMeal ? editingMeal.fats : mealCreated.fats}
              onChange={handleInputChange}
              placeholder="Enter Your Fats Carbs"
              required
            />
            <Button
              onClick={handleSubmit}
              className={`w-full ${
                editingMeal
                  ? "bg-blue-100 hover:bg-blue-200 text-dark "
                  : "bg-sky-200 text-dark hover:bg-sky-300 text-dark mt-2"
              }`}
            >
              {editingMeal ? "Save" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmIsOpen} onOpenChange={() => setConfirmIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <p>
              Are You Sure To Delete
              <span className="text-red-600 font-bold text-lg">
                {" "}
                {deletedMeal.meal_name}
              </span>{" "}
              Meal
            </p>
            <div className="flex justify-between">
              <Button
                onClick={() => setConfirmIsOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteMeal(deletedMeal.mealId)}
                className="bg-red-300 text-dark hover:bg-red-500"
              >
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meal;
