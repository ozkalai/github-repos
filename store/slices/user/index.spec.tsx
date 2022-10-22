import reducer, { UserState, fetchUserData, setUser } from "./index";
import { RootState } from "../../store";
import { IUser } from "./types";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    user: undefined,
    status: "idle",
  });
});

test("should set the user", () => {
  const previousState: UserState = { user: undefined, status: "idle" };

  expect(
    reducer(previousState, setUser({ id: 1, name: "John Doe" } as IUser))
  ).toEqual({
    user: { id: 1, name: "John Doe" },
    status: "idle",
  });
});

test("thunk fetchUserData should fetch user w/mocked dispatch ", async () => {
  const dispatch = jest.fn();
  const state: RootState = {
    user: {
      user: undefined,
      status: "idle",
    } as UserState,
  } as RootState;

  await fetchUserData()(dispatch, () => state, null);

  const { calls } = dispatch.mock;

  expect(calls[0][0].type).toEqual("user/fetchUserData/pending");
  expect(calls[1][0].type).toEqual("user/fetchUserData/fulfilled");
});

test("extra reducers should set the status loading", () => {
  const action = fetchUserData.pending("user/fetchUserData/pending");
  const state: RootState = {
    user: {
      user: undefined,
      status: "idle",
    } as UserState,
  } as RootState;

  expect(reducer(state.user, action)).toEqual({
    user: undefined,
    status: "loading",
  });
});

test("extra reducers should set the status failed", () => {
  const action = fetchUserData.rejected(
    Error("error"),
    "user/fetchUserData/rejected",
    undefined,
    { message: "error" },
    null
  );
  const state: RootState = {
    user: {
      user: undefined,
      status: "idle",
    } as UserState,
  } as RootState;

  expect(reducer(state.user, action)).toEqual({
    user: undefined,
    status: "failed",
  });
});

test("extra reducers should set the status fulfilled", () => {
  const action = fetchUserData.fulfilled("user/fetchUserData/fulfilled", "");
  const state: RootState = {
    user: {
      user: undefined,
      status: "idle",
    } as UserState,
  } as RootState;

  expect(reducer(state.user, action)).toEqual({
    user: "user/fetchUserData/fulfilled",
    status: "idle",
  });
});
