
export function ValidateAddMultipleSalary(data) {
    let validateObj = { error: false, message: "" };
    console.log(data)
    if (data.length === 0) {
        validateObj.error = true;
        validateObj.message += "atlease one salary required";
    }
    if (data.filter(it => it.approvers.length === 0).length > 0) {
        validateObj.error = true;
        validateObj.message += "Approvers Required";
    }
    // else if (data.totalDr !== data.totalCr) {
    //     validateObj.error = true;
    //     validateObj.message += "\nDebit & Credit amount must be equal";
    // }
    // else if (!data.voucherDate) {
    //     validateObj.error = true;
    //     validateObj.message += "\nVoucher Date Required";
    // }
    // else if (!data.voucherType) {
    //     validateObj.error = true;
    //     validateObj.message += "\nVoucher Type Required";
    // }
    return validateObj;
}
