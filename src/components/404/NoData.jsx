import { useTranslation } from 'react-i18next';
import MissingDataImg from '../../../public/images/general/nodata.jpg';
import './styles.css';
function NoData({ missingDataName }) {
  const { t } = useTranslation();
  return (
    <div className="nodata">
      <img src={MissingDataImg} alt="no-data" />
      <h3 className="text-gray-700">
        {t('dear_client_there_is_no')} {missingDataName}
      </h3>
    </div>
  );
}

export default NoData;
