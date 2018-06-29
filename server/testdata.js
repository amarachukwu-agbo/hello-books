const testData = {
  firstValidUser: {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'gody@gmail.com',
    password: 'hhhhhh',
  },
  secondValidUser: {
    firstName: 'Grace',
    lastName: 'Peters',
    email: 'gracep@gmail.com',
    password: 'hhhhhh',
  },
  missingPasswordUser: {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'grace@gmail.com',
  },
  invalidDetailsUser: {
    firstName: 1,
    lastName: 'Surname',
    email: 'grace',
    password: 4,
  },
  unregisteredUser: {
    email: 'grace@gmail.com',
    password: 'hhhhh',
  },
  validBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    quantity: 4,
    subject: 'Fiction',
    imageURL:
    'http://chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
  missingQuantityBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    subject: 'Fiction',
    imageURL:
    'http://chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
  invalidImageURLBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    subject: 'Fiction',
    imageURL:
    '//chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
};

export default testData;
