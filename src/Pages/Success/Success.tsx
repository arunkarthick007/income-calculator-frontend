import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import IncomePDF from "../../Components/IncomePDF";

function Success() {
  return (
    <div>
      <PDFDownloadLink document={<IncomePDF />} fileName="Income_Report">
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Success;
