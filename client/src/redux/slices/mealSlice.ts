import { refresh } from "@/service/authService";
import {
  createMeal,
  deleteMeal,
  getAllMeals,
  getOneMeal,
  updateMeal,
} from "@/service/mealService";
import { MealType } from "@/types/mealType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMealsThunk = createAsyncThunk(
  "meal/getAll",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getAllMeals(accessToken);
      return { data: res.data };
    } catch (error: any) {
      if (error.response.status == 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getAllMeals(newAccessToken);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOneMealThunk = createAsyncThunk(
  "meal/getOne",
  async (
    { accessToken, mealId }: { accessToken: string; mealId: string },
    thunkAPI
  ) => {
    try {
      const res = await getOneMeal(accessToken, mealId);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getOneMeal(accessToken, mealId);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createMealThunk = createAsyncThunk(
  "meal/create",
  async (
    {
      accessToken,
      mealData,
    }: {
      accessToken: string;
      mealData: MealType;
    },
    thunkAPI
  ) => {
    try {
      const res = await createMeal(accessToken, mealData);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createMeal(newAccessToken, mealData);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMealThunk = createAsyncThunk(
  "meal/update",
  async (
    {
      accessToken,
      mealId,
      mealData,
    }: {
      accessToken: string;
      mealId: string;
      mealData: MealType;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateMeal(accessToken, mealId, mealData);
      return { accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateMeal(newAccessToken, mealId, mealData);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMealThunk = createAsyncThunk(
  "meal/delete",
  async (
    { accessToken, mealId }: { accessToken: string; mealId: string },
    thunkAPI
  ) => {
    try {
      const res = await deleteMeal(accessToken, mealId);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteMeal(newAccessToken, mealId);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState: {
    isLoading: false,
    meals: [],
    meal: {},
    errors: [],
    accessToken: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllMealsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMealsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals = action.payload.data;
      })
      .addCase(getAllMealsThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(getOneMealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneMealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meal = action.payload;
      })
      .addCase(getOneMealThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(createMealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(createMealThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(updateMealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(updateMealThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(deleteMealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteMealThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export default mealSlice.reducer;
