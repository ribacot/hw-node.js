const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath)
const listContacts = async () => {
	const data = await fs.readFile(contactsPath, "utf-8");
	return JSON.parse(data);
};

const getContactById = async (id) => {
	const allContacts = await listContacts();
	const findeContact = allContacts.find((el) => el.id === id);
	return findeContact || null;
};

const removeContact = async (id) => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((el) => el.id === id);
	if (index === -1) return null;
	const [result] = allContacts.splice(index, 1);
	fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
};

const addContact = async (data) => {
	const allContacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...data,
	};
	allContacts.push(newContact);
	fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
