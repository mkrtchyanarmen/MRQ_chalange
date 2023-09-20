import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SymbolCard from "./SymbolCard";
import { fetchAllStocks, selectors } from "@/store/stocksSlice";

import "./symbolsGrid.css";
import Loading from "@/components/Loading";

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const { loading: isStocksLoading } = useAppSelector(selectors.apiState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {isStocksLoading ? (
        <div className="symbolsGrid_loadingWrapper">
          <Loading />
        </div>
      ) : (
        stockSymbols.map((id, i) => (
          <SymbolCard
            price={prices[id]}
            onClick={onSymbolClick}
            key={i}
            id={id}
          />
        ))
      )}
    </div>
  );
};

export default SymbolsGrid;
