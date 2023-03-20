import axios from "../common/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllExpense = createAsyncThunk(
	'expense/getAllExpense',
	async (_, thunkAPI) => {
		try {
			const response = await axios.post("/me/expenses");
			return response.data;
		} catch (e) {
			if (e.response?.data?.error) {
				return thunkAPI.rejectWithValue(e.response.data.error);
      } else if (e.response?.data?.msg) {
				return thunkAPI.rejectWithValue(e.response.data.msg);
			} else {
				return thunkAPI.rejectWithValue("Network error");
			}
		}
	}
);

export const addExpense = createAsyncThunk(
	'expense/addExpense',
	async (expense, thunkAPI) => {
		try {
			const response = await axios.post("/expense/add", expense);
      return { ...response.data.expense };
		} catch (e) {
			if (e.response?.data?.error) {
				return thunkAPI.rejectWithValue(e.response.data.error);
      } else if (e.response?.data?.msg) {
				return thunkAPI.rejectWithValue(e.response.data.msg);
			} else {
				return thunkAPI.rejectWithValue("Network error");
			}
		}
	}
);

export const saveExpense = createAsyncThunk(
	'expense/saveExpense',
	async (expense, thunkAPI) => {
		try {
			const response = await axios.put("/expense/" + expense.id + "/update",
        expense);
      return { ...response.data.expense };
		} catch (e) {
			if (e.response?.data?.error) {
				return thunkAPI.rejectWithValue(e.response.data.error);
      } else if (e.response?.data?.msg) {
				return thunkAPI.rejectWithValue(e.response.data.msg);
			} else {
				return thunkAPI.rejectWithValue("Network error" );
			}
		}
	}
);

export const submitExpense = createAsyncThunk(
	'expense/submitExpense',
	async (expenseId, thunkAPI) => {
		try {
			const response = await axios.post("/expense/" + expenseId + "/submit");
      return { id: expenseId };
		} catch (e) {
			if (e.response?.data?.error) {
				return thunkAPI.rejectWithValue(e.response.data.error);
      } else if (e.response?.data?.msg) {
				return thunkAPI.rejectWithValue(e.response.data.msg);
			} else {
				return thunkAPI.rejectWithValue("Network error" );
			}
		}
	}
);

export const getAllCategories = createAsyncThunk(
	'expense/getAllCategories',
	async (expenseId, thunkAPI) => {
		try {
			const response = await axios.post("/expense/category/all");
      const categories = response.data.map(
        (c) => { return {
          label: c.name, value: c.id
        }}
      );
      return categories;
		} catch (e) {
			if (e.response?.data?.error) {
				return thunkAPI.rejectWithValue(e.response.data.error);
      } else if (e.response?.data?.msg) {
				return thunkAPI.rejectWithValue(e.response.data.msg);
			} else {
        console.log(e);
				return thunkAPI.rejectWithValue("Network error" );
			}
		}
	}
);

export const expenseSlice = createSlice({
	name: "expense",
	initialState: {
    expenses: [],
    categories: [],
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
	},
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
		},
	},
	extraReducers: {
		[getAllExpense.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.expenses = payload;
			state.isFetching = false;
			state.isSuccess = true;
		},
		[getAllExpense.pending]: (state) => {
			state.isFetching = true;
		},
		[getAllExpense.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
		[addExpense.fulfilled]: (state, { payload }) => {
      state.expenses.unshift(payload);
			state.isFetching = false;
			state.isSuccess = true;
		},
		[addExpense.pending]: (state) => {
			state.isFetching = true;
		},
		[addExpense.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
		[saveExpense.fulfilled]: (state, { payload }) => {
      const expenses = state.expenses.map(
        (e) => e.id == payload.id
          ? { ...payload }
          : e
      );
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        expenses,
      }
		},
		[saveExpense.pending]: (state) => {
			state.isFetching = true;
		},
		[saveExpense.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
		[submitExpense.fulfilled]: (state, { payload }) => {
      const expenses = state.expenses.map(
        (e) => e.id == payload.id
          ? { ...e, status: "Submitted" }
          : e
      );
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        expenses,
      }
		},
		[submitExpense.pending]: (state) => {
			state.isFetching = true;
		},
		[submitExpense.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
		[getAllCategories.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.categories = payload;
			state.isFetching = false;
		},
		[getAllCategories.pending]: (state) => {
			state.isFetching = true;
		},
		[getAllCategories.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
	},
})

export const { clearState } = expenseSlice.actions;

export const expenseSelector = state => state.expense
