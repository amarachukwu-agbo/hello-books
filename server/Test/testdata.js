const testData = {
  admin: {
    firstName: 'Admin',
    lastName: 'Control',
    email: 'admin@gmail.com',
    password: 'admin',
  },
  user: {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'gody@gmail.com',
    password: 'hhhhhh',
  },
  secondUser: {
    firstName: 'Grace',
    lastName: 'Peters',
    email: 'gracep@gmail.com',
    password: 'hhhhhh',
  },
  incompleteUser: {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'grace@gmail.com',
  },
  invalidUser: {
    firstName: 1,
    lastName: 2,
    email: 'grace',
    password: 4,
  },
  unregisteredUser: {
    email: 'grace@gmail.com',
    password: 'hhhhh',
  },
  book: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    quantity: 4,
    subject: 'Fiction',
    imageURL: 'http://chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
  incompleteBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    subject: 'Fiction',
    imageURL: 'http://chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
  invalidBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    subject: 'Fiction',
    imageURL: '//chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
  },
  zeroQuantityBook: {
    title: 'Half of a yellow sun',
    author: 'Chimamanda Adichie',
    subject: 'Fiction',
    imageURL: '//chimamanda.com/wp-content/uploads/2013/04/book-purplehibiscus.png',
    description: 'A novel about history',
    quantity: 0,
  },

};

export default testData;
