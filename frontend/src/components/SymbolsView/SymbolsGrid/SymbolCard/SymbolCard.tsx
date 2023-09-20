import { FC, useCallback, useEffect, useRef, useState } from "react";

import { useAppSelector } from "@/hooks/redux";

import SymbolCardHeader from "./SymbolCardHeader";
import SymbolCardBaseInfo from "./SymbolCardBaseInfo";

import { roundNumber } from "./utils";
import "./symbolCard.css";

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price?: number;
};

const SymbolCard: FC<SymbolCardProps> = ({ id, onClick, price }) => {
  // Prev price to compare with changed one to see if the progress is positive or negative
  const [prevPrice, setPrevPrice] = useState(price);

  //Card refferance for addind and removing classnames conditionally
  const ref = useRef<HTMLDivElement>(null);

  const {
    trend,
    industry,
    companyName: name,
    marketCap,
  } = useAppSelector((state) => state.stocks.entities[id]);

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    //Shake needs to happen only when the price is changed, when the prevPrice is null no need to shake
    if (prevPrice && price) {
      const shadowClassName =
        prevPrice > price
          ? "symbolCard__negativeShadow"
          : "symbolCard__positiveShadow";
      ref.current?.classList.add("symbolCard__shake", shadowClassName);

      // Remove the className when animation is ended
      timeout = setTimeout(() => {
        ref.current?.classList.remove(
          "symbolCard__shake",
          "symbolCard__negativeShadow",
          "symbolCard__positiveShadow"
        );
      }, 620);
    }
    setPrevPrice(price);

    return () => {
      clearTimeout(timeout);
    };
  }, [price]);

  return (
    <div ref={ref} onClick={handleOnClick} className="symbolCard">
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
