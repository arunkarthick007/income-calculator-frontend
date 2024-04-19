import React, { MouseEventHandler, useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import IncomePDF from "../../Components/IncomePDF";

// App component
const Success: React.FC = () => {
  const [pdfLoaded, setPdfLoaded] = useState<number>(0);

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
        <div
          className={`mx-auto text-center p-4 text-white-500 ${
            pdfLoaded < 3 && "opacity-0"
          }`}
        >
          {" "}
          Success!
        </div>
        <div className="mt-4">
          <PDFDownloadLink document={<IncomePDF />} fileName="Income_Report">
            {({ loading }) => {
              loadCounter(!loading);
              return loading ? (
                <button
                  className="bg-blue-400 hover:bg-blue-700 lg:w-[25rem] min-w-fit text-white font-bold py-2 px-4 rounded"
                  disabled
                >
                  Loading Document...
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 lg:w-[25rem] min-w-fit text-white font-bold py-2 px-4 rounded">
                  Download Report
                </button>
              );
            }}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Success;
