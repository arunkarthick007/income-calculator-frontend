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
  heading: {
    textAlign: "left",
    marginTop: 30,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
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
  middleheading: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    flex: 1,
    marginRight: 10,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    color: "#333", // Adjust color as needed
    // Wrap text if it overflows
    wordWrap: "break-word",
  },
  value: {
    flex: 1,
    textAlign: "left",
    fontSize: 15,
    textDecoration: "underline",
    marginRight: 10,
    color: "blue",
  },
  signature: {
    marginTop: 20,
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

interface DataRowProps {
  label: string;
  value: string;
}

const DataRow: React.FC<DataRowProps> = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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
      <Page wrap size="A4" style={styles.page}>
        <Text style={styles.title}>Genistar Worksheet For Personal Income</Text>
        <Text style={styles.subtitle}>Plan your Work, Work your Plan</Text>

        <Text>
          I, <Text style={{ color: "red" }}>{data.Name}</Text>, need to earn a
          minimum of <Text style={{ color: "red" }}>(£) {data.Cash_Month}</Text>{" "}
          in a month or
          <Text style={{ color: "red" }}>(£) {data.Cash_Week}</Text> each week
          from personal premium production.
        </Text>
        <View>
          <Text style={styles.heading}>Results:</Text>
          <View style={styles.section}>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Cash_Week}</Text>
              <Text style={styles.label}>Amount of cash each week</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>{data.Advance_percentage}%</Text>
              <Text style={styles.label}>
                My Advanced percentage (Company average is 75%)
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Cash_Before_Advance}</Text>
              <Text style={styles.label}>Cash before Advance</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>{data.Commission_Rate}%</Text>
              <Text style={styles.label}>My commission rate</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Total_Premium_Issed}</Text>
              <Text style={styles.label}>Total Premium Issued</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>80%</Text>
              <Text style={styles.label}>
                Issued business rate (Company average is 80%)
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Total_Premium_Submitted}</Text>
              <Text style={styles.label}>Total Premium submitted</Text>
            </View>
          </View>

          <Text style={styles.middleheading}>
            In Order to submit{" "}
            <Text style={{ color: "red" }}>
              £ {data.Total_Premium_Submitted}
            </Text>{" "}
            in premium each week; I must do the following activity.
          </Text>

          <View style={styles.section}>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Total_Premium_Submitted}</Text>
              <Text style={styles.label}>Total Premium</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ 400</Text>
              <Text style={styles.label}>
                Your Average annual premium (company average is £300 annually )
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>£ {data.Cash_Before_Advance}</Text>
              <Text style={styles.label}>Cash before Advance</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>{data.Total_Applications_Week}</Text>
              <Text style={styles.label}>
                Total Number of Applications Each Week
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>2</Text>
              <Text style={styles.label}>
                Average number of applications per family(2 per 5 star family)
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>{data.Number_Of_SuccCarryBacks}</Text>
              <Text style={styles.label}>Number of successful carrybacks</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>80%</Text>
              <Text style={styles.label}>
                Your closing rate (company average is 80%)
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>
                {data.CarryBacks_Presented_EachWeek}
              </Text>
              <Text style={styles.label}>
                Total carrybacks presented each week
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>60%</Text>
              <Text style={styles.label}>
                Your conversion rate of SCOOPS that become Carrybacks (Avg 60%)
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.value}>{data.Total_Scoop_Week}</Text>
              <Text style={styles.label}>
                Total SCOOP Presentations Done for the week
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page wrap size="A4" style={styles.page}>
        <Text style={styles.middleheading}>
          Not all scheduled appointments become SCOOPS
        </Text>
        <Text style={styles.middleheading}>
          Total SCOOP presentations needed for the week
        </Text>

        <View style={styles.section}>
          <View style={styles.dataRow}>
            <Text style={styles.value}>70 %</Text>
            <Text style={styles.label}>
              Conversion rate of Appointments that become SCOOP Presentations
              (70%)
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.First_Appointments}</Text>
            <Text style={styles.label}>
              First time appointments that must be scheduled each week
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>4</Text>
            <Text style={styles.label}>
              Number of referral calls to schedule an appointment (average is 4)
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.Number_Of_PhoneCalls}</Text>
            <Text style={styles.label}>
              Number of phone calls needed to schedule first time appointments
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.Working_Days}</Text>
            <Text style={styles.label}>Number of work days in a week</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.No_Of_PhoneCallsPerDay}</Text>
            <Text style={styles.label}>Number of phone calls per day</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.Cash_Week}</Text>
            <Text style={styles.label}>Original weekly cash income goal</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.Number_Of_PhoneCalls}</Text>
            <Text style={styles.label}>
              Number of phone calls needed to schedule first time appointments
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.value}>{data.Income_Earned_PerCall}</Text>
            <Text style={styles.label}>
              Income earned per phone call whether the call makes an appointment
              or not
            </Text>
          </View>
        </View>
        <Text style={{ textAlign: "left", marginBottom: "10" }}>Summary:</Text>

        <Text style={styles.middleheading}>
          Each week in order to earn{" "}
          <Text style={{ color: "red" }}>£ {data.Cash_Week}</Text> in cash i
          need <Text style={{ color: "red" }}>{data.First_Appointments}</Text>{" "}
          appointments that result in{" "}
          <Text style={{ color: "red" }}>{data.Total_Scoop_Week}</Text> SCOOPs
          that will become{" "}
          <Text style={{ color: "red" }}>
            {data.CarryBacks_Presented_EachWeek}
          </Text>{" "}
          carrybacks. I must make{" "}
          <Text style={{ color: "red" }}>{data.Number_Of_PhoneCalls}</Text>{" "}
          phone calls each day to set those appointments.
        </Text>
        <Text style={styles.middleheading}>
          In order to feel good about my ability as a provider for my family, I{" "}
          <Text style={{ color: "red" }}>{data.Name}</Text> commit to doing this
          WITHOUT FAIL for a period of 12 months.
        </Text>

        <Image src={data.Signature} style={styles.signature} />
      </Page>
    </Document>
  );
}

export default IncomePDF;
