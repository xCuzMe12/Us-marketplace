import { useState } from "react";

// { items: [], heading: string }
interface Props {
  items: string[];
  heading: string;

  onSelectItem: (item: string) => void;
}


function ListGroup({items, heading, onSelectItem}: Props) {  //namest props smo dal {items, heading}
 

  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //arr[0] selected index
  //arr[1] updater function

  // v returnu samo html in react components razen {}
  return (
    //rabs <> in </> zato da lahko vec elementov vrnes. Loh bi jih tut u div zapakeru al pa manualy inportu fragment pa dou v <fragment> </Fragment>
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            key={item}
            onClick={() => {setSelectedIndex(index); onSelectItem(item)}}
          >
            {item}
          </li>
        ))}
        
      </ul>
    </>
    //ker ni for loopov mors convertat vsak item na tak nacin v li element (<li className="list-group-item">{item}</li>)
  );
}

export default ListGroup;
