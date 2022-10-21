import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IRepositories } from "./types";
import axios from "axios";

interface SearchState {
  repositories: IRepositories | undefined;
  page: number;
  perPage: 10 | 20 | 50 | 100;
  order: "desc" | "asc";
  sort: "stars" | "forks" | "updated" | null;
  selectedLanguage: string;
  searchValue: string;
  status: "loading" | "failed" | "idle";
}

const initialState: SearchState = {
  page: 1,
  perPage: 20,
  order: "desc",
  sort: null,
  repositories: undefined,
  status: "idle",
  selectedLanguage: "javascript",
  searchValue: "",
};

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (userId, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const q = `in:name in:description in:topics in:readme  language:${state.search.selectedLanguage} ${state.search.searchValue}`;
    const { data } = await axios.get(`search/repositories`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
      params: {
        q,
        page: state.search.page,
        per_page: state.search.perPage,
        order: state.search.order,
        sort: state.search.sort && state.search.sort,
      },
    });
    return data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      console.log(action.payload);
      state.selectedLanguage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.repositories = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchRepositories.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {
  setLanguage,
  setSearchValue,
  setPage,
  setPerPage,
  setOrder,
  setSort,
} = searchSlice.actions;

export const getToken = (state: RootState) => state.auth.token;

export default searchSlice.reducer;
