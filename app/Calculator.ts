export function calculateSalaryAfterTax(salary: number): number {
    return salary - calculateTotalTax(salary)
}

function calculateTotalTax(yearlySalary: number): number {
    const trygdeavgift = calculateTrygdeavgift(yearlySalary);
    const trinnskatt = calculateTrinnskatt(yearlySalary);

    const incomeTaxBase = salaryDeduction(yearlySalary);
    const inntektsskatt = calculateInntektsskatt(incomeTaxBase);

    // Step 3: Sum up all taxes
    console.debug("trygdeavgift:", trygdeavgift);
    console.debug("trinnskatt:", trinnskatt);
    console.debug(`inntektsskatt: ${inntektsskatt}, grunnlag: ${incomeTaxBase}`);
    return trygdeavgift + trinnskatt + inntektsskatt;
}

function salaryDeduction(yearlySalary: number): number {
    const maxStandardDeduction = 92000; // Max minstefradrag for 2025
    const standardDeductionRate = 0.46; // 2025
    // const personalDeduction = 108550; // Personfradrag for 2025
    const personalDeduction = 108550; // Personfradrag for 2025

    // Calculate standard deduction (minstefradrag)
    const standardDeduction = Math.min(yearlySalary * standardDeductionRate, maxStandardDeduction);

    // Calculate taxable income (grunnlag for skatt)
    const taxableIncome = Math.max(yearlySalary - standardDeduction - personalDeduction, 0);

    return taxableIncome;
}

/**
 * National insurance contribution (Trygdeavgift) is calculated from gross personal income.
 * People earning below a certain threshold should not pay national insurance contribution.
 * To ensure that it always pays off to get a higher salary, the national insurance contribution 
 * cannot exceed 25% of the difference between the salary and the minimum threshold.
 */
function calculateTrygdeavgift(yearlySalary: number): number {
    const minimumSalary = 99650; // 2025
    const differenceMaxRate = 0.25; // 2025
    const difference = yearlySalary - minimumSalary;
    const trygdeRate = 0.077; // 2025
    return Math.min(yearlySalary * trygdeRate, difference * differenceMaxRate);
}

function calculateTrinnskatt(yearlySalary: number): number {
    // Trinnskatt thresholds and rates for 2025
    /*
        Trinn 1: Inntekten mellom 217 400 og 306 049 kr (1,7 prosent trinnskatt)
        Trinn 2: Inntekten mellom 306 050 og 697 149 kroner kr (4 prosent trinnskatt)
        Trinn 3: Inntekten mellom 697 150 og 942 399 kr (13,7 prosent trinnskatt)
        Trinn 4: Inntekten mellom 942 400 og 1 410 749 kr (16,7 prosent trinnskatt)
        Trinn 5: Inntekten over 1 410 750 kr (17,7 prosent trinnskatt)
    */

    const steps = [
        { min: 217400, max: 306049, rate: 0.017 },
        { min: 306050, max: 697149, rate: 0.04 },
        { min: 697150, max: 942399, rate: 0.137 },
        { min: 942400, max: 1410749, rate: 0.167 },
        { min: 1410750, max: Infinity, rate: 0.177 },
    ]

    let trinnskatt = 0;

    for (const [i, step] of steps.entries()) {
        const stepTax = Math.max(0, (Math.min(yearlySalary, step.max) - step.min) * step.rate);
        trinnskatt += stepTax;

        console.debug(`Step ${i}, tax: ${stepTax}`)
    }

    return Math.max(trinnskatt, 0); // Ensure non-negative tax
}

function calculateInntektsskatt(taxableIncome: number): number {
    const incomeTaxRate = 0.22; // 22% flat tax in Norway
    return taxableIncome * incomeTaxRate;
}