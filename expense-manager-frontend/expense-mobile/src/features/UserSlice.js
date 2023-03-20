import axios from "../common/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const signup = createAsyncThunk(
	'users/signup',
	async (signupData, thunkAPI) => {
		try {
			const response = await axios.post("/signup", signupData);
			return {
				user: jwt_decode(response.data.access_token),
				access_token: response.data.access_token,
			};
		} catch (e) {
			if (e.response) {
				return thunkAPI.rejectWithValue(e.response.data);
			} else {
				return thunkAPI.rejectWithValue({ error: "Network error" });
			}
		}
	}
);

export const login = createAsyncThunk(
	'users/login',
	async (loginData, thunkAPI) => {
		try {
			const response = await axios.post("/login", loginData);
			return {
				user: jwt_decode(response.data.access_token),
				access_token: response.data.access_token,
			};
			// return response.data;
		} catch (e) {
			if (e.response) {
				return thunkAPI.rejectWithValue(e.response.data);
			} else {
				return thunkAPI.rejectWithValue({ error: "Network error" });
			}
		}
	}
);

export const updateProfile = createAsyncThunk(
	'users/update',
	async (userData, thunkAPI) => {
		try {
			const response = await axios.put("/users/" + userData.id + "/edit",
				userData);
			if (response.data.success) {
				return userData
			} else {
				return thunkAPI.rejectWithValue(e.response.data);
			}
		} catch (e) {
			if (e.response) {
				return thunkAPI.rejectWithValue(e.response.data);
			} else {
				return thunkAPI.rejectWithValue({ error: "Network error" });
			}
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: null,
		id: null,
		email: null,
		first_name: null,
		last_name: null,
		company_id: null,
		department_id: null,
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
		logout: (state) => {
			state.token = null;
		},
	},
	extraReducers: {
		[signup.fulfilled]: (state, { payload }) => {
			const { user, access_token } = payload
			state.id = user.id;
			state.email = user.email;
			state.first_name = user.first_name;
			state.last_name = user.last_name;
			state.company_id = user.company_id;
			state.department_id = user.department_id;
			state.token = access_token
			state.isFetching = false;
			state.isSuccess = true;
		},
		[signup.pending]: (state) => {
			state.isFetching = true;
		},
		[signup.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.error;
		},
		[login.fulfilled]: (state, { payload }) => {
			const { user, access_token } = payload
			state.id = user.id;
			state.email = user.email;
			state.first_name = user.first_name;
			state.last_name = user.last_name;
			state.company_id = user.company_id;
			state.department_id = user.department_id;
			state.token = access_token
			state.isFetching = false;
			state.isSuccess = true;
		},
		[login.pending]: (state) => {
			state.isFetching = true;
		},
		[login.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.error;
		},
		[updateProfile.fulfilled]: (state, { payload }) => {
			state.first_name = payload.first_name;
			state.last_name = payload.last_name;
			state.isFetching = false;
			state.isSuccess = true;
		},
		[updateProfile.pending]: (state) => {
			state.isFetching = true;
		},
		[updateProfile.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.error;
		},
	},
})

export const { clearState, logout } = userSlice.actions;

export const userSelector = state => state.user
