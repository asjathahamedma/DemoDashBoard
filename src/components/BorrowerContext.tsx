"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type BorrowerContextType = {
  activeBorrowerId: string | null;
  setActiveBorrowerId: (id: string | null) => void;
};

const BorrowerContext = createContext<BorrowerContextType | undefined>(undefined);

export function BorrowerProvider({ children }: { children: ReactNode }) {
  const [activeBorrowerId, setActiveBorrowerId] = useState<string | null>(null);
  return (
    <BorrowerContext.Provider value={{ activeBorrowerId, setActiveBorrowerId }}>
      {children}
    </BorrowerContext.Provider>
  );
}

export function useBorrower() {
  const context = useContext(BorrowerContext);
  if (!context) throw new Error("useBorrower must be used inside BorrowerProvider");
  return context;
}