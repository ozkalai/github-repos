import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setLanguage } from "../../../store/slices/search";

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
    <div>
      {options.map((option) => {
        return (
          <div key={option.value}>
            <label htmlFor={option.value}>
              <input
                value={option.value}
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                type="radio"
                name="language"
                id={option.value}
                checked={option.value === selectedLanguage}
              />
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageRadioGroup;
