import reducer, {
  setLanguage,
  setSearchValue,
  setPage,
  setPerPage,
  setOrder,
  setSort,
  SearchState,
  fetchRepositories,
} from "./index";
const initialSearchState: SearchState = {
  page: 1,
  perPage: 20,
  order: "desc",
  repositories: undefined,
  status: "idle",
  selectedLanguage: "javascript",
  searchValue: "",
} as SearchState;

const mockSearchState: SearchState = {
  page: 2,
  perPage: 50,
  order: "desc",
  repositories: undefined,
  status: "idle",
  selectedLanguage: "javascript",
  searchValue: "ozkalai",
} as SearchState;

describe("searchSlice", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialSearchState);
  });

  describe("reducers", () => {
    test("setLanguage should set the selectedLanguage", () => {
      expect(reducer(mockSearchState, setLanguage("scala"))).toEqual({
        ...mockSearchState,
        selectedLanguage: "scala",
      });
    });

    test("setSearchValue should set the searchValue", () => {
      expect(reducer(mockSearchState, setSearchValue("ozkalai"))).toEqual({
        ...mockSearchState,
        searchValue: "ozkalai",
      });
    });

    test("setPage should set the page", () => {
      expect(reducer(mockSearchState, setPage(2))).toEqual({
        ...mockSearchState,
        page: 2,
      });
    });

    test("setPerPage should set the perPage", () => {
      expect(reducer(mockSearchState, setPerPage(100))).toEqual({
        ...mockSearchState,
        perPage: 100,
      });
    });

    test("setOrder should set the order", () => {
      expect(reducer(mockSearchState, setOrder("asc"))).toEqual({
        ...mockSearchState,
        order: "asc",
      });
    });

    test("setSort should set the sort", () => {
      expect(reducer(mockSearchState, setSort("stars"))).toEqual({
        ...mockSearchState,
        sort: "stars",
      });
    });
  });

  describe("extra reducers", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should set the status loading", () => {
      const action = fetchRepositories.pending(
        "repositories/fetchRepositories/pending"
      );

      expect(reducer(mockSearchState, action)).toEqual({
        ...mockSearchState,
        status: "loading",
      });
    });

    test("should set the status failed", () => {
      const action = fetchRepositories.rejected(
        Error("error"),
        "repositories/fetchRepositories/rejected",
        undefined,
        { message: "error" },
        null
      );

      expect(reducer(mockSearchState, action)).toEqual({
        ...mockSearchState,
        status: "failed",
      });
    });

    test("should set the status fulfilled", () => {
      const action = fetchRepositories.fulfilled(
        "repositories/fetchRepositories/fulfilled",
        ""
      );

      expect(reducer(mockSearchState, action)).toEqual({
        ...mockSearchState,
        repositories: "repositories/fetchRepositories/fulfilled",
        status: "idle",
      });
    });
  });
});
