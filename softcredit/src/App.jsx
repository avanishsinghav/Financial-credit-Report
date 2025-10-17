import React, { useState, useEffect } from "react";
import api from "./api";
import BasicDetails from "./component/BasicDetails";
import ReportSummary from "./component/ReportSummary";
import CreditAccounts from "./component/CreditAccounts";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function App() {
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetching data for reportSummary
  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data);
      toast.success("Reports fetched Successfully!");
    } catch (err) {
      // console.error(err);
      toast.error("Failed to fetch reports. Please Try Again");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // File upload handler
  const uploadFile = async () => {
    if (!file) return toast.warn("Select an XML file first");
    const form = new FormData();
    form.append("file", file);

    setLoading(true);
    try {
      await api.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchReports();
      toast.success("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Toggle open/close report details
  const toggleReport = (report) => {
    if (selected?._id === report._id) {
      setSelected(null);
    } else {
      setSelected(report);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Financial Credit Report
      </h1>

      {/* ✅ Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Upload New Report
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Hidden default file input */}
          <input
            id="fileInput"
            type="file"
            accept=".xml"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          {/* Custom file selector */}
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-full sm:w-auto cursor-pointer border-2 border-dashed border-blue-400 rounded-lg py-3 px-6 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            <FaCloudUploadAlt className="text-xl mr-2" />
            {file ? file.name : "Click to choose XML file"}
          </label>

          {/* Upload button */}
          <button
            onClick={uploadFile}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {file && (
          <p className="text-sm text-gray-500 mt-2">
            Selected file:{" "}
            <span className="font-medium text-gray-700">{file.name}</span>
          </p>
        )}
      </div>

      {/* ✅ List of Reports */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-5">
        <h2 className="text-lg font-semibold mb-3">Saved Reports</h2>
        {reports.length === 0 ? (
          <p className="text-gray-500 text-sm">No reports available</p>
        ) : (
          <ul className="divide-y">
            {reports.map((r) => (
              <li
                key={r._id}
                className={`p-2 rounded mb-1 ${
                  selected?._id === r._id ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {r.name || "Unnamed"} — {r.pan || "PAN N/A"}
                  </span>
                  <button
                    onClick={() => toggleReport(r)}
                    className={`px-3 py-1 rounded text-white font-medium transition ${
                      selected?._id === r._id
                        ? "bg-blue-800 hover:bg-blue-900"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {selected?._id === r._id ? "Close Details" : "Full Details"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Display Selected Report */}
      {selected && (
        <div className="bg-white p-5 rounded-xl shadow-md">
          <BasicDetails data={selected} />
          <ReportSummary summary={selected?.summary} />
          <CreditAccounts accounts={selected?.accounts || []} />
        </div>
      )}
    </div>
  );
}
