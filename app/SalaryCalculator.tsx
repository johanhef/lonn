"use client";

import { useState, useEffect } from "react";
import { calculateFromAnyValue, TaxCalculationResultKey, TaxCalculationResult } from "./Calculator";
import HelpPopover from "./components/HelpPopover";


interface FormData {
  yearlySalary: string;
  monthlySalary: string;
  yearlySalaryAfterTax: string;
  monthlySalaryAfterTax: string;
  vacationMoney: string;
  monthlyAdjusted: string;
  normalMonthNet: string;
  decemberNet: string;
}

type FormDataKey = keyof FormData;

const calculatorKeyFromFormDataKey = (key: FormDataKey): TaxCalculationResultKey => {
  switch (key) {
    case "yearlySalary":
      return "yearlyGross";
    case "monthlySalary":
      return "monthlyGross";
    case "yearlySalaryAfterTax":
      return "yearlySalaryNet";
    case "monthlySalaryAfterTax":
      return "monthlySalaryNet";
    case "vacationMoney":
      return "vacationMoney";
    case "monthlyAdjusted":
      return "netMonthlyAdjusted";
    case "normalMonthNet":
      return "normalMonthNet";
    case "decemberNet":
      return "decemberMonthNet";
  }
}

const formDataFromTaxCalculationResult = (result: TaxCalculationResult): FormData => {
  return {
    yearlySalary: result.yearlyGross.toFixed(0),
    monthlySalary: result.monthlyGross.toFixed(0),
    yearlySalaryAfterTax: result.yearlySalaryNet.toFixed(0),
    monthlySalaryAfterTax: result.monthlySalaryNet.toFixed(0),
    vacationMoney: result.vacationMoney.toFixed(0),
    monthlyAdjusted: result.netMonthlyAdjusted.toFixed(0),
    normalMonthNet: result.normalMonthNet.toFixed(0),
    decemberNet: result.decemberMonthNet.toFixed(0),
  };
}

const SalaryCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    yearlySalary: "",
    monthlySalary: "",
    yearlySalaryAfterTax: "",
    monthlySalaryAfterTax: "",
    vacationMoney: "",
    monthlyAdjusted: "",
    normalMonthNet: "",
    decemberNet: "",
  });

  const [editingField, setEditingField] = useState<FormDataKey>("yearlySalary");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNaN(Number(value))) return;

    const editingField = name as FormDataKey;
    setEditingField(editingField);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData((prev) => {
      const previousValues = { ...prev };
      const inputValue = previousValues[editingField];

      const key = calculatorKeyFromFormDataKey(editingField);
      const inputNumber = Number(previousValues[editingField]);
      const result = calculateFromAnyValue(inputNumber, key);
      const newFormData = formDataFromTaxCalculationResult(result);

      return { ...newFormData, [editingField]: inputValue };
    });

  }, [editingField, formData[editingField]]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <form className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block">Brutto årslønn</label>
              <HelpPopover helpText="Brutto årslønn er det du tjener i året før skatt." />
            </div>
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
            <div className="flex items-center justify-between">
              <label className="block">Brutto månedslønn</label>
              <HelpPopover helpText="Brutto månedslønn er det du tjener i måneden før skatt. Med andre ord, brutto årslønn delt på 12." />
            </div>
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
            <div className="flex items-center justify-between">
              <label className="block">Årslønn etter skatt</label>
              <HelpPopover helpText="Netto årslønn er det du tjener i året etter at skatt er betalt, inkludert opptjente feriepenger." />
            </div>
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
            <div className="flex items-center justify-between">
              <label className="block">Månedslønn etter skatt</label>
              <HelpPopover helpText="Netto månedslønn er det du tjener i måneden etter at skatt er betalt.
                De fleste får utbetalt mindre enn dette hver måned fordi det settes av litt til feriepenger og halv skatt i desember." />
            </div>
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
            <div className="flex items-center justify-between">
              <label className="block">Feriepenger</label>
              <HelpPopover helpText={`Feriepenger beregnes fra fjorårets lønn. 
                ${formData.vacationMoney} er et estimat basert på oppgitt årslønn (${formData.yearlySalary}). 
                Tjente du mindre enn dette i fjor, vil årets feriepenger være lavere enn dette.`} />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="vacationMoney"
              value={formData.vacationMoney}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block">Utbetalt månedslønn</label>
              <HelpPopover helpText={`Sett bort fra juni og desember, 
                er ${formData.normalMonthNet} et estimat på det som faktisk utbetales i lønn hver måned. Dette tallet er lavere enn netto månedslønn, 
                for å få utbetalt litt i desember, og litt mer som feriepenger.`} />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="normalMonthNet"
              value={formData.normalMonthNet}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                        border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block">Utbetalt desember</label>
              <HelpPopover helpText="I desember betaler de fleste halv skatt, og får dermed betydelig mer utbetalt enn ellers.
               Dette er mulig fordi man har betalt litt mer skatt resten av året." />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="decemberNet"
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
