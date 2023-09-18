import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Contact = {
  id: string;
  name: string;
};

type ContextProps = {
  contacts: Contact[];
  createContact: (id: string, name: string) => void;
};

type ContactsProviderProps = {
  children: React.ReactNode;
};

const ContactsContext = React.createContext<ContextProps>({
  contacts: [],
  createContact: () => null,
});

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id: string, name: string) => {
    console.log("Creating contact : ", id, name);
    setContacts((prevContacts: Contact[]) => {
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
