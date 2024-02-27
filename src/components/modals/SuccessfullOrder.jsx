import { Link } from 'react-router-dom';
import './style.css';
import { useState, useTransition } from 'react';
import { t } from 'i18next';
import Approved from '../svg/Approved';
import { useTranslation } from 'react-i18next';
function SuccessfullOrder({onClose}) {
  const [modalOpen, setModalOpen] = useState(true);
  const { t } = useTranslation();

  const handleCloseModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className={
          modalOpen ? 'modal-container flex' : 'modal-container hidden'
        }
      >
        <div className="flex flex-col items-center justify-center">
          <Approved />

          <div className="notice">
            <p>
              <span>{t("cong") }</span>
              {t("our_dear_client_cong") }
              <br />
             {t("cong_description")}
            </p>
            <div className="modal-actions flex items-center justify-center gap-14 px-14 pt-10">
              <Link to="user-panel">
                <button className="succuss-btn dashboard-visit ">
                 {t("control_panel")}
                </button>
              </Link>

              <button
                className="succuss-btn home-stay "
                onClick={handleCloseModal}
              >
                {' '}
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={modalOpen ? 'overlay block' : 'hidden'}> </div>
    </>
  );
}

export default SuccessfullOrder;
