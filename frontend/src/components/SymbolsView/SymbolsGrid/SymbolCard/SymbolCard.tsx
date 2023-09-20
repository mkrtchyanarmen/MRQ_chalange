import { FC, useCallback } from "react";

import { useAppSelector } from "@/hooks/redux";

import SymbolCardHeader from "./SymbolCardHeader";
import SymbolCardBaseInfo from "./SymbolCardBaseInfo";

import { roundNumber } from "./utils";

import "./symbolCard.css";

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard: FC<SymbolCardProps> = ({ id, onClick, price }) => {
  const {
    trend,
    industry,
    companyName: name,
    marketCap,
  } = useAppSelector((state) => state.stocks.entities[id]);
  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <div onClick={handleOnClick} className="symbolCard">
      <SymbolCardHeader {...{ id, trend }} />
      <ul className="symbolCard__info">
        <li className="symbolCard__info__item">
          <p>Price:</p>
          <p className="symbolCard__info__item_price">
            {price ? `$ ${roundNumber(price, 1)}` : "--"}
          </p>
        </li>
        <SymbolCardBaseInfo {...{ name, industry, marketCap }} />
      </ul>
    </div>
  );
};
export default SymbolCard;
