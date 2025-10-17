import { parseStringPromise } from "xml2js";

export const parseCreditXML = async (xmlData) => {
  try {
    const result = await parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
      trim: true,
    });

    const response = result.INProfileResponse;
    const applicant =
      response.Current_Application?.Current_Application_Details
        ?.Current_Applicant_Details || {};

    let pan = "N/A";
    const accounts = response.CAIS_Account?.CAIS_Account_DETAILS || [];
    const accountsList = Array.isArray(accounts) ? accounts : [accounts];

    for (const acc of accountsList) {
      const holder = acc.CAIS_Holder_Details;
      if (holder && holder?.Income_TAX_PAN) {
        pan = holder.Income_TAX_PAN;
      }

      if (pan !== "N/A") break;
    }

    const accountArray = accountsList.map((acc) => {
      const history = acc.CAIS_Account_History || [];
      const histories = Array.isArray(history) ? history : [history];

      return {
        type: acc.Portfolio_Type || acc.Account_Type || null,
        bank: acc.Subscriber_Name || null,
        address:
          acc.CAIS_Holder_Address_Details
            ?.First_Line_Of_Address_non_normalized || null,
        accountNumber: acc.Account_Number || null,
        amountOverdue: Number(acc.Amount_Past_Due) || 0,
        currentBalance: Number(acc.Current_Balance) || 0,
        accountHistory: histories.map((h) => ({
          year: h.Year || null,
          month: h.Month || null,
          daysPastDue: h.Days_Past_Due || null,
          assetClassification: h.Asset_Classification || null,
        })),
      };
    });
    const summary = response.CAIS_Account?.CAIS_Summary || {};

    return {
      name:
        `${applicant.First_Name || ""} ${applicant.Last_Name || ""}`.trim() ||
        "Unnamed",
      mobilePhone: applicant.MobilePhoneNumber || null,
      pan: pan,
      creditScore: Number(response.SCORE?.BureauScore) || null,
      summary: {
        totalAccounts: Number(summary.Credit_Account?.CreditAccountTotal) || 0,
        activeAccounts:
          Number(summary.Credit_Account?.CreditAccountActive) || 0,
        closedAccounts:
          Number(summary.Credit_Account?.CreditAccountClosed) || 0,
        currentBalance:
          Number(summary.Total_Outstanding_Balance?.Outstanding_Balance_All) ||
          0,
        securedAmount:
          Number(
            summary.Total_Outstanding_Balance?.Outstanding_Balance_Secured
          ) || 0,
        unsecuredAmount:
          Number(
            summary.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured
          ) || 0,
        recentEnquiriesLast7Days:
          Number(summary.TotalCAPS_Summary?.TotalCAPSLast7Days) || 0,
      },
      accounts: accountArray,
    };
  } catch (err) {
    return { error: "Failed to parse XML" };
  }
};
