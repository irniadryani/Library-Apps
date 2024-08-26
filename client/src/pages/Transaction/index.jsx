import React, { useState } from "react";
import { getAllTransactionFn } from "../../api/Transaction/Transaction";
import { useQuery } from "react-query";
import { GrTransaction } from "react-icons/gr";
import InsertModal from "../../components/Transaction/InsertModal";
import TableTransaction from "../../components/Transaction/TableTransaction";
import { IoMdSearch } from "react-icons/io";

export default function index() {
  const [search, setSearch] = useState("");
   // Fetching transaction data with react-query
  const {
    data: dataTransaction,
    refetch: refetchTransaction,
    isLoading: loadingTransaction,
    reset: resetTransaction,
  } = useQuery("allTrasaction", getAllTransactionFn);

  // Function for search borrower name in data transaction
  const filteredTransaction = dataTransaction?.filter((transaction) => {
    const matchingName =
      search === "" ||
      transaction?.borrower_name?.toLowerCase().includes(search.toLowerCase());
    return matchingName;
  });

  return (
    <div>
      <div>
        <p className="m-10 font-bold text-4xl text-start">
          Loan and Return Transactions
        </p>
        <div className="flex items-center gap-2 pl-4 max-w-[200px] my-10 rounded-lg bg-white border border-black hover:border-black focus:border-black  border-solid border-2 shadow-xl">
          <IoMdSearch fontSize="1.125rem" color="#000000" />
          <input
            type="text"
            className="flex h-10 pe-4 pb-1 w-full rounded-lg outline-none text-sm"
            placeholder="Search Transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-end my-5">
          <button
            onClick={() =>
              document.getElementById("insert_transaction_modal").showModal()
            }
            className="btn bg-[#9CA986] text-white shadow-lg"
          >
            <GrTransaction color="white" />
            Add New Loan
          </button>
        </div>
        {!loadingTransaction && (
          <TableTransaction
            refetch={refetchTransaction}
            data={filteredTransaction}
            isLoading={loadingTransaction}
            currentPaginationTable={
              location.state === null || location.state === undefined
                ? null
                : location.state.currentPaginationTable
            }
          />
        )}
      </div>

      <InsertModal refetch={refetchTransaction} />
    </div>
  );
}
