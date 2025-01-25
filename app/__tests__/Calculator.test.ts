import { calculateFromAnyValue } from '../Calculator'

describe('Salary Calculator', () => {
    test('Calculates correct salary from normal month net', () => {
        const result = calculateFromAnyValue(42000, "normalMonthNet");
        console.log(result);

        expect(Math.abs(result.normalMonthNet - 42000)).toBeLessThan(1);
    });

    test('Calculates correct salary from gross month', () => {
        const result = calculateFromAnyValue(64000, "monthlyGross");
        console.log(result);

        expect(Math.abs(result.monthlyGross - 64000)).toBeLessThan(1);
    });

    test('Calculates correct salary from net month', () => {
        const result = calculateFromAnyValue(50000, "monthlySalaryNet");
        console.log(result);

        expect(Math.abs(result.monthlySalaryNet - 50000)).toBeLessThan(1);
    });

    test('Calculates correct salary from net yearly', () => {
        const result = calculateFromAnyValue(300000, "yearlySalaryNet");
        console.log(result);

        expect(Math.abs(result.yearlySalaryNet - 300000)).toBeLessThan(1);
    });

    test('Calculates correct salary from vaccation money', () => {
        const result = calculateFromAnyValue(70000, "vacationMoney");
        console.log(result);

        expect(Math.abs(result.vacationMoney - 70000)).toBeLessThan(1);
    });

    test('Calculates correct salary from adjusted net', () => {
        const result = calculateFromAnyValue(60000, "netMonthlyAdjusted");
        console.log(result);

        expect(Math.abs(result.netMonthlyAdjusted - 60000)).toBeLessThan(1);
    });

    test('Calculates correct salary from december net', () => {
        const result = calculateFromAnyValue(60000, "decemberMonthNet");
        console.log(result);

        expect(Math.abs(result.decemberMonthNet - 60000)).toBeLessThan(1);
    });

    test('Calculates correct salary from yearly gross', () => {
        const result = calculateFromAnyValue(60000, "yearlyGross");
        console.log(result);

        expect(Math.abs(result.yearlyGross - 60000)).toBeLessThan(1);
    });
});