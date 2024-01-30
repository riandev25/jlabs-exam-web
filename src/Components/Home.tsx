import { useCallback, useEffect, useState } from 'react';
import IpSearchInput from './IpSearchInput';
import IpInformation from './IpInformation';
import History from './History';

export interface ILocationInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface IHome {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ setIsAuthenticated }: IHome) => {
  const [ipInfo, setIpInfo] = useState<ILocationInfo>({
    ip: '',
    city: '',
    region: '',
    country: '',
    loc: '',
    org: '',
    postal: '',
    timezone: '',
  });

  const [history, setHistory] = useState<ILocationInfo[]>([]);

  const getLocationInfo = useCallback(
    async (ip?: string): Promise<ILocationInfo | undefined> => {
      try {
        const apiUrl = ip
          ? `https://ipinfo.io/${ip}/json?token=622b4198fd0b53`
          : 'https://ipinfo.io/json?token=622b4198fd0b53';

        const response = await fetch(apiUrl);
        const data: ILocationInfo = await response.json();
        setIpInfo(data);
        return data;
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    },
    []
  );

  const handleLogout = () => {
    localStorage.setItem('jlabs-exam-authenticated', 'false');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocationInfo();
        const historyDetails =
          localStorage.getItem('jlabs-exam-history') || '[]';
        const parsedHistoryDetails = JSON.parse(
          historyDetails
        ) as ILocationInfo[];
        if (data) {
          // Use the result of the find operation
          const foundHistoryDetail = parsedHistoryDetails.find(
            (historyDetail) => historyDetail.ip === data.ip
          );
          if (foundHistoryDetail) return;
          const updatedHistory = [
            ...parsedHistoryDetails,
            {
              ip: data.ip,
              city: data.city,
              region: data.region,
              country: data.country,
              loc: data.loc,
              org: data.org,
              postal: data.postal,
              timezone: data.timezone,
            },
          ];
          localStorage.setItem(
            'jlabs-exam-history',
            JSON.stringify(updatedHistory)
          );
          setHistory(updatedHistory);
        }
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, [getLocationInfo]);

  useEffect(() => {
    const historyDetails = localStorage.getItem('jlabs-exam-history') as string;
    const parsedHistoryDetails = JSON.parse(historyDetails) as ILocationInfo[];
    setHistory(parsedHistoryDetails);
  }, []);

  return (
    <>
      <div className='container mt-4'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className='container mt-5'>
        <h1 className='mb-4'>IP and Geolocation Information</h1>
        <IpSearchInput
          getLocationInfo={getLocationInfo}
          setHistory={setHistory}
        />
        <IpInformation ipInfo={ipInfo} />
        <History history={history} setIpInfo={setIpInfo} />
      </div>
    </>
  );
};

export default Home;
