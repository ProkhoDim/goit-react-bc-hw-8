import { AddContact, ContactsList } from 'components';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <>
      <div className={css.background} />
      <div className={css.wrap}>
        <ContactsList />
        <AddContact />
      </div>
    </>
  );
};

export default ContactsPage;
