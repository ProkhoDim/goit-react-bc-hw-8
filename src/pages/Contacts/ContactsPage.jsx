import { AddContact, ContactsList } from 'components';

const ContactsPage = () => {
  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      <ContactsList />
      <AddContact />
    </div>
  );
};

export default ContactsPage;
