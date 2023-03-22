import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import TopBar from '../../../../sharedComponents/topBar/topBar';
import '../Styles/company.css';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { companyDictionaryList } from '../localization/index';
import { getCompanyAction } from '../store/action';
import CompanyTableView from './TeamTableView';
import Header from '../../view/Header/Header';
import {
  ContBody,
  TabbableContainer,
} from '../../../../sharedComponents/AppComponents/MainFlexContainer';
import CompanyShortCard, { CardGrid } from './CompanyShortCard';
import { NoDataFound } from './../../../eLearning/view/Dashboard/Components/index';

function CompanyList() {
  const [view, setView] = useState('List');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { userLanguage } = useContext(LanguageChangeContext);
  const { companyDictionary, Direction } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.sharedLabels;
  const { companies, loader } = useSelector((state) => state.companySlice);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.website.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredCompanies, 'filteredCompanies');

  useEffect(() => {
    dispatch(getCompanyAction(search));
  }, []);

  let classes = 'teamListContainer ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';
  if (loader) {
    return (
      <div className={classes}>
        {[...Array(40)].map(() => (
          <>
            <Skeleton.Avatar shape={'circle'} size={'large'} />
            <Skeleton loading={true} active></Skeleton>
          </>
        ))}
      </div>
    );
  }
  return (
    <>
      <TabbableContainer>
        <Header />
        <ContBody>
          <div style={{ flexDirection: 'column', width: '100%' }}>
            <TopBar
              style={{ margin: 0, width: '100%' }}
              onSearch={(val) => setSearch(val)}
              segment={{
                onSegment: (value) => {
                  setView(value);
                },
                label1: labels.list,
                label2: labels.table,
              }}
            />
            {filteredCompanies.length > 0 ? (
              view === 'List' ? (
                <>
                  <CardGrid>
                    {companies.map((team, index) => {
                      return <CompanyShortCard key={index} company={team} />;
                    })}
                  </CardGrid>
                </>
              ) : (
                <CompanyTableView />
              )
            ) : (
              <NoDataFound />
            )}
          </div>
        </ContBody>
      </TabbableContainer>
    </>
  );
}
export default CompanyList;
