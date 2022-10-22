import reducer, { setToken, getToken, AuthState } from "./index";
import { RootState } from "../../store";

describe("authSlice", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      token: undefined,
    });
  });

  test("should set the token", () => {
    const previousState: AuthState = { token: undefined };

    expect(reducer(previousState, setToken("thisismytoken"))).toEqual({
      token: "thisismytoken",
    });
  });

  test("should get the token", () => {
    const previousState: AuthState = { token: "thisismytoken" };

    const authState = {
      auth: previousState,
    };

    const token = getToken(authState as RootState);

    expect(token).toEqual("thisismytoken");
  });
});
