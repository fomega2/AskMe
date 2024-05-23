// import AskQuestiong from "./pages/askQuestion"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { QRCodeSVG } from 'qrcode.react';

const App = () => {
  return (
    <div className="mt-5 d-flex aligns-items-center justify-content-center card border-0 text-center container position-absolute top-50 start-50 translate-middle">
      <h2 className='text-white bg-success my-5 p-3 rounded-1'>Escanee el siguiente código QR con su teléfono para ir al sitio de preguntas</h2>
      <QRCodeSVG value="www.AskMeFabcaviDev.com/Ask" size={250} className='mx-auto'/>,
    </div>
  )
}

export default App