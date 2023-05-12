import React, { useContext } from "react";
import styled from "styled-components";
import { MealItemForm } from "./MealItemForm";
import { cartContext } from "../../../store/cart-context";
import { useCallback } from "react";
export const MealItem = ({ meal }) => {
  const context = useContext(cartContext);

  const addProduct = useCallback(
    (amount) => {
      context.addItem(meal._id, +amount);
    },
    [meal._id,context]
  );
  return (
    <Container>
      <StyledMealItem>
        <h3>{meal.title}</h3>
        <p>{meal.text}</p>
        <span>${meal.price}</span>
      </StyledMealItem>
      <MealItemForm input={meal.id} onAdd={addProduct} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #d6d6d6;
`;

const StyledMealItem = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h4 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
  }
  span {
    font-weight: 700;
    font-size: 20px;
    color: #ad5502;
  }
`;
