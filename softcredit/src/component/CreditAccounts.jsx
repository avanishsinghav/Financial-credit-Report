import React from "react";

export default function CreditAccounts({ accounts }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-5">
      <h2 className="text-lg font-semibold mb-4">
        Credit Accounts Information
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Bank</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Account No.</th>
              <th className="p-2 text-left">Amount Overdue</th>
              <th className="p-2 text-left">Current Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.length ? (
              accounts.map((acc, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{acc.type}</td>
                  <td className="p-2">{acc.bank}</td>
                  <td className="p-2">{acc.address}</td>
                  <td className="p-2">{acc.accountNumber}</td>
                  <td className="p-2">₹{acc.amountOverdue ?? "-"}</td>
                  <td className="p-2">₹{acc.currentBalance ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-3 text-gray-500">
                  No account data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
