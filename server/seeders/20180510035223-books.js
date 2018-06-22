module.exports = {
  up: (queryInterface, Sequelize) => //eslint-disable-line
    queryInterface.bulkInsert(
      'Books',
      [
        {
          id: 99,
          title: 'Lies That Bind Us',
          author: 'Andrew Hart',
          description: 'Jan needs this. She’s flying to Crete to reunite with friends she met there five years ago and relive an idyllic vacation. Basking in the warmth of the sun, the azure sea, and the aura of antiquity, she can once again pretend—for a little while—that she belongs. Her ex-boyfriend Marcus will be among them, but even he doesn’t know the secrets she keeps hidden behind a veil of lies. None of them really know her, and that’s only part of the problem.',
          quantity: 10,
          subject: 'Fiction',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51SLlJ5SWOL.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
        {
          id: 98,
          title: 'I"ll Be Gone in the Dark',
          author: 'Michelle McNamara',
          description: 'A masterful true crime account of the Golden State Killer - the elusive serial rapist turned murderer who terrorized California for over a decade - from Michelle McNamara, the gifted journalist who died tragically while investigating the case.',
          quantity: 5,
          subject: 'True Crime',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/616zw9dVVxL._AA300_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
        {
          id: 97,
          title: 'Magnolia Table: A Collection of Recipes for Gathering',
          author: 'Joanna Gaines',
          description: 'Magnolia Table is infused with Joanna Gaines\' warmth and passion for all things family, prepared and served straight from the heart of her home, with recipes inspired by dozens of Gaines family favorites and classic comfort selections from the couple\'s new Waco restaurant, Magnolia Table',
          quantity: 7,
          subject: 'Recipe',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51ciUK5JaCL._SX376_BO1,204,203,200_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
        {
          id: 96,
          title: 'Love and Ruin',
          author: 'Paul McClain',
          description: 'Magnolia Table is infused with Joanna Gaines\' warmth and passion for all things family, prepared and served straight from the heart of her home, with recipes inspired by dozens of Gaines family favorites and classic comfort selections from the couple\'s new Waco restaurant, Magnolia Table',
          quantity: 20,
          subject: 'Romance',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51keKmj6MSL._SX327_BO1,204,203,200_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 95,
          title: 'Born a Crime',
          author: 'Trevor Noah',
          description: 'Attuned to the power of language at a young age - as a means of acceptance and influence in a country divided, then subdivided, into groups at odds with one another - Noah\'s raw, personal journey becomes something extraordinary in audio: a true testament to the power of storytelling',
          quantity: 20,
          subject: 'Biography',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/61mJhMWAq8L._AA300_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 94,
          title: 'Macbeth',
          author: 'A.J.Hartley',
          description: 'Macbeth: A Novel brings the intricacy and grit of the historical thriller to Shakespeare\'s tale of political intrigue, treachery, and murder.',
          quantity: 70,
          subject: 'Romance',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51l6MwpodJL._AA300_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 93,
          title: 'The Autobiography of Malcolm X',
          author: 'Alex Haley',
          description: 'The Autobiography of Malcolm X stands as the definitive statement of a movement and a man whose work was never completed but whose message is timeless. It is essential reading for anyone who wants to understand America.',
          quantity: 0,
          subject: 'Autobiography',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51O5LjozmAL._SX303_BO1,204,203,200_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 92,
          title: 'A Place Called Freedom',
          author: 'Ken Follet',
          description: 'This lush novel, set in 1766 England and America, evokes an era ripe with riot and revolution, from the teeming streets of London to the sprawling grounds of a Virginia plantation.',
          quantity: 2,
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51tXUJPsi7L._AA300_.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 91,
          title: 'The Speed',
          author: 'Eric Bernt',
          description: 'In this propulsive thriller, one of the most ingenious young men in the world has also become the most dangerous…or has he?',
          quantity: 2,
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51SzSLhOOPL.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 90,
          title: 'Matchmaking for Beginners',
          author: 'Maddie Dawson',
          description: 'Marnie MacGraw wants an ordinary life—a husband, kids, and a minivan in the suburbs. Now that she’s marrying the man of her dreams, she’s sure this is the life she’ll get. Then Marnie meets Blix Holliday, her fiancé’s irascible matchmaking great-aunt who’s dying, and everything changes—just as Blix told her it would.',
          quantity: 10,
          subject: 'Romance',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/61TbLNxP6rL.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 89,
          title: 'The 7 Habits of Highly Effective People',
          author: 'Stephen Covey',
          description: 'Dr. Covey\'s 7 Habits book is one of the most inspiring and impactful books ever written. Now you can enjoy and learn critical lessons about the habits of successful people that will enrich your life\'s experience',
          quantity: 20,
          subject: 'Inspiration',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51fEYMhtHoL.jpg',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },

        {
          id: 88,
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          description: 'Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and “arrows of time,” of the big bang and a bigger God—where the possibilities are wondrous and unexpected.',
          quantity: 25,
          subject: 'Science and Fiction',
          imageURL: 'https://images-na.ssl-images-amazon.com/images/I/617m43n-HWL._SX331_BO1,204,203,200_.jpg',
          createdAt: '2018-04-10 04:11:52.181+01',
          updatedAt: '2018-04-10 04:11:52.181+01',
        },

      ], {},
    ),

  down: (queryInterface, Sequelize) => ( //eslint-disable-line
    queryInterface.bulkDelete('Books', null, {})
  ),
};
