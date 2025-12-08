import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface Props {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const [query, setQuery] = useState("");


  const handleAction = (formData: FormData) => {
    const value = formData.get("query")?.toString().trim() || "";

    if (!value) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(value); 
    setQuery("");     
  };

  return (
    <header className={css.header}>
      <form action={handleAction} className={css.form}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}





