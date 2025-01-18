"use client";

import { useState } from "react";
import { calculateSalaryAfterTax } from "./Calculator";

const SalaryCalculator = () => {
  const [formData, setFormData] = useState({
    yearlySalary: "",
    monthlySalary: "",
    yearlySalaryAfterTax: "",
    monthlySalaryAfterTax: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNaN(Number(value))) return;

    if (name === "yearlySalary") {
      setFormData({
        yearlySalary: value,
        monthlySalary: value ? (Number(value) / 12).toFixed(0) : "",
        yearlySalaryAfterTax: value ? calculateSalaryAfterTax(Number(value), 40).toFixed(0) : "",
        monthlySalaryAfterTax: value ? calculateSalaryAfterTax(Number(value) / 12, 40).toFixed(0) : ""
      });
    } else if (name === "monthlySalary") {
      setFormData({
        monthlySalary: value,
        yearlySalary: value ? (Number(value) * 12).toFixed(0) : "",
        yearlySalaryAfterTax: value ? calculateSalaryAfterTax(Number(value) * 12, 40).toFixed(0) : "",
        monthlySalaryAfterTax: value ? calculateSalaryAfterTax(Number(value) / 12, 40).toFixed(0) : ""
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Årslønn</label>
            <input
              type="text"
              name="yearlySalary"
              value={formData.yearlySalary}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block text-gray-600">Månedslønn</label>
            <input
              type="text"
              name="monthlySalary"
              value={formData.monthlySalary}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Årslønn etter skatt</label>
            <input
              type="text"
              name="yearlySalaryAfterTax"
              value={formData.yearlySalaryAfterTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Månedslønn etter skatt</label>
            <input
              type="text"
              name="monthlySalaryAfterTax"
              value={formData.monthlySalaryAfterTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryCalculator;
