import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { businessPolicyDictionaryList } from "../../localization";
import "./style.css"
export default function PolicyDetail({ item }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { businessPolicyDictionary, Direction } = businessPolicyDictionaryList[
    userLanguage
  ];
  const {
    businessPolicy,
    policies,
    description,
    search,
  } = businessPolicyDictionary;
  return (
    <div className="approvalDetail">
      <div className="policyHeader colorTheme">{description}</div>

      <div className="policycard">
        
        <div className="!flex !flex-row">
          <div className="row flex-1 !w-max !mb-0 font-bold">{item.name}</div>
          <div className="w-max mr-2">
            <div className="policyTag">
              {item.typeId === 1 ? "HR" : item.typeId === 2 ? "Other" : ""}
            </div>
          </div>
        </div>
        <div
          className="row !mb-0 mt-4"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
      </div>
    </div>
  );
}
