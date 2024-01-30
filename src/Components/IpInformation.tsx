import { ILocationInfo } from './Home';

interface IIpInformation {
  ipInfo: ILocationInfo;
}

const IpInformation = ({ ipInfo }: IIpInformation) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title'>Details</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <strong>IP Address:</strong> {ipInfo.ip}
          </li>
          <li className='list-group-item'>
            <strong>Location:</strong>{' '}
            {`${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`}
          </li>
          <li className='list-group-item'>
            <strong>Timezone:</strong> {ipInfo.timezone}
          </li>
          <li className='list-group-item'>
            <strong>Organization:</strong> {ipInfo.org}
          </li>
          <li className='list-group-item'>
            <strong>Postal Code:</strong> {ipInfo.postal}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IpInformation;
