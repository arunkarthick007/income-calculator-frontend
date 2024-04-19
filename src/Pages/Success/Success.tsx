import React, { MouseEventHandler, useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import IncomePDF from "../../Components/IncomePDF";

// App component
const Success: React.FC = () => {
  const [pdfLoaded, setPdfLoaded] = useState<number>(0);

  const handleEmail = () => {
    // Logic for emailing the report
    console.log("Emailing report...");
  };

  const loadCounter = (loaded: boolean) => {
    if (loaded)
      setPdfLoaded((prev) => {
        let temp = prev;
        if (prev <= 3) temp++;
        return temp;
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {pdfLoaded > 2 && (
          <div className="border-2 border-grey-500 p-4 text-white-500">
            {" "}
            Success!
          </div>
        )}
        <div className="mt-4">
          <PDFDownloadLink document={<IncomePDF />} fileName="Income_Report">
            {({ loading }) => {
              loadCounter(!loading);
              return loading ? (
                <button>Loading Document...</button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download Report
                </button>
              );
            }}
          </PDFDownloadLink>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleEmail}
          >
            Email Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
