import debounce from "lodash/debounce";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSearchValue } from "../../../store/slices/search";

const Input: React.FC = () => {
  const { searchValue } = useAppSelector((state) => state.search);
  const [value, setValue] = React.useState(searchValue);
  const dispatch = useAppDispatch();

  const debouncedOnChange = React.useMemo(() => {
    return debounce((nextValue: string) => {
      dispatch(setSearchValue(nextValue));
    }, 500);
  }, [dispatch]);

  React.useEffect(() => {
    debouncedOnChange(value);
  }, [value, debouncedOnChange]);

  return (
    <input
      onChange={(e) => setValue(e.target.value)}
      data-testid="input"
      value={value}
      type="text"
    />
  );
};

export default Input;
