import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer/index';
import { ROUTES } from '../../../../utils/routes';
import CreateAssetsEntryTable from './createAssetsEntryTable';
import Header from '../../../layout/header';

const AssetsEntry = () => {
  return (
    <>
      <TabbableContainer>
        <Header
          items={[
            {
              name: 'Create Assets',
              to: ROUTES.REQUISITION.CREATE_VOUCHERS,
            },
          ]}
        />
        <ContBody>
          <CreateAssetsEntryTable defaultRows={12} />
        </ContBody>
      </TabbableContainer>
    </>
  );
};

export default AssetsEntry;
