import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setLanguage } from "../../../store/slices/search";
import styles from "./index.module.scss";

type Option = {
  value: string;
  label: string;
};

type RadioGropProps = {
  options: Option[];
};

const LanguageRadioGroup: React.FC<RadioGropProps> = ({ options }) => {
  const { selectedLanguage } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      {options.map((option) => {
        return (
          <div
            className={`${styles.radioGroup} ${
              selectedLanguage === option.value ? styles.selected : ""
            }`}
            key={option.value}
          >
            <label htmlFor={option.value}>
              <input
                className={styles.radio}
                value={option.value}
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                type="radio"
                name="language"
                id={option.value}
                checked={option.value === selectedLanguage}
              />
              <span className={styles.space}></span>
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageRadioGroup;
