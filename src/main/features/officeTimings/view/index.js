import { useDispatch, useSelector } from 'react-redux';
import {useContext } from "react";
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import OfficeTimingComposer from './officeTimingComposer';
import {
  addOfficeTimingGroup,
  removeGrade,
  updateGrade,
} from '../store/actions';

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../utils/localization/languages";


import OfficeTimingTable from './table.js';
import { handleOpenComposer } from '../store/slice';

export default function OfficeTiming() {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,office,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.officeTimingSlice);

  // const handleDelete = (e) => {
  //   dispatch(removeGrade(e));
  // };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addOfficeTimingGroup(e));
      return;
    }
    // dispatch(updateGrade(e));
    // setGrade(initialState);
  };
  return (
    <AdminContainer>
      <div
        className="headerView"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '10px',
        }}
      >
        <div className="right-menu">
          <div className="btn-hld">
            <SideDrawer
              title={administration.office.new}
              buttonText= {administration.office.create}
              handleClose={() => dispatch(handleOpenComposer(false))}
              handleOpen={() => dispatch(handleOpenComposer(true))}
              isOpen={drawerOpen}
              children={<OfficeTimingComposer />}
            />
          </div>
        </div>
      </div>
      <OfficeTimingTable
        // handleEdit={setOfficeTimingGroups}
        // handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
