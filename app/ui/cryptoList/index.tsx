import Table from "@/app/ui/table";
import { Suspense } from "react";
import { Column } from "@/app/ui/table/types";
import { Data } from "@/app/lib/api/global";

export const CurrencyTypes = ["USD", "EUR", "JPY"] as const;

const ColumnsHeaders: Column<Partial<Data>>[] = [
  { header: "Symbol", accessor: "symbol" },
  { header: "Name", accessor: "name" },
  { header: "CurrentPrice", accessor: "currentPrice" },
  { header: "Change 24h", accessor: "priceChangePercentage_24h" },
  { header: "Total Supply", accessor: "totalSupply" },
];

export default function CryptoList() {
  return (
    <div className="w-full h-[500px] overflow-auto mt-44 no-scrollbar">
      <Suspense>
        <Table columns={ColumnsHeaders} data={[]} />
      </Suspense>
    </div>
  );
}
