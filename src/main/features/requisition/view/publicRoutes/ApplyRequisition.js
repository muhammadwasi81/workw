import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetRequisitionById } from "../../store/actions";
import BusinessLogo from "../../../../../content/systemLogo.png";
import miletapLogo from "../../../../../content/miletapLogo.png";
import { handleOpenOfferComposer } from "../../store/slice";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import CreateOffer from "../myRequisitionDetail/createOffer";

const RequisitionDetails = (props) => {
  // const { userLanguage } = useContext(LanguageChangeContext);
  // const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //call career by id function
    dispatch(GetRequisitionById(id));
  }, []);

  const { drawerOpenOffer, Detail } = useSelector(
    (state) => state.requisitionSlice
  );

  const {
    offer,
    budget,
    createDate,
    description,
    businessName,
    businessAddress,
    creator,
    endDate,
    name,
    deadline,
  } = Detail;

  const handleOpenhandler = () => {
    dispatch(handleOpenOfferComposer(true));
  };
  return (
    <>
      <div className="job-let-view">
        <div className="job-let-view-header">
          <div className="platform-logo">
            <img src={BusinessLogo} />
          </div>
        </div>
        <div className="job-let-card">
          <div className="job-let-header">
            <div className="job-let-company">
              <div className="company-logo">
                <img src={miletapLogo} />
              </div>
              <div className="company-name">{businessName}</div>
            </div>
            <div className="job-let-det">
              <div className="job-let-det-top">
                <div className="job-let-title">{name}</div>
                <div
                  className="job-let-apply-btn ThemeBtn"
                  onClick={handleOpenhandler}
                >
                  Apply
                </div>
              </div>
              <div className="job-let-location">{creator?.email}</div>
              <div className="job-basics">
                <div className="job-date flex">
                  <div className="deadline flex-col">
                    <div className="job-basics-label font-bold">Deadline</div>
                    <div className="job-basics-value">
                      {deadline ? moment(deadline).format("Do MMM YY") : "-"}
                    </div>
                  </div>
                  <div className="budget flex-col ml-10">
                    <div className="job-basics-budget font-bold">Budget</div>
                    <div className="job-basics-value">
                      {budget ? budget : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="job-let-section">
            <div className="job-let-desc">
              <h2>Description</h2>
              {description}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            {"Create Offer"}
          </h1>
        }
        width="768"
        onClose={() => {
          dispatch(handleOpenOfferComposer(false));
        }}
        visible={drawerOpenOffer}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <CreateOffer />
      </Drawer>
    </>
  );
};
export default RequisitionDetails;
