# 🧾 Financial Credit Report

This project uploads and parses Experian credit report XML files, extracts applicant and account details, and displays them neatly in a React frontend.
It uses Node.js (Express) for the backend, MongoDB for storage, and React for the UI.

# 🚀 Features

. Upload and parse XML credit report files.

. Automatically extract:

     .Applicant details (Name, Mobile, PAN, Credit Score)
     .Report summary (Total/Active/Closed Accounts, Balances)
     .Credit account details (Banks, Account Numbers, Balances)

.View all saved reports in a list.

.Click a report to view detailed data.

# 🧩 Tech Stack

**Frontend**: React, TailwindCSS, Axios

**Backend**: Node.js, Express.js, xml2js, Mongoose

**Database**: MongoDB

🧪 Testing

Upload a valid XML credit report file.

Confirm extracted details appear correctly:

    Name, PAN, Mobile, Credit Score

    Report Summary

    Credit Accounts

## 🧾 Folder Structure

```
project-root/
│
├── softcredit/ # React Frontend
│ ├── src/
│ │ ├── component/
│ │ │ ├── BasicDetails.js
│ │ │ ├── ReportSummary.js
│ │ │ └── CreditAccounts.js
│ │ ├── App.js
│ │ └── api.js
│ └── package.json
│
├── server/ # Node.js Backend
│ ├── controllers/
│ │ ├── reportController.js # Handles fetching reports
│ │ └── uploadController.js # Handles XML file upload
│ │
│ ├── models/
│ │ └── CreditReport.js # Mongoose model for reports
│ │
│ ├── routes/
│ │ ├── reportRoutes.js # Routes for fetching reports
│ │ └── uploadRoutes.js # Routes for file upload
│ │
│ ├── utils/
│ │ └── parseCreditXML.js # Parse XML into JSON
│ │
│ ├── App.js # Main Express server
│ └── package.json
│
└── README.md # Project documentation
```

# 💡 Notes

Ensure MongoDB is running before starting the backend.

env files should never be committed to GitHub.

XML files must follow the Experian structure (INProfileResponse root).
