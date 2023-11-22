import style from "../assets/scss/Recipe.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Recipe({ recipeProp }) {
  const [isDietShow, setIsDietShow] = useState(false);
  return (
    <div className={style.recipeCard}>
      <img src={recipeProp.image} className={style.recipeImage} />
      <h1 className={style.recipeLabel}>{recipeProp.label}</h1>
      <p>
        by{" "}
        <a href={recipeProp.url} className={style.recipeSource} target="blank">
          {recipeProp.source}
        </a>
      </p>
      <p className={style.recipeKcal}>{Math.trunc(recipeProp.calories)} kcal</p>
      <ul className={style.recipeIngredients}>
        What do you need :
        {recipeProp.ingredientLines.map((ingredient, index) => (
          <li key={index} className={style.recipeIngredient}>
            {ingredient}
          </li>
        ))}
      </ul>
      <button
        className={style.healthLabelsButton}
        onClick={() => setIsDietShow(true)}
      >
        📋DIET
      </button>
      {isDietShow && (
        <div className={style.healthLabels}>
          <i className={style.close} onClick={() => setIsDietShow(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </i>
          <ul>
            {recipeProp.healthLabels.map((diet, index) => (
              <li key={index}>{diet}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
