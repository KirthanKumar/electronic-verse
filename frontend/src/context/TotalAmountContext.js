// Create a context to manage the total amount
import React, { createContext, useContext, useState } from "react";

const TotalAmountContext = createContext();

export const TotalAmountProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <TotalAmountContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </TotalAmountContext.Provider>
  );
};

export const useTotalAmount = () => useContext(TotalAmountContext);
