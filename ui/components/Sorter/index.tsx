import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setSort, setOrder } from "../../../store/slices/search";

const Sorter = () => {
  return (
    <div className="sorter">
      <div>
        <label htmlFor="sort">Sort by</label>
      </div>
    </div>
  );
};

export default Sorter;
