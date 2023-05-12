import React from "react";
import styled from "styled-components";
import { MealItem } from "./mealItem/MealItem";
import { fetchRequest } from "../feth/fetshApi";
import { useState } from "react";
import { useEffect } from "react";

export const Meals = React.memo(() => {
  const [meals, setMeals] = useState();

  async function getFoods() {
    try {
      const response = await fetchRequest(`/foods`);
      setMeals(response);
    } catch (error) {
      new Error(error);
    }
  }
  useEffect(() => {
    getFoods();
  }, []);
  return (
    <ConstainerSecondMeals>
      {meals?.map((meal) => {
        return (
          <MealsItem key={meal._id}>
            <MealItem meal={meal} />
          </MealsItem>
        );
      })}
    </ConstainerSecondMeals>
  );
});

const ConstainerSecondMeals = styled.div`
  width: 85%;
  height: 564px;
  background: #ffffff;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 230px;
`;
const MealsItem = styled.div`
  width: 100%;
  padding: 28px 40px;
`;
