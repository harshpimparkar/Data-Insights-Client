import React from "react";

const OperationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="operation-tabs">
      <button
        className={`tab-button ${activeTab === "insights" ? "active" : ""}`}
        onClick={() => setActiveTab("insights")}
      >
        Generate Insights
      </button>
      <button
        className={`tab-button ${activeTab === "analysis" ? "active" : ""}`}
        onClick={() => setActiveTab("analysis")}
      >
        Data Analysis
      </button>
      <button
        className={`tab-button ${
          activeTab === "visualization" ? "active" : ""
        }`}
        onClick={() => setActiveTab("visualization")}
      >
        Create Visualizations
      </button>
      <button
        className={`tab-button ${activeTab === "report" ? "active" : ""}`}
        onClick={() => setActiveTab("report")}
      >
        Generate Report
      </button>
    </div>
  );
};

export default OperationTabs;