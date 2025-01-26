import { useRef } from "react";

interface FormattedNumberInputProps {
  value: string;
  onChange: (rawValue: string) => void;
  placeholder?: string;
}

export default function FormattedNumberInput({ value, onChange }: FormattedNumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

const formatNumber = (input: string) => {
    if (/^0/.test(input.replace(/\s/g, ""))) {
        return input;
    }

    return input ? new Intl.NumberFormat("nb-NO").format(Number(input.replace(/\s/g, ""))) : "";
};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value.replace(/\s/g, ""); // Remove spaces
    // if (!/^\d*$/.test(rawInput)) return; // Only allow numbers

    const prevFormatted = formatNumber(value);
    const nextFormatted = formatNumber(rawInput);

    // Calculate cursor shift due to formatting
    const addedSeparators = (nextFormatted.match(/\s/g) || []).length - (prevFormatted.match(/\s/g) || []).length;
    let cursorPosition = (event.target.selectionStart ?? 0) + addedSeparators;
    if (cursorPosition < 0) cursorPosition = 0;

    console.debug("cursorPosition", cursorPosition, addedSeparators);

    onChange(rawInput);

    // Set the adjusted cursor position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  return (
    <input
        id="monthlySalary"
        type="text"
        // inputMode="numeric"
        // pattern="[0-9]*"
        ref={inputRef}
        name="monthlySalary"
        value={formatNumber(value)}
        onChange={handleChange}
        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 
                border-gray-300 focus:ring-blue-500 bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-600"
    />
  );
}
