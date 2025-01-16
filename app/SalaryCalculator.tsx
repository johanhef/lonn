"use client";

import { useState } from "react";

const SalaryCalculator = () => {
  const [formData, setFormData] = useState({
    yearlySalary: "",
    monthlySalary: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNaN(Number(value))) return;

    if (name === "yearlySalary") {
      setFormData({
        yearlySalary: value,
        monthlySalary: value ? (Number(value) / 12).toFixed(2) : "",
      });
    } else if (name === "monthlySalary") {
      setFormData({
        monthlySalary: value,
        yearlySalary: value ? (Number(value) * 12).toFixed(2) : "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Salary Calculator</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Yearly Salary</label>
            <input
              type="text"
              name="yearlySalary"
              value={formData.yearlySalary}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block text-gray-600">Monthly Salary</label>
            <input
              type="text"
              name="monthlySalary"
              value={formData.monthlySalary}
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
