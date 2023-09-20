import { ReactComponent as IndustryLogo } from "@/assets/industry.svg";
import { ReactComponent as CompanyIcon } from "@/assets/company.svg";
import { ReactComponent as MarketCapIcon } from "@/assets/market_cap.svg";
import { FC, memo } from "react";
import { shortenNumber } from "./utils";

type SymbolCardBaseInfoProps = {
  name: string;
  industry: string;
  marketCap: number;
};

const SymbolCardBaseInfo: FC<SymbolCardBaseInfoProps> = ({
  name,
  industry,
  marketCap,
}) => {
  return (
    <>
      <li className="symbolCard__info__item">
        <IndustryLogo />
        <p>{industry}</p>
      </li>
      <li className="symbolCard__info__item">
        <CompanyIcon />
        {name}
      </li>
      <li className="symbolCard__info__item">
        <MarketCapIcon />
        {shortenNumber(marketCap)}
      </li>
    </>
  );
};

export default memo(SymbolCardBaseInfo);
