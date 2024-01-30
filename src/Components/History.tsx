import React from 'react';
import { ILocationInfo } from './Home';

interface HistoryProps {
  history: ILocationInfo[];
  setIpInfo: React.Dispatch<React.SetStateAction<ILocationInfo>>;
}

const History = ({ history, setIpInfo }: HistoryProps) => {
  const handleIpInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const ip = event.currentTarget.id;
    const prevHistory = localStorage.getItem('jlabs-exam-history') || '[]';
    const parsedPrevHistory = JSON.parse(prevHistory) as ILocationInfo[];
    const foundHistoryDetail = parsedPrevHistory.find(
      (historyDetail) => historyDetail.ip === ip
    );
    if (foundHistoryDetail) setIpInfo(foundHistoryDetail);
  };

  return (
    <div className='mt-4'>
      <h2>Location History</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>IP</th>
            <th>City</th>
            <th>Region</th>
            <th>Country</th>
            <th>Location</th>
            <th>Organization</th>
            <th>Postal Code</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((location, index) => (
            <tr key={index}>
              <td>{location.ip}</td>
              <td>{location.city}</td>
              <td>{location.region}</td>
              <td>{location.country}</td>
              <td>{location.loc}</td>
              <td>{location.org}</td>
              <td>{location.postal}</td>
              <td>{location.timezone}</td>
              <td>
                <button
                  type='button'
                  id={location.ip}
                  className='btn btn-primary ms-2'
                  onClick={handleIpInfo}
                >
                  Use
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
