import HashLoader from 'react-spinners/HashLoader';
import Logo from './../../../public/images/logos/abak.png';
function PageLoader() {
  return (
    <div className="page-loader">
      <HashLoader color="#216281" size={100} className="mb-8" />
      <img src={Logo} alt="logo" />
      <h3>تحميل بيانات النظام...</h3>
    </div>
  );
}
export default PageLoader;
