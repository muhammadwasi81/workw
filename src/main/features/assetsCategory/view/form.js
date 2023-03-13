import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { Input, Select } from "antd";
import { FormButtonContainer } from "../../../sharedComponents/StyledComponents/adminForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllChartOfAccount } from "../../chartOfAccount/store/actions";
import { assetsCategoryDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const AssetsCategoryForm = ({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assetsDictionary } = assetsCategoryDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const [form, setForm] = useState(data);

  const { listData } = useSelector((state) => state.chartOfAccountsSlice);
  const { loader } = useSelector((state) => state.assetsCategorySlice);

  console.log(loader, "listData");

  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);

  const handleClear = () => {
    setForm({
      ...form,
      name: "",
      description: "",
      accountName: "",
      parentId: "",
    });
    setClearButton(false);
  };
  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handleDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, description: e.target.value });
  };
  const handelChangeBranch = (e) => {
    if (e.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, accountName: e, parentId: undefined });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  const accountTypes = [
    { id: 1, label: assetsDictionary.assets },
    { id: 2, label: assetsDictionary.liability },
    { id: 3, label: assetsDictionary.capital },
    { id: 4, label: assetsDictionary.revenue },
    { id: 5, label: assetsDictionary.expense },
    { id: 6, label: assetsDictionary.costOfGoodsale },
  ];

  return (
    <FormContainer>
      <FormHeader>{assetsDictionary.assetsCategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{assetsDictionary.categoryName}</FormLabel>
          <Input
            placeholder={assetsDictionary.enterCategoryName}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{assetsDictionary.desc}</FormLabel>
          <Input.TextArea
            value={form.description}
            placeholder={assetsDictionary.enterDesc}
            onChange={handleDescription}
          />
        </FormInput>
        {!data.parentId ? (
          <FormInput>
            <FormLabel>{assetsDictionary.accountType}</FormLabel>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={assetsDictionary.selectType}
              defaultValue={form.accountName}
              optionFilterProp="children"
              onChange={handelChangeBranch}
              value={form.accountName}
              size="large"
            >
              {accountTypes.map((item, i) => (
                <Select.Option value={item.id} key={i}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
        ) : null}

        {!data.accountId ? (
          <FormInput>
            <FormLabel>{assetsDictionary.parentAccount}</FormLabel>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={assetsDictionary.selectParent}
              defaultValue={form.parentId}
              optionFilterProp="children"
              onChange={(e) => setForm({ ...form, parentId: e })}
              value={form.parentId}
              size="large"
            >
              {listData.map((item, i) => (
                <Select.Option value={item.id} key={i}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
        ) : null}
      </FormInputContainer>
      <FormButtonContainer>
        {form.id ? (
          <>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              loading={loader}
              onClick={(e) => {
                onSubmit(form);
                setClearButton(false);
              }}
            >
              {assetsDictionary.save}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={(e) => {
              onSubmit(form);
              setClearButton(false);
            }}
            loading={loader}
          >
            {assetsDictionary.add}
          </FormButton>
        )}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={handleClear}
          >
            {assetsDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
};

export default AssetsCategoryForm;
