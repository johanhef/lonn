export function calculateTax(salary: number, taxRate: number): number {
    if (salary < 0 || taxRate < 0) {
        throw new Error("Salary and tax rate must be non-negative values.");
    }
    return salary * (taxRate / 100);
}

export function calculateSalaryAfterTax(salary: number, taxRate: number): number {
    if (salary < 0 || taxRate < 0) {
        throw new Error("Salary and tax rate must be non-negative values.");
    }

    return salary - calculateTax(salary, taxRate)
}