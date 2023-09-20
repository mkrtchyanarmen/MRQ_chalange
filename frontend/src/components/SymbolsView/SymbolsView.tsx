import { useState } from "react";
import "./symbolsView.css";
import SymbolsGrid from "./SymbolsGrid";
import PriceChart from "./PriceChart";

const SymbolsView = () => {
  const [activeSymbol, setActiveSymbol] = useState<null | string>(null);
  const handleSymbolClick = (symbolId: string) => {
    setActiveSymbol((s) => (s === symbolId ? null : symbolId));
  };

  return (
    <div>
      <div className="symbolsView">
        <div className="symbolsView__cards">
          <SymbolsGrid
            onSymbolClick={handleSymbolClick}
            activeSymbol={activeSymbol}
          />
        </div>
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
