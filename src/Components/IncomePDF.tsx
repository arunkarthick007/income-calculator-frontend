import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#EADBC8",
    paddingBottom: 20,
  },
  topbanner: {
    backgroundColor: "#102C57",
    color: "white",
    paddingVertical: 30,
  },
  heading: {
    textAlign: "left",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "heavy",
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
  },
  middleheading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "heavy",
  },
  para: {
    fontSize: 15,
    fontWeight: "heavy",
  },
  parawithspacing: {
    fontSize: 13,
    fontWeight: "heavy",
    paddingVertical: 5,
  },
  valuedata: {
    width: "100pt",
    borderBottom: "1pt",
    marginRight: "40pt",
    textAlign: "center",
  },
  label: {
    flex: 1,
    marginRight: 10,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 12,
    //color: "#333", // Adjust color as needed
    // Wrap text if it overflows
    wordWrap: "break-word",
  },
  symbols: {
    width: "15pt",
    fontSize: 15,
  },
  value: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    marginRight: 10,
    color: "#51829B",
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
    marginBottom: 5,
    paddingVertical: 5,
    height: 30,
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
        <View style={styles.topbanner}>
          <Text style={styles.title}>
            Genistar Worksheet For Personal Income
          </Text>
          <Text style={styles.subtitle}>Plan your Work, Work your Plan</Text>
        </View>

        <View style={{ marginHorizontal: "40pt", marginVertical: "10pt" }}>
          <Text style={styles.para}>
            I, <Text style={{ color: "#DD5746" }}>{data.Name}</Text>, need to
            earn a minimum of{" "}
            <Text style={{ color: "#DD5746" }}>(£) {data.Cash_Month}</Text> in a
            month or
            <Text style={{ color: "#DD5746" }}>(£) {data.Cash_Week}</Text> each
            week from personal premium production.
          </Text>
          <View>
            <Text style={styles.heading}>Results:</Text>
            <View style={styles.section}>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>£</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Cash_Week}</Text>
                </View>
                <Text style={styles.label}>Amount of cash each week</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>%</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Advance_percentage}</Text>
                </View>
                <Text style={styles.label}>
                  My Advanced percentage (Company average is 75%)
                </Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>£</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Cash_Before_Advance}</Text>
                </View>
                <Text style={styles.label}>Cash before Advance</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>%</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Commission_Rate}</Text>
                </View>
                <Text style={styles.label}>My commission rate</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>£</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Total_Premium_Issed}</Text>
                </View>
                <Text style={styles.label}>Total Premium Issued</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>%</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>80</Text>
                </View>
                <Text style={styles.label}>
                  Issued business rate (Company average is 80%)
                </Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>£</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>
                    {data.Total_Premium_Submitted}
                  </Text>
                </View>
                <Text style={styles.label}>Total Premium submitted</Text>
              </View>
            </View>

            <View>
              <Text style={styles.para}>
                In Order to submit{" "}
                <Text style={{ color: "#DD5746" }}>
                  £ {data.Total_Premium_Submitted}
                </Text>{" "}
                in premium each week; I must do the following activity.
              </Text>
              <View style={styles.section}>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>£</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>
                      {data.Total_Premium_Submitted}
                    </Text>
                  </View>
                  <Text style={styles.label}>Total Premium</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>£</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>400</Text>
                  </View>
                  <Text style={styles.label}>
                    Your Average annual premium (company average is £300
                    annually)
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>=</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>
                      {data.Total_Applications_Week}
                    </Text>
                  </View>
                  <Text style={styles.label}>
                    Total Number of Applications Each Week
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>÷</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>2</Text>
                  </View>
                  <Text style={styles.label}>
                    Average number of applications per family(2 per 5 star
                    family)
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>=</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>
                      {data.Number_Of_SuccCarryBacks}
                    </Text>
                  </View>
                  <Text style={styles.label}>
                    Number of successful carrybacks
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>÷</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>80%</Text>
                  </View>
                  <Text style={styles.label}>
                    Your closing rate (company average is 80%)
                  </Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>=</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>
                      {data.CarryBacks_Presented_EachWeek}
                    </Text>
                  </View>
                  <Text style={styles.label}>
                    Total carrybacks presented each week
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    paddingVertical: 5,
                    height: 30,
                  }}
                >
                  <Text style={styles.symbols}>÷</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>80%</Text>
                  </View>
                  <View>
                    <Text style={styles.label}>
                      Your conversion rate of SCOOPS that become Carrybacks (Avg
                      60%)
                    </Text>
                  </View>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.symbols}>=</Text>
                  <View style={styles.valuedata}>
                    <Text style={styles.value}>{data.Total_Scoop_Week}</Text>
                  </View>
                  <Text style={styles.label}>
                    Total SCOOP presentations needed for the week
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingTop: "10" }}>
              <Text style={styles.parawithspacing}>
                Not all scheduled appointments become SCOOPS
              </Text>
              <Text style={styles.parawithspacing}>
                Total SCOOP presentations needed for the week
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.dataRow}>
                <Text style={styles.symbols}>÷</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>70</Text>
                </View>
                <View>
                  <Text style={styles.label}>
                    Conversion rate of Appointments that become SCOOP
                    Presentations (70%)
                  </Text>
                </View>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>=</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.First_Appointments}</Text>
                </View>
                <Text style={styles.label}>
                  First time appointments that must be scheduled each week
                </Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>×</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>4</Text>
                </View>
                <Text style={styles.label}>
                  Number of referral calls to schedule an appointment (average
                  is 4)
                </Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>=</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Number_Of_PhoneCalls}</Text>
                </View>
                <Text style={styles.label}>
                  Number of phone calls needed to schedule first time
                  appointments
                </Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>÷</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Working_Days}</Text>
                </View>
                <Text style={styles.label}>Number of work days in a week</Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>=</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>
                    {data.No_Of_PhoneCallsPerDay}
                  </Text>
                </View>
                <Text style={styles.label}>Number of phone calls per day</Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>£</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Cash_Week}</Text>
                </View>
                <Text style={styles.label}>
                  Original weekly cash income goal
                </Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>÷</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Number_Of_PhoneCalls}</Text>
                </View>
                <Text style={styles.label}>
                  Number of phone calls needed to schedule first time
                  appointments
                </Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.symbols}>=</Text>
                <View style={styles.valuedata}>
                  <Text style={styles.value}>{data.Income_Earned_PerCall}</Text>
                </View>
                <View>
                  <Text style={styles.label}>
                    Income earned per phone call whether the call makes an
                    appointment or not
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.para}>
            Each week in order to earn{" "}
            <Text style={{ color: "#DD5746" }}>£ {data.Cash_Week}</Text> in cash
            i need{" "}
            <Text style={{ color: "#DD5746" }}>{data.First_Appointments}</Text>{" "}
            appointments that result in{" "}
            <Text style={{ color: "#DD5746" }}>{data.Total_Scoop_Week}</Text>{" "}
            SCOOPs that will become{" "}
            <Text style={{ color: "#DD5746" }}>
              {data.CarryBacks_Presented_EachWeek}
            </Text>{" "}
            carrybacks.I must make{" "}
            <Text style={{ color: "#DD5746" }}>
              {data.Number_Of_PhoneCalls}
            </Text>{" "}
            phone calls each day to set those appointments.
          </Text>
          <Text style={styles.middleheading}>
            In order to feel good about my ability as a provider for my family,
            I <Text style={{ color: "#DD5746" }}>{data.Name}</Text> commit to
            doing this WITHOUT FAIL for a period of 12 months.
          </Text>
          <Image src={data.Signature} style={styles.signature} />
        </View>
      </Page>
    </Document>
  );
}

export default IncomePDF;
