import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import IncomePDF from "../../Components/IncomePDF";

// App component
const Success: React.FC = () => {
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);

  useEffect(() => {
    // When pdfLoaded state becomes true, it means PDF has been loaded successfully
    if (pdfLoaded) {
      setPdfLoaded(true);
    }
  }, [pdfLoaded]);
  const handleEmail = () => {
    // Logic for emailing the report
    console.log("Emailing report...");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {pdfLoaded && (
          <div className="border-2 border-grey-500 p-4 text-white-500">
            {" "}
            Success!
          </div>
        )}
        <div className="mt-4">
          <PDFDownloadLink document={<IncomePDF />} fileName="Income_Report">
            {({ loading }) =>
              loading ? (
                <button>Loading Document...</button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download Report
                </button>
              )
            }
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
