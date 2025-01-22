import { calculateFromNormalMonthlyNet } from '../Calculator'

describe('Salary Calculator', () => {
    test('Calculates correct monthly salary', () => {
        let result = calculateFromNormalMonthlyNet(42000);
        console.log(result);

        expect(Math.abs(result.normalMonthNet - 42000)).toBeLessThan(50);
    });
});