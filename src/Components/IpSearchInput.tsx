import { useState } from 'react';
import { ILocationInfo } from './Home';

interface IPSearchInputProps {
  getLocationInfo: (ip?: string) => Promise<ILocationInfo | undefined>;
  setHistory: React.Dispatch<React.SetStateAction<ILocationInfo[]>>;
}

const IpSearchInput = ({ getLocationInfo, setHistory }: IPSearchInputProps) => {
  const [inputIP, setInputIP] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIP(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await getLocationInfo(inputIP);
    if (data) {
      const prevHistory = localStorage.getItem('jlabs-exam-history') || '[]';
      const parsedPrevHistory = JSON.parse(prevHistory) as ILocationInfo[];
      const foundHistoryDetail = parsedPrevHistory.find(
        (historyDetail) => historyDetail.ip === data.ip
      );
      if (foundHistoryDetail) return;
      const updatedHistory = [
        ...parsedPrevHistory,
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
      setInputIP('');
      localStorage.setItem(
        'jlabs-exam-history',
        JSON.stringify(updatedHistory)
      );
      setHistory(updatedHistory);
    }
  };

  const handleClear = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await getLocationInfo();
    setInputIP('');
  };

  return (
    <form className='input-group mb-3' onSubmit={handleSearch}>
      <input
        type='text'
        className='form-control'
        placeholder='Enter IP Address'
        title='Please provide a valid IP Address'
        pattern='^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        value={inputIP}
        onChange={handleInputChange}
      />
      <div className='d-flex'>
        <button type='submit' className='btn btn-primary me-2'>
          Search
        </button>
        <button
          type='button'
          className='btn btn-primary ms-2'
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default IpSearchInput;
