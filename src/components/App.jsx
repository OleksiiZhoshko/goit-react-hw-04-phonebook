import { useState, useEffect } from 'react';
import PhoneBook from './PhoneBook/PhoneBook';
import Comtacts from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import Filter from './ContactsFilter/ContactsFilter';

// export function App() {
//   const [contacts, setContacts] = useState([
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);
//   const [filter, setFilter] = useState('');

//   const addContact = ( name, number ) => {
//     if (contacts.find(contact => contact.name === name)) {
//       alert(`Sorry, ${name} is already in contacts.`);
//       return;
//     }
//     setContacts(prevContacts => [...prevContacts, { id: nanoid(), name, number }],
//     );
//   };

//   const deleteContacts = id => {
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== id),
//     );
//   };

//   const filterContacts = event => {
//     setFilter(event.target.value);
//   };

//   const filterInputContacts =contacts=> contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   });

//       const saveContacts = localStorage.getItem('contacts');
//       if (saveContacts !== null) {
//         const parseContacts = JSON.parse(saveContacts);
//         setContacts(()=> parseContacts );
//   }

const CONTACTS_BOOK = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getInitialContacts = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  if (parsedContacts) {
    return parsedContacts;
  } else {
    return CONTACTS_BOOK;
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`Sorry, ${name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name, number },
    ]);
  };

  const deleteContacts = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContacts = evt => {
    setFilter(evt.target.value);
  };

  let filterInputContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phone book</h1>

      <PhoneBook onHendleCenge={addContact} />

      <h2>Contacts</h2>

      <Filter filter={filter} onFilterInput={filterContacts} />
      <Comtacts
        contacts={filterInputContacts}
        onDeleteContacts={deleteContacts}
      />
    </>
  );
};
