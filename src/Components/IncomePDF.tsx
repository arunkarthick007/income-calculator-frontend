import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFCFC",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    marginRight: 5,
  },
  signature: {
    marginTop: 20,
    width: 200,
    height: 50,
    alignSelf: "center",
  },
});

function IncomePDF() {
  const [data, setData]: any = useState({});

  const loadData = () => {
    const storeData = localStorage.getItem("calData");
    if (storeData) {
      const parsedData = JSON.parse(storeData);
      console.log(parsedData);
      setData(parsedData);
    }
  };
  useEffect(loadData, []);
  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Genistar Worksheet For Personal Income</Text>
        <Text style={styles.subtitle}>Plan your Work, Work your Plan</Text>

        <Text>
          I, <Text style={{ color: "red" }}>{data.Name}</Text>, need to earn a
          minimum of <Text style={{ color: "red" }}>£3000</Text> in a month or
          <Text style={{ color: "red" }}>£750</Text> each week from personal
          premium production.
        </Text>

        <Text style={styles.title}>Results:</Text>

        {/* <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Cash each week:</Text>
            <Text style={styles.value}>£{cashEachWeek}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Cash before Advance:</Text>
            <Text style={styles.value}>£{cashBeforeAdvance.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Total Premium Issued:</Text>
            <Text style={styles.value}>£{totalPremiumIssued.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Total Premium submitted:</Text>
            <Text style={styles.value}>
              £{totalPremiumSubmitted.toFixed(2)}
            </Text>
          </Text>
        </View> */}

        {/* <Text style={styles.title}>
          In order to submit £{totalPremiumSubmitted.toFixed(2)} in premium each
          week; I must do the following activity:
        </Text> */}

        {/* <View style={styles.section}>
          <Text>
            <Text style={styles.label}>
              Total SCOOP Presentations Done for the week:
            </Text>
            <Text style={styles.value}>
              {totalSCOOPPresentations.toFixed(2)}
            </Text>
          </Text>
          <Text>
            <Text style={styles.label}>
              Number of phone calls needed to schedule first time appointments:
            </Text>
            <Text style={styles.value}>{phoneCallsNeeded.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Number of phone calls per day:</Text>
            <Text style={styles.value}>{phoneCallsPerDay.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Income earned per phone call:</Text>
            <Text style={styles.value}>£{incomePerPhoneCall.toFixed(2)}</Text>
          </Text>
        </View> */}

        <Text style={styles.title}>Summary:</Text>

        <Text>
          Each week in order to earn £2000 in cash, I need 12 appointments that
          result in 7.44 SCOOPs that will become 6 Carrybacks. I must make 14
          phone calls each day to set those appointments.
        </Text>

        <Text>
          In order to feel good about my ability as a provider for my family, I
          commit to doing this WITHOUT FAIL for a period of 12 months.
        </Text>

        <Image
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAIAAADUHbG4AAAgAElEQVR4XuydCZjVVd4/9Pk4y+eud9..."
          style={styles.signature}
        />
      </Page>
    </Document>
  );
}

export default IncomePDF;
