import React, { useState } from "react";

const ReportOperation = ({ setResults, setLoading, setError, loading }) => {
  const [targetColumn, setTargetColumn] = useState("");

  const handleGenerateReport = async () => {
    setLoading(true);
    setError("");

    try {
      // Create query string for optional target column
      const queryParams = targetColumn ? `?target_column=${targetColumn}` : "";
      
      const response = await fetch(`http://localhost:5000/v1/generate-report${queryParams}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate report");
      }

      const data = await response.json();
      
      if (data.status === "success") {
        setResults(data);
      } else {
        throw new Error(data.message || "Report generation failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-container">
      <button
        className="primary-button"
        onClick={handleGenerateReport}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
};

export default ReportOperation;