import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const onePerson = await getContactById(id);
      console.log(onePerson);
      break;

    case "add":
      const newPerson = await addContact(name, email, phone);
      console.log(newPerson);
      break;

    case "remove":
      const deletedPerson = await removeContact(id);
      console.log(deletedPerson);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
