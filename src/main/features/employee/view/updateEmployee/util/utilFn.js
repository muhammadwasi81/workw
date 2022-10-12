export const validate = (value) => {
  return value.length > 0 ? true : false;
};
export const filtering = (data) => {
  const newdata = data?.map((item) => {
    const taxable = item.isTaxable == true ? "Taxable" : "Non-Taxable";
    const type = item.allowanceType === 1 ? "Benefit" : "Deduction";
    const unit = item.allowanceUnit === 1 ? "Percent" : "Amount";
    return {
      ...item,
      isTaxable: taxable,
      allowanceType: type,
      allowanceUnit: unit,
    };
  });

  return newdata;
};

export const filteringBack = (data) => {
  console.log("asda", data.isTaxable);
    if (data.isTaxable || data.allowanceType || data.allowanceUnit) {
      const taxable = data.isTaxable === "Non-Taxable" ? false : true;
      const type = data.allowanceType === "Benefit" ? 1 : 2;
      const unit = data.allowanceUnit === "Percent" ? 1 : 2;
      return {
        ...data,
        isTaxable: taxable,
        allowanceType: type,
        allowanceUnit: unit,
      };
      
    }
    if (data.designationName) {
      return {
        ...data,
        designationId: data.designationName,
      };
    }
  return data;
};
