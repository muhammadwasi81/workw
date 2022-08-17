
export function ValidateSubmitVoucher(data) {
    let validateObj = { error: false, message: "" };
    if (data.details.length === 0) {
        validateObj.error = true;
        validateObj.message += "Empty voucher detail not allowed";
    }
    else if (data.totalDr !== data.totalCr) {
        validateObj.error = true;
        validateObj.message += "\nDebit & Credit amount must be equal";
    }
    else if (!data.voucherDate) {
        validateObj.error = true;
        validateObj.message += "\nVoucher Date Required";
    }
    else if (!data.voucherType) {
        validateObj.error = true;
        validateObj.message += "\nVoucher Type Required";
    }
    return validateObj;
}

//  function sum(a, b) {
//     return a + b
// }
// module.exports = {sum, ValidateSubmitVoucher}