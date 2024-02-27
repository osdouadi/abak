import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function SupportClient() {
  const { t } = useTranslation();
  return (
    <div className="user-panel">
      <div className="banner">
        <h1 className=" page-title text-center p-20">{t('client_support')}</h1>
      </div>
      <div className="content">
        <h1 className="page-sub-title mb-14 text-black">
          {' '}
          {t('client_support')}
        </h1>
        <div className="support-content pb-10">
          <p className="text-black">{t('client_support_description')}</p>
        </div>
        <h1 className=" page-sub-title mb-14 text-black">
          {t('request_support')}
        </h1>
        <div className="support-methods py-4 mt-3">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <FaRegEnvelopeOpen className="support-icon" />
              <h3 className="text-black">{t('email')}</h3>
            </div>
            <p className="text-black">abakoffice@support.com</p>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <MdOutlinePhoneInTalk className="support-icon" />
              <h3 className="text-black">{t('phone')}</h3>
            </div>
            <p className="text-black">0999867808</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportClient;
