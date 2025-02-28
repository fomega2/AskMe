import { CSSProperties, useEffect, useState } from "react";
import { addQuestion } from "../dataBaseConection";
import { ToastContainer, toast } from 'react-toastify';
import '../../src/index.css'
import ClipLoader from "react-spinners/ClipLoader";

const AskQuestiong = () => {
  const [personName, setPersonName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#198754",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersonName("Anónimo")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if(question === "soyElAdmin"){
      sessionStorage.clear()
      toast.warning("Conteo reiniciado");
      return;
    }

    const successQuestions = sessionStorage.getItem("successQuestions");
    if(successQuestions && Number(successQuestions) > 3){
      toast.warning("Tiene un máximo de tres preguntas");
      setQuestion("");
      return;
    }

    e.preventDefault();
    if (question.trim().length === 0) {
      toast.warning("No puede hacer un pregunta en blanco");
      return;
    }

    if (question.length < 10) {
      toast.warning("La pregunta debe tener al menos 10 caracteres");
      return;
    }

    if (question.length > 400) {
      toast.warning("La pregunta no debe pasar de 400 caracteres");
      return;
    }

    makeQuestion();
  };

  const makeQuestion = async () => {
    try {
      await addQuestion(personName, question);
      setQuestion("");
      toast.success("Pregunta enviada exitosamente");
      
      saveSuccessQuestionAtempsInSession();      

    } catch (error) {
      toast.error("Ocurrió un error al enviar la pregunta");
      console.error("Error al enviar la pregunta:", error);
    }
  }

  const saveSuccessQuestionAtempsInSession = () =>{
    const successQuestions = sessionStorage.getItem("successQuestions");
      if(!successQuestions){
        sessionStorage.setItem("successQuestions", "1")
      }else{
        const acuSuccess = Number(successQuestions) + 1
        sessionStorage.setItem("successQuestions", acuSuccess.toString())
      }
  }

  return (
    <div className="mt-3 d-flex aligns-items-center justify-content-center card border-0 text-center container position-absolute top-50 start-50 translate-middle">
      {
        !loading ?
          <form onSubmit={handleSubmit}>
            <div
              className="card text-white border-success border-2">
              <div className="card-header">
                <h4 className="card-title text-center text-black-50 my-4">¡Bienvenido!</h4>
                <h4 className="card-title text-center text-black-50 my-4">¡Has una pregunta!</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <textarea
                      rows={8}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      name="question"
                      id="question"
                      maxLength={400}
                      className="form-control form-control-lg d-block" placeholder="Escribe la pregunta en este cuadro de texto"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex m-5">
              <button className="btn btn-lg btn-success mx-auto">Enviar pregunta</button>
            </div>
          </form>
          :
          <div className="">
            <ClipLoader
              color={'#198754'}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
      }
      <ToastContainer />
    </div>
  )
}

export default AskQuestiong