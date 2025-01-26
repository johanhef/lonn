"use client";

import { useState, useEffect } from "react";
import { calculateFromAnyValue, TaxCalculationResultKey, TaxCalculationResult } from "./Calculator";
import HelpPopover from "./components/HelpPopover";
import FormattedNumberInput from "./components/NumberInput";


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
    yearlySalary: formatNumber(result.yearlyGross.toFixed(0)),
    monthlySalary: formatNumber(result.monthlyGross.toFixed(0)),
    yearlySalaryAfterTax: formatNumber(result.yearlySalaryNet.toFixed(0)),
    monthlySalaryAfterTax: formatNumber(result.monthlySalaryNet.toFixed(0)),
    vacationMoney: formatNumber(result.vacationMoney.toFixed(0)),
    monthlyAdjusted: formatNumber(result.netMonthlyAdjusted.toFixed(0)),
    normalMonthNet: formatNumber(result.normalMonthNet.toFixed(0)),
    decemberNet: formatNumber(result.decemberMonthNet.toFixed(0)),
  };
}

const formatNumber = (input: string) => {
  // console.log("input", input);
  // const numericValue = input.replace(/\D/g, ""); // Remove non-numeric characters
  // console.log("numeric", numericValue);
  // const formatted = new Intl.NumberFormat("nb-NO").format(Number(numericValue)); // Format with Norwegian locale
  // console.log("formatted", formatted);
  return input;
};

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

  const handleInputChange = (name: string, value: string) => {
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
        <form className="space-y-4" name="Lønnskalkulator" aria-label="Lønnskalkulator">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="yearlySalary" className="block">Brutto årslønn</label>
              <HelpPopover id="yearlySalary-help" label="Brutto årslønn - hjelp" helpText="Brutto årslønn er det du tjener i året før skatt." />
            </div>
            <FormattedNumberInput value={formData.yearlySalary} onChange={(val) => handleInputChange("yearlySalary", val)} placeholder="Brutto årslønn" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="monthlySalary" className="block">Brutto månedslønn</label>
              <HelpPopover id="monthlySalary-help" label="Brutto månedslønn - hjelp" helpText="Brutto månedslønn er det du tjener i måneden før skatt. Med andre ord, brutto årslønn delt på 12." />
            </div>
            <FormattedNumberInput value={formData.monthlySalary} onChange={(val) => handleInputChange("monthlySalary", val)} placeholder="Brutto månedslønn" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="yearlySalaryAfterTax" className="block">Årslønn etter skatt</label>
              <HelpPopover id="yearlySalaryAfterTax-help" label="Årslønn etter skatt - hjelp" helpText="Netto årslønn er det du tjener i året etter at skatt er betalt, inkludert opptjente feriepenger." />
            </div>
            <FormattedNumberInput value={formData.yearlySalaryAfterTax} onChange={(val) => handleInputChange("yearlySalaryAfterTax", val)} placeholder="Årslønn etter skatt" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="monthlySalaryAfterTax" className="block">Månedslønn etter skatt</label>
              <HelpPopover id="monthlySalaryAfterTax-help" label="Månedslønn etter skatt - hjelp" helpText="Netto månedslønn er det du tjener i måneden etter at skatt er betalt.
                De fleste får utbetalt mindre enn dette hver måned fordi det settes av litt til feriepenger og halv skatt i desember." />
            </div>
            <FormattedNumberInput value={formData.monthlySalaryAfterTax} onChange={(val) => handleInputChange("monthlySalaryAfterTax", val)} placeholder="Månedslønn etter skatt" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="vacationMoney" className="block">Feriepenger</label>
              <HelpPopover id="vacationMoney-help" label="Feriepenger - hjelp" helpText={`Feriepenger beregnes fra fjorårets lønn. 
              ${(formData.vacationMoney && formData.vacationMoney !== "0") ? formData.vacationMoney : "Dette"} er et estimat basert på oppgitt årslønn ${formData.yearlySalary ? ` (${formData.yearlySalary})` : ""}. 
              Tjente du mindre enn dette i fjor, vil årets feriepenger være lavere enn dette.`} />
            </div>
            <FormattedNumberInput value={formData.vacationMoney} onChange={(val) => handleInputChange("vacationMoney", val)} placeholder="Feriepenger" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="normalMonthNet" className="block">Utbetalt månedslønn</label>
              <HelpPopover id="normalMonthNet-help" label="Utbetalt månedslønn - hjelp" helpText={`Sett bort fra juni og desember, 
                er ${(formData.normalMonthNet && formData.normalMonthNet !== "0") ? formData.normalMonthNet : "dette"} et estimat på det som faktisk utbetales i lønn hver måned. Dette tallet er lavere enn netto månedslønn, 
                for å få utbetalt litt i desember, og litt mer som feriepenger.`} />
            </div>
            <FormattedNumberInput value={formData.normalMonthNet} onChange={(val) => handleInputChange("normalMonthNet", val)} placeholder="Utbetalt månedslønn" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="decemberNet" className="block">Utbetalt desember</label>
              <HelpPopover id="decemberNet-help" label="Utbetalt desember - hjelp" helpText="I desember betaler de fleste halv skatt, og får dermed betydelig mer utbetalt enn ellers.
               Dette er mulig fordi man har betalt litt mer skatt resten av året." />
            </div>
            <FormattedNumberInput value={formData.decemberNet} onChange={(val) => handleInputChange("decemberNet", val)} placeholder="Utbetalt desember" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryCalculator;
