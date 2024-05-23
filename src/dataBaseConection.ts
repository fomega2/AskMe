import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";
import { firebaseConfig } from "./firebase.config";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const database = getDatabase(app);
export { database };

// Función para agregar datos a la base de datos
export const addQuestion = (personName: string, question: string) => {
    const questionsRef = ref(database, 'questions');
    const newQuestionRef = push(questionsRef);
    set(newQuestionRef, {
        personName: personName,
        question: question
    });
};
