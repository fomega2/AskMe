import React from 'react';
import { IMessageInfo } from './iMessageInfo';

interface ViewMessagesListProps {
  items: IMessageInfo[];
}

const ViewMessagesList: React.FC<ViewMessagesListProps> = ({ items }) => {
  return (
    <>
      <div className='container mt-5'>
        <div className='card border-2 border-success '>
          <div className='card-body'>
            <table className="table table-striped">
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <p className="h5"> - {item.question}</p>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMessagesList;
