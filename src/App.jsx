import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";

export default function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isError && setIsError(false);
  }, [search]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      isError && setIsError(false);
      setIsLoading(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}`,
      );
      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error(jsonData.detail || "Error fetching data");
      }
      setData(jsonData);
    } catch (error) {
      setIsError(true);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"
        />
        <button onClick={handleClick}>Buscar</button>
      </div>
      {isLoading && <p>Cargando...</p>}
      {isError && (
        <p>
          No se encontró el pokemon <strong>{search}</strong>
        </p>
      )}
      {data && !isLoading && !isError && <Card info={data} />}
    </div>
  );
}
