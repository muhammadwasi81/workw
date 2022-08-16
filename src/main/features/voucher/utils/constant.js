export const VOUCHER_ENUM = {
    DR_CR: {
        DR: 1,
        CR: 2
    }
}
export const voucherTypes = [
    { label: "Receipt Voucher", value: 1 },
    { label: "Payment Voucher", value: 2 },
    { label: "Other Voucher", value: 3 }
];

export const getVoucherNameByType = (type) => {
    let currentTypeData = voucherTypes.find(item => item.value === type);
    return currentTypeData.label
}