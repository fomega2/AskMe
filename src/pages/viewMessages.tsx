import { off, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { database } from '../dataBaseConection';
import { IMessageInfo } from './iMessageInfo';
import ViewMessagesList from './viewMessagesList';

const ViewMessages = () => {
    const [questions, setQuestions] = useState<IMessageInfo[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(1);    
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState<IMessageInfo[]>([]);

    useEffect(() => {
        const questionsRef = ref(database, 'questions');
        onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const questionsArray = Object.values(data) as never;
                setQuestions(questionsArray);
            } else {
                setQuestions([]);
            }
        });

        // Cleanup listener on unmount
        return () => {
            off(questionsRef);
        };
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(questions.slice(itemOffset, endOffset));
    }, [itemOffset, itemsPerPage, questions]);

    const pageCount = Math.ceil(questions.length / itemsPerPage);

    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % questions.length;
        setItemOffset(newOffset);        
    };

    return (
        <div className="mt-5 d-flex aligns-items-center justify-content-center card border-0 text-center container position-absolute top-50 start-50 translate-middle">
            <div className='row justify-content-between mb-5'>
                <div className='col-md-3 mt-2 col-sm-auto'>
                    <label className='fw-bold' htmlFor="itemsPerPage">Seleccione las preguntas por página</label>
                    <select id='itemsPerPage' name='itemsPerPage' className='form-control form-control-lg' onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <div className='col-md-3 mt-2 col-sm-auto'>
                    <span className='fw-bold d-block'>Preguntas totales:</span>
                    <span className='h2 text-success'>{questions.length}</span>
                </div>
            </div>
            <ViewMessagesList items={currentItems} itemsPerPage={itemsPerPage} />
            <div className='mt-5'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default ViewMessages;
