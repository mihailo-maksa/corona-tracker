import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const fetchedCountries = await fetchCountries();

      setCountries(fetchedCountries);
    };

    fetchAPI();
  }, [setCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=''
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value=''>Global</option>
        {countries.map(({ name }, index) => (
          <option value={name} key={index}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
