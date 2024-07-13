import React from 'react';
import { IMessageInfo } from './iMessageInfo';

interface ViewMessagesListProps {
  items: IMessageInfo[];
  itemsPerPage: number
}

const ViewMessagesList: React.FC<ViewMessagesListProps> = ({ items, itemsPerPage }) => {
  return (
    <div className='my-5'>
      {itemsPerPage === 1 && (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {items.map((item, index) => (
            <div key={index}>
              <p className='text-center my-5' style={{ fontSize: '2rem' }}>{item.question}</p>
            </div>
          ))}
        </div>
      )}

      {
        itemsPerPage >= 5 &&
        <div className='container mt-5'>
          <div className='card border-2 border-success '>
            <div className='card-body'>
              <table className="table table-striped">
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.question}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ViewMessagesList;
