import mongoose from "mongoose";

// Credit account details (individual accounts)
const accountDetailsSchema = new mongoose.Schema({
  type: String, // e.g., Credit Card, Loan
  bank: String, // Bank name
  address: String, // Holder address
  accountNumber: String, // Account number
  amountOverdue: Number, // Amount overdue
  currentBalance: Number, // Current balance
});

// Summary of the report
const reportSummarySchema = new mongoose.Schema({
  totalAccounts: Number, // Total number of accounts
  activeAccounts: Number, // Active accounts
  closedAccounts: Number, // Closed accounts
  currentBalance: Number, // Total current balance
  securedAmount: Number, // Total secured balance
  unsecuredAmount: Number, // Total unsecured balance
  recentEnquiriesLast7Days: Number, // Last 7 days enquiries
});

// Main credit report schema
const creditReportSchema = new mongoose.Schema(
  {
    name: String, // Applicant Name
    mobilePhone: String, // Mobile
    pan: String, // PAN
    creditScore: Number, // Bureau Score
    summary: reportSummarySchema, // Report summary
    accounts: [accountDetailsSchema], // Array of credit accounts
  },
  { timestamps: true }
);

const CreditReport = mongoose.model("CreditReport", creditReportSchema);

export default CreditReport;
