import { IMessageInfo } from "./iMessageInfo";

interface ViewMessagesListProps {
    items: IMessageInfo[];
    itemsPerPage: number
  }

const FullScreen: React.FC<ViewMessagesListProps> = ({ items }) => {
  return (
   <div>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {items.map((item, index) => (
            <div key={index}>
              <p className='text-center my-5 text-white' style={{ fontSize: '3rem' }}>{item.question}</p>
            </div>
          ))}
        </div>        
   </div> 
  )
}

export default FullScreen