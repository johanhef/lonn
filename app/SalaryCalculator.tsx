"use client";

import { useState } from "react";
import { taxCalculation } from "./Calculator";

const SalaryCalculator = () => {
  const [formData, setFormData] = useState({
    yearlySalary: "",
    monthlySalary: "",
    yearlySalaryAfterTax: "",
    monthlySalaryAfterTax: "",
    vacationMoney: "",
    monthlyAdjusted: "",
    normalMonthNet: "",
    decemberNet: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNaN(Number(value))) return;
    let yearlyInputGross = (name === "yearlySalary") ? Number(value) : 0;
    if (name === "monthlySalary") {
      yearlyInputGross = Number(value) * 12;
    }
    const taxResult = taxCalculation(yearlyInputGross);

    setFormData({
      yearlySalary: yearlyInputGross.toFixed(),
      monthlySalary: (yearlyInputGross / 12).toFixed(0),
      yearlySalaryAfterTax: taxResult.yearlySalaryNet.toFixed(0),
      monthlySalaryAfterTax: taxResult.monthlySalaryNet.toFixed(0),
      vacationMoney: taxResult.vacationMoney.toFixed(0),
      monthlyAdjusted: taxResult.netMonthlyAdjusted.toFixed(0),
      normalMonthNet: taxResult.normalMonthNet.toFixed(0),
      decemberNet: taxResult.decemberMonthNet.toFixed(0),
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <form className="space-y-4">
          <div>
            <label className="block">Årslønn</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="yearlySalary"
              value={formData.yearlySalary}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block">Månedslønn</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalary"
              value={formData.monthlySalary}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>

            <div>
              <label className="block">Årslønn etter skatt</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="yearlySalaryAfterTax"
                value={formData.yearlySalaryAfterTax}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                          border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          <div>
            <label className="block">Månedslønn etter skatt</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalaryAfterTax"
              value={formData.monthlySalaryAfterTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block">Feriepenger</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalaryAfterTax"
              value={formData.vacationMoney}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block">Månedslønn etter skatt justert for feriepenger</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalaryAfterTax"
              value={formData.monthlyAdjusted}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block">Utbetalt månedslønn</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalaryAfterTax"
              value={formData.normalMonthNet}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block">Utbetalt desember</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="monthlySalaryAfterTax"
              value={formData.decemberNet}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryCalculator;
