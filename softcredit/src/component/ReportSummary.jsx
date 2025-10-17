import React from "react";

export default function ReportSummary({ summary }) {
  const fmt = (v) =>
    v !== undefined && v !== null ? Number(v).toLocaleString("en-IN") : "-";

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-5">
      <h2 className="text-lg font-semibold mb-4">Report Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <b>Total Accounts:</b> {summary?.totalAccounts ?? "-"}
        </div>
        <div>
          <b>Active Accounts:</b> {summary?.activeAccounts ?? "-"}
        </div>
        <div>
          <b>Closed Accounts:</b> {summary?.closedAccounts ?? "-"}
        </div>
        <div>
          <b>Current Balance:</b> ₹{fmt(summary?.currentBalance)}
        </div>
        <div>
          <b>Secured Amount:</b> ₹{fmt(summary?.securedAmount)}
        </div>
        <div>
          <b>Unsecured Amount:</b> ₹{fmt(summary?.unsecuredAmount)}
        </div>
        <div>
          <b>Recent Enquiries (7 days):</b>{" "}
          {summary?.recentEnquiriesLast7Days ?? "-"}
        </div>
      </div>
    </div>
  );
}
