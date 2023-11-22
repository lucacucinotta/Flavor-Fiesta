import { useState } from "react";
import { useQuery } from "react-query";
import style from "./assets/scss/App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Logo from "./assets/img/logo.svg";
import Recipe from "./components/Recipe";

export default function App() {
  const [name, setName] = useState("");
  const [areRecipesAvailable, setAreRecipesAvailable] = useState(false);

  const API_ID = import.meta.env.VITE_API_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchRecipe = async () => {
    const res = await fetch(
      `https://api.edamam.com/api/recipes/v2/?type=public&q=${name}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    return await res.json();
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: fetchRecipe,
    enabled: false,
    onSuccess: () => setName(""),
  });

  if (isLoading || isFetching) {
    return <div className={style.loading}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={style.error}>
        <p className={style.errorMessage}>Something Gone Wrong!🛑</p>
        <button onClick={() => refetch()} className={style.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={style.homepage}>
      <img src={Logo} className={style.logo} />
      <h1 className={style.title}>Flavor Fiesta</h1>
      <p className={style.subtitle}>
        Enter the name of a recipe and enjoy an irresistible culinary journey!
      </p>
      <form
        className={style.box}
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
          setAreRecipesAvailable(true);
        }}
      >
        <input
          className={style.boxInput}
          type="text"
          placeholder="Search your recipe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <i>
          <FontAwesomeIcon icon={faUtensils} />
        </i>
      </form>
      {areRecipesAvailable &&
        (data.hits.length === 0 ? (
          <div className={style.notFound}>No recipes found!🍽️</div>
        ) : (
          <>
            <div className={style.container}>
              {data.hits.map((item, index) => (
                <Recipe key={index} recipeProp={item.recipe} />
              ))}
            </div>
          </>
        ))}
    </div>
  );
}
