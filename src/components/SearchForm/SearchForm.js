import { useState } from "react";

import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";

import s from "./SearchForm.module.css";

function SearchForm({ onSubmit }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      toast.warn("Enter correct value");
      return;
    }

    onSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        value={searchValue}
        onChange={handleChange}
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
      <button type="submit" className={s.button}>
        <span className={s.label}>Search</span>
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
