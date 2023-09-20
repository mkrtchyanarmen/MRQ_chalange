import { FC, memo } from "react";
import DownTrend from "@/assets/down.png";
import UpTrend from "@/assets/up.png";

const trends = {
  UP: UpTrend,
  DOWN: DownTrend,
};
type SymbolCardHeaderProps = { id: string; trend: keyof typeof trends | null };

const SymbolCardHeader: FC<SymbolCardHeaderProps> = ({ id, trend }) => {
  return (
    <div className="symbolCard__header ">
      <p>{id}</p>
      {trend && (
        <img
          className="symbolCard__header__trend"
          src={trends[trend]}
          alt="Trend symbol"
        />
      )}
    </div>
  );
};

export default memo(SymbolCardHeader);
