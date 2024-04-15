import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormInputs = {
  cashweek: number;
  percentagerange: number;
  commissionrange: number;
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
  } = form;

  const initialState: FormInputs = {
    cashweek: 1,
    percentagerange: 1,
    commissionrange: 1,
    workingdays: 1,
  };
  const [forms, setForm] = React.useState(initialState);

  const [calculatedValues, setCalcalculatedValues] = React.useState({
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
    console.log("Hey this is Arun");
    if (!forms) return;
    const cashbeforeadvance =
      Math.round((forms.cashweek / forms.percentagerange) * 100 * 100) / 100;
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
    const incomepercall = Math.round(forms.cashweek / numberofphonefirstapp);
    const data = {
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
    console.log(form);
  };

  //Onchange Handlers
  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prev) => {
      let temp: any = { ...prev };
      temp[name] = typeof value == "string" ? parseInt(value) : value;
      return temp;
    });
  };

  useEffect(calculateValues, [forms]);

  //Registering fields with React-Hook
  //const cashField = register("cashweek", { required: true });
  //const percentageField = register("percentagerange", { required: true });
  return (
    <div className="container mx-auto">
      <h1 className="text-white text-center text-3xl py-5 px-5 text">
        Income Calculator
      </h1>
      <div className="flex flex-wrap w-12/12 bg-grey border border-gray-500 rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-1/3 px-3">
          <form className="max-w-sm mx-auto p-6" noValidate>
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
                value={forms.cashweek}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                min="0"
                onChange={handleChanges}
              />
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="percentagerange"
                className="sr-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Advanced Percentage
              </label>
              <input
                id="percentagerange"
                type="range"
                name="percentagerange"
                value={forms.percentagerange}
                min="5"
                max="100"
                step={5}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={handleChanges}
              ></input>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                Min (5%)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                Max (%100)
              </span>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
              />
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="commissionrange"
                className="sr-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Your Commmission Rate
              </label>
              <input
                id="commissionrange"
                name="commissionrange"
                type="range"
                value={forms.commissionrange}
                min="5"
                max="100"
                step={5}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={handleChanges}
              ></input>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                Min (5%)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                Max (%100)
              </span>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
              />
            </div>
          </form>
        </div>
        <div className="w-1/3 px-3">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="scooppresentation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total SCOOP Presentations Done for the week
              </label>
              <input
                type="number"
                id="scooppresentation"
                name="scooppresentation"
                value={calculatedValues.scooppresentation}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
              />
            </div>
          </form>
        </div>
        <div className="w-1/3 px-3">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                readOnly
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  readOnly
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
                className="input input-ghost bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
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
                className="input input-ghost bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
              />
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center py-3">
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>
    </div>
  );
};
