import { useContext } from 'react';
import moment from 'moment';
import WhiteCard from './WhiteCard';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { projectsDictionaryList } from '../localization';

function Budget({ data }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { labels } = projectsDictionary;

  return (
    <WhiteCard className={'text-base'}>
      <div className="flex flex-col gap-2">
        <div className="text-base p-5 bg-neutral-100 flex justify-between rounded-lg">
          <span className="text-primary-color text-base font-semibold">
            {labels.totalBudget}
          </span>
          <span className="text-black font-semibold">{data?.totalBudget}</span>
        </div>
        <div className="text-base p-5 bg-neutral-100 flex justify-around rounded-lg font-bold">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-green-500">{data?.balanceAmount}</span>
            <span className="text-gray-500 font-semibold">
              {' '}
              {labels.balance}
            </span>
          </div>
          <div className="border-r-2 border-gray-500" />
          <div className="flex flex-col gap-3 text-center">
            <span className="text-red-600 ">{data?.spendAmount}</span>
            <span className="text-gray-500 font-semibold"> {labels.spent}</span>
          </div>
        </div>
        <div className="text-base p-5 bg-neutral-100 flex flex-col rounded-lg font-bold">
          <div className="border-b-2 border-gray-500 text-center pb-3">
            <span className="text-primary-color text-center w-full">
              {labels.deadline}
            </span>
          </div>
          <div className="flex w-full justify-around ">
            <div className="flex flex-col gap-3 text-center pt-3">
              <span className="text-green-600">
                {moment(data?.startDate).date()}
              </span>
              <span className="text-gray-500 font-semibold">
                {moment(data?.startDate).format('MMM YYYY')}
              </span>
            </div>
            <div className="border-r-2 border-gray-500" />
            <div className="flex flex-col gap-3 text-center pt-3">
              <span className="text-red-600">
                {moment(data?.endDate).date()}
              </span>
              <span className="text-gray-500 font-semibold">
                {moment(data?.endDate).format('MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </WhiteCard>
  );
}

export default Budget;
