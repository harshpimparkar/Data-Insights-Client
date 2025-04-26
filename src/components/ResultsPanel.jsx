import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaCopy, FaCheck, FaDownload } from "react-icons/fa";

const ResultsPanel = ({ results, type, setActiveViz }) => {
  const [copiedAnalysis, setCopiedAnalysis] = useState(false);
  const [copiedVisualization, setCopiedVisualization] = useState(false);

  if (!results) return null;

  const handleCopyToClipboard = (text, setStateFn) => {
    navigator.clipboard.writeText(text);
    setStateFn(true);
    setTimeout(() => setStateFn(false), 2000);
  };

  const renderVisualizations = () => {
    if (!results?.visualizations) {
      return <p></p>;
    }

    return (
      <div className="visualizations">
        <div className="visualizations-grid">
          {Object.entries(results.visualizations).map(([key, viz]) => (
            <div
              key={key}
              className="visualization-card"
              onClick={() => setActiveViz(viz)}
            >
              <img
                src={`data:${viz.type};base64,${viz.data}`}
                alt={`Visualization ${key}`}
                className="visualization-image"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case "analysis":
        return (
          <div className="analysis-results">
            <h3>Analysis Results</h3>
            <ReactMarkdown>{results.answer}</ReactMarkdown>
            {results.analysis_code && (
              <div className="code-section">
                <div className="code-header">
                  <h4>Analysis Code</h4>
                  <button
                    className="copy-button"
                    onClick={() =>
                      handleCopyToClipboard(
                        results.analysis_code,
                        setCopiedAnalysis
                      )
                    }
                  >
                    {copiedAnalysis ? (
                      <FaCheck />
                    ) : (
                      <img
                        src="https://img.icons8.com/?size=50&id=DE8iRKgHEwsw&format=png"
                        alt="Copy Code!"
                        className="copy-button"
                      />
                    )}
                    <span>{copiedAnalysis ? " Copied!" : ""}</span>
                  </button>
                </div>
                <div className="actual-code">
                  <pre>{results.analysis_code}</pre>
                </div>
              </div>
            )}
            <h6 className="warning">
              Note: The analysis based on the data provided.
            </h6>
          </div>
        );
      case "insights":
        return (
          <>
            <div className="insights-results">
              <h3>Insights</h3>
              <ReactMarkdown>
                {results.llm_analysis && results.llm_analysis[0]?.message}
              </ReactMarkdown>
              <div className="Visualization-figures">
                {renderVisualizations()}
              </div>
              <h6 className="warning">
                Note: The insights are generated based on the data provided.
              </h6>
            </div>
          </>
        );
      case "visualization":
        return (
          <div className="visualization-results">
            <h3>Visualization Results</h3>
            <div className="Visualization-figures">
              {renderVisualizations()}
            </div>
            {results.visualization_code && (
              <div className="code-section">
                <div className="code-header">
                  <h4>Visualization Code</h4>
                  <button
                    className="copy-button"
                    onClick={() =>
                      handleCopyToClipboard(
                        results.visualization_code,
                        setCopiedVisualization
                      )
                    }
                  >
                    {copiedVisualization ? (
                      <FaCheck />
                    ) : (
                      <img
                        src="https://img.icons8.com/?size=50&id=DE8iRKgHEwsw&format=png"
                        alt="Copy Code!"
                        className="copy-button"
                      />
                    )}
                    <span>{copiedVisualization ? " Copied!" : ""}</span>
                  </button>
                </div>
                <div className="actual-code">
                  <pre>{results.visualization_code}</pre>
                </div>
              </div>
            )}
            <h6 className="warning">
              Note: The visualizations are generated based on the data provided
              and your query: "{results.query}"
            </h6>
          </div>
        );
      case "report":
        return (
          <div className="report-results">
            <h3>Generated Report</h3>
            {console.log(results.report)}
            {results.report?.pdf_url && (
              <div className="download-section">
                <a
                  href={`http://localhost:5000${results.report.pdf_url}`}
                  className="download-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload /> Download Full Report (PDF)
                </a>
              </div>
            )}

            <h6 className="warning">
              Note: This report is generated based on the analysis of your data.
            </h6>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="results-panel">{renderContent()}</div>;
};

export default ResultsPanel;
