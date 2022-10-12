
export const calculateNetSalary = (d) => {
    let netSalary = d.basicSalary - d.loan + d.allowance - d.deduction - d.tax - d.rebate + d.bonus + d.other;
    return netSalary
}