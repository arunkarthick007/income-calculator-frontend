import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import Signature from "./Signature";

type FormInputs = {
  cashmonth: 1;
  percentagerange: 5;
  commissionrange: 5;
  workingdays: number;
};

//Company constants
const premiumIssueRate = 80;
const avgAnnualPremium = 400;
const avgApplicationPerFamily = 2;
const closingRate = 80;
const scoopConversionRate = 60;
const appointConvRate = 70;
const avgRefCalls = 4;

export const CalculatorForm = () => {
  const form = useForm<FormInputs>();
  const {
    watch,
    formState: { errors },
    control,
  } = form;

  const initialState: FormInputs = {
    cashmonth: 1,
    percentagerange: 5,
    commissionrange: 5,
    workingdays: 1,
  };

  const navigate = useNavigate();

  const [forms, setForm] = React.useState(initialState);

  const [name, setName] = useState(""); // State variable for name input
  const [email, setEmail] = useState(""); //State variable for email input
  const [sign, setSign] = useState("");

  const [isPending, setIsPending] = useState("false");

  const [calculatedValues, setCalcalculatedValues] = React.useState({
    cashperweek: 0,
    cashbeforeadvance: 0,
    premiumissued: 0,
    premiumsubmitted: 0,
    applicationeachweek: 0,
    noofsuccessfulcarrybacks: 0,
    carrybackseachweek: 0,
    scooppresentation: 0,
    appointmentconversionrate: 0,
    numberofphonefirstapp: 0,
    numberofcallsperday: 0,
    incomepercall: 0,
  });
  //Handling Errors
  const [cashError, setCashError] = React.useState("");

  const calculateValues = () => {
    if (!forms) return;
    const cashperweek = Math.round(forms.cashmonth / 4);
    const cashbeforeadvance =
      Math.round((cashperweek / forms.percentagerange) * 100 * 100) / 100;
    const premiumissued =
      Math.round((cashbeforeadvance / forms.commissionrange) * 100 * 100) / 100;
    const premiumsubmitted =
      Math.round((premiumissued / premiumIssueRate) * 100 * 100) / 100;
    const applicationeachweek = Math.round(premiumsubmitted / avgAnnualPremium);
    const noofsuccessfulcarrybacks = Math.round(
      applicationeachweek / avgApplicationPerFamily
    );
    const carrybackseachweek =
      Math.round((noofsuccessfulcarrybacks / closingRate) * 100 * 100) / 100;
    const scooppresentation = Math.floor(
      (carrybackseachweek / scoopConversionRate) * 100
    );
    const appointmentconversionrate =
      Math.round((scooppresentation / appointConvRate) * 100) + 1;
    const numberofphonefirstapp =
      Math.round(appointmentconversionrate * avgRefCalls) - 1;
    const numberofcallsperday = Math.round(
      numberofphonefirstapp / forms.workingdays
    );
    const incomepercall = Math.round(cashperweek / numberofphonefirstapp);
    const data = {
      cashperweek,
      cashbeforeadvance,
      premiumissued,
      premiumsubmitted,
      applicationeachweek,
      noofsuccessfulcarrybacks,
      carrybackseachweek,
      scooppresentation,
      appointmentconversionrate,
      numberofphonefirstapp,
      numberofcallsperday,
      incomepercall,
    };
    setCalcalculatedValues(data);
  };

  //Onchange Handlers
  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => {
      let temp: any = { ...prev };
      temp[name] = typeof value == "string" ? parseInt(value) : value;
      return temp;
    });
  };

  // Event handler to update the name state variable
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  // Event handler to update the email state variable
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const setLocalStorage = () => {
    const storageData = {
      Name: name,
      EmailId: email,
      Signature: sign,
      Cash_Month: forms.cashmonth,
      Cash_Week: calculatedValues.cashperweek,
      Advance_percentage: forms.percentagerange,
      Cash_Before_Advance: calculatedValues.cashbeforeadvance,
      Commission_Rate: forms.commissionrange,
      Total_Premium_Issed: calculatedValues.premiumissued,
      Total_Premium_Submitted: calculatedValues.premiumsubmitted,
      Total_Applications_Week: calculatedValues.applicationeachweek,
      Number_Of_SuccCarryBacks: calculatedValues.noofsuccessfulcarrybacks,
      CarryBacks_Presented_EachWeek: calculatedValues.carrybackseachweek,
      Total_Scoop_Week: calculatedValues.scooppresentation,
      First_Appointments: calculatedValues.appointmentconversionrate,
      Number_Of_PhoneCalls: calculatedValues.numberofphonefirstapp,
      Working_Days: forms.workingdays,
      No_Of_PhoneCallsPerDay: calculatedValues.numberofcallsperday,
      Income_Earned_PerCall: calculatedValues.incomepercall,
    };
    localStorage.setItem("calData", JSON.stringify(storageData));
  };

  const handleSubmit = async (e: any) => {
    const reportData = {
      Name: name,
      EmailId: email,
      Cash_Week: calculatedValues.cashperweek,
      Advance_percentage: forms.percentagerange,
      Commission_Rate: forms.commissionrange,
      Working_Days: forms.workingdays,
    };
    try {
      setIsPending("true");

      const response = await fetch(
        "https://income-calculator-api.azurewebsites.net/incomereport",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        const errorMessage = `Failed to create income report. Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setLocalStorage();
      navigate({
        pathname: "/success",
      });
    } catch (error: any) {
      setIsPending("false");
    }
  };
  useEffect(calculateValues, [forms]);

  return (
    <div className="container mx-auto" id="calculator">
      <h1 className="text-white border-b text-center md:text-left text-3xl py-5 px-5 mx-8 text">
        Income Calculator
      </h1>
      <div className="flex flex-col md:flex-row px-12 py-8">
        <div className="mb-5 md:w-1/3 md:pr-3">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Your Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={name}
            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="md:w-1/3 md:px-3">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Your Email Address
          </label>
          <input
            type="email"
            id="useremail"
            name="useremail"
            value={email}
            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
            required
            onChange={handleEmailChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap w-12/12 bg-grey border border-gray-500 rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="md:w-1/3 px-3">
          <form className="max-w-sm mx-auto p-6" noValidate>
            <div className="mb-5">
              <label
                htmlFor="cashweek"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Cash Per Month
              </label>
              <input
                type="number"
                id="cashmonth"
                name="cashmonth"
                value={forms.cashmonth}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                min="0"
                onChange={handleChanges}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="cashweek"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cash Per Week
              </label>
              <input
                type="number"
                id="cashweek"
                name="cashweek"
                value={calculatedValues.cashperweek}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                min="0"
                disabled
                readOnly
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="percentagerange"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Advanced Percentage
              </label>
              <select
                className="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="percentagerange"
                name="percentagerange"
                onChange={handleChanges}
              >
                {[...Array(20)].map((_, index) => (
                  <option key={index} value={(index + 1) * 5}>
                    {(index + 1) * 5}%
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="cashbeforeadvance"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cash Before Advance
              </label>
              <input
                type="number"
                id="cashbeforeadvance"
                name="cashbeforeadvance"
                value={calculatedValues.cashbeforeadvance}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="commissionrange"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Your Commmission Rate
              </label>
              <select
                className="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="commissionrange"
                name="commissionrange"
                onChange={handleChanges}
              >
                {[...Array(20)].map((_, index) => (
                  <option key={index} value={(index + 1) * 5}>
                    {(index + 1) * 5}%
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="premiumissued"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Premium Issued
              </label>
              <input
                type="number"
                id="premiumissued"
                name="premiumissued"
                value={calculatedValues.premiumissued}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="badge badge-lg badge-outline mb-5">
              Premium Issue Rate- 80%
            </div>
            <div className="mb-5">
              <label
                htmlFor="premiumsubmitted"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Premium Submitted
              </label>
              <input
                type="number"
                id="premiumsubmitted"
                name="premiumsubmitted"
                value={calculatedValues.premiumsubmitted}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
          </form>
        </div>
        <div className="md:w-1/3 px-3">
          <form className="max-w-sm mx-auto p-6">
            <div className="mb-5">
              <label
                htmlFor="averagepremium"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Average Annual Premium
              </label>
              <input
                type="number"
                id="totalpremium"
                value="400"
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="applicationeachweek"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Applications Each Week
              </label>
              <input
                type="number"
                id="applicationeachweek"
                name="applicationeachweek"
                value={calculatedValues.applicationeachweek}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="applicationweekaverage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Average Applications Per Family(2 per 5 star family)
              </label>
              <input
                type="number"
                id="applicationweekaverage"
                value={2}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="noofsuccessfulcarrybacks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No of Successful Carrybacks
              </label>
              <input
                type="number"
                id="noofsuccessfulcarrybacks"
                name="noofsuccessfulcarrybacks"
                value={calculatedValues.noofsuccessfulcarrybacks}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="closingrate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Closing Rate(Company Average 80%)
              </label>
              <input
                type="number"
                id="closingrate"
                value="80"
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="carrybackseachweek"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Number of Carrybacks presented Each Week
              </label>
              <input
                type="number"
                id="carrybackseachweek"
                name="carrybackseachweek"
                value={calculatedValues.carrybackseachweek}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="scoopconversionrate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Scoop Conversion Rate(Company Average 60%)
              </label>
              <input
                type="number"
                id="scoopconversionrate"
                value={60}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="scooppresentation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total SCOOP Presentations needed for the week
              </label>
              <input
                type="number"
                id="scooppresentation"
                name="scooppresentation"
                value={calculatedValues.scooppresentation}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
          </form>
        </div>
        <div className="md:w-1/3 px-3">
          <form className="max-w-sm mx-auto p-6">
            <div className="mb-5">
              <label
                htmlFor="appointmentconversionrate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Conversion rate of Appointments that become SCOOP Presentations
                (70%)
              </label>
              <input
                type="number"
                id="appointmentconversionrate"
                value={70}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="appointmentconversionrate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First time appointments that must be scheduled each week
              </label>
              <input
                type="number"
                id="appointmentconversionrate"
                name="appointmentconversionrate"
                value={calculatedValues.appointmentconversionrate}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium text-gray-900 dark:text-white">
                    Number of phone calls needed to schedule first time
                    appointments
                  </span>
                </div>
                <input
                  type="number"
                  name="numberofphonefirstapp"
                  value={calculatedValues.numberofphonefirstapp}
                  placeholder="0"
                  min="0"
                  className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  readOnly
                  disabled
                />
                <div className="badge badge-md badge-outline mt-2">
                  Average Calls - 4
                </div>
              </label>
            </div>
            <div className="mb-5">
              <label
                htmlFor="workingdays"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of Working Days?
              </label>
              <select
                className="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="workingdays"
                name="workingdays"
                onChange={handleChanges}
              >
                <option disabled selected>
                  0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="numberofcallsperday"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of Phone call per day
              </label>
              <input
                type="text"
                name="numberofcallsperday"
                value={calculatedValues.numberofcallsperday}
                placeholder="Type her"
                min="0"
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="incomepercall"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Income earned per call regardless of making appointments
              </label>
              <input
                type="number"
                name="incomepercall"
                value={calculatedValues.incomepercall}
                className="input input-ghost disabled:dark:text-white disabled:text-black disabled:text-opacity-60 disabled:dark:text-opacity-60 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                disabled
              />
            </div>
          </form>
        </div>
        <div className="w-full flex flex-row md:justify-left px-3">
          <div className="md:w-2/3 flex flex-row px-3">
            <div className="flex relative h-fit px-3 w-auto">
              <Signature setSign={setSign}></Signature>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:w-full align-center item-center mt-5 mx-6">
          <button
            className="btn btn-primary w-full md:w-1/3 my-3 mx-6"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
