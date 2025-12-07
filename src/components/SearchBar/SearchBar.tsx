import type { FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface Props {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.query.value.trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a className={css.link} href="https://www.themoviedb.org/" target="_blank">
          Powered by TMDB
        </a>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
          />
          <button className={css.button} type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}