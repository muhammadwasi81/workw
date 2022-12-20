import { ALLOWANCE_ENUM } from '../../allowance/view/enum';

export const calculateAllowance = (
  allowanceData = [],
  gradeId = null,
  basicSalary = 0
) => {
  let totalAllowance = 0;
  let totalDeductions = 0;
  let details = [];
  // Filteration of Allowances behalf of Grade, AllowanceUnit & Allowance Type =>
  let filteredAllowance = allowanceData.filter(
    (item) => item.gradeId === gradeId
  );
  let filterBenefit = filteredAllowance.filter(
    (item) => item.allowanceUnit === ALLOWANCE_ENUM.UNIT.BENEFIT
  );
  let filterDeduction = filteredAllowance.filter(
    (item) => item.allowanceUnit === ALLOWANCE_ENUM.UNIT.DEDUCTION
  );
  let filterBenefit_inPercent = filterBenefit.filter(
    (item) => item.allowanceType === ALLOWANCE_ENUM.TYPE.PERCENT
  );
  let filterBenefit_inAmount = filterBenefit.filter(
    (item) => item.allowanceType === ALLOWANCE_ENUM.TYPE.AMOUNT
  );
  let filterDeduction_inPercent = filterDeduction.filter(
    (item) => item.allowanceType === ALLOWANCE_ENUM.TYPE.PERCENT
  );
  let filterDeduction_inAmount = filterDeduction.filter(
    (item) => item.allowanceType === ALLOWANCE_ENUM.TYPE.AMOUNT
  );
  // Add all Benefits & Deduction in Amount =>
  totalAllowance += filterBenefit_inAmount.reduce((a, b) => a + b.value, 0);
  totalDeductions += filterDeduction_inAmount.reduce((a, b) => a + b.value, 0);
  // Calculate Benefits & Deduction Percent of Basic Salary then add =>
  totalAllowance += filterBenefit_inPercent.reduce(
    (a, b) => a + (b.value / 100) * basicSalary,
    0
  );
  totalDeductions += filterDeduction_inPercent.reduce(
    (a, b) => a + (b.value / 100) * basicSalary,
    0
  );
  // Create Detail
  details = [
    ...details,
    ...filterBenefit_inAmount.map((item) => ({
      allowanceId: item.id,
      allowance: item.value,
    })),
    ...filterDeduction_inAmount.map((item) => ({
      allowanceId: item.id,
      allowance: item.value,
    })),
    ...filterBenefit_inPercent.map((item) => ({
      allowanceId: item.id,
      allowance: (item.value / 100) * basicSalary,
    })),
    ...filterDeduction_inPercent.map((item) => ({
      allowanceId: item.id,
      allowance: (item.value / 100) * basicSalary,
    })),
  ];
  // then return final result
  return {
    totalAllowance,
    totalDeductions,
    details,
  };
};
