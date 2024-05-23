import { useEffect, useState } from "react";
import { addQuestion } from "../dataBaseConection";
import { ToastContainer, toast } from 'react-toastify';
import '../../src/index.css'
const AskQuestiong = () => {
  const [personName, setPersonName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  useEffect(()=>{
    setPersonName("Anónimo")
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(question.trim().length === 0){
      toast.warning("No puede hacer un pregunta en blanco");
      return;
    }

    if(question.length < 10){
      toast.warning("La pregunta debe tener al menos 10 caracteres");
      return;
    }            

    makeQuestion();
  };

  const makeQuestion = async ()=>{
    try {
      await addQuestion(personName, question);
      setQuestion("");
      toast.success("Pregunta enviada exitosamente");            
    } catch (error) {
      toast.error("Ocurrió un error al enviar la pregunta");
      console.error("Error al enviar la pregunta:", error);
    }    
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div
          className="card text-white border-success border-2">
          <div className="card-header">
            <h4 className="card-title text-center text-black-50 my-4">¡Bienvenido {personName} has una pregunta!</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <textarea
                  rows={10}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  name="question" 
                  id="question"
                  className="form-control form-control-lg d-block"  placeholder="Escribe la pregunta en este cuadro de texto"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex m-5">
          <button className="btn btn-lg btn-success mx-auto">Enviar pregunta</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default AskQuestiong