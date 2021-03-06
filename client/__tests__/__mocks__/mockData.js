const mockData = {
  users: {
    loginData: {
      email: 'amarach@gmail.com',
      password: 'password',
    },
    loginErrorResponse: {
      message: 'Unsuccessful',
      error: 'Password provided does not match the user',
    },
    signupData: {
      firstName: 'Amarachi',
      lastName: 'Agbo',
      email: 'amarachukwu.agbo@andela.com',
      password: 'password',
    },
    authResponse: {
      message: 'Successful',
      user: {
        id: 8,
        firstName: 'Amarachi',
        role: 'User',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTI5ODkyODQ1LCJleHAiOjE1Mjk5NzkyNDV9.xWpVSYL_tt5pFsnJZyx0t0Q1CkWuWvPBZbniux5w1uM', // eslint-disable-line
    },
    signupErrorResponse: {
      message: 'Unsuccessful',
      error: 'Email already exists. Input a different email',
    },
    profileResponse: {
      message: 'Successful',
      user: {
        id: 3,
        firstName: 'Grace',
        lastName: 'Jade',
        email: 'gracejade@gmail.com',
        role: 'User',
        imageURL: null,
        createdAt: '2018-06-23T14:42:46.827Z',
        updatedAt: '2018-06-23T14:42:46.827Z',
        userBooks: [
          {
            id: 4,
            status: 'Not Returned',
            createdAt: '2018-06-24T01:06:38.794Z',
            updatedAt: '2018-06-24T01:20:19.257Z',
            userId: 3,
            bookId: 99,
            borrowedBooks: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
          {
            id: 7,
            status: 'Not Returned',
            createdAt: '2018-06-24T01:06:38.794Z',
            updatedAt: '2018-06-24T01:20:19.257Z',
            userId: 3,
            bookId: 67,
            borrowedBooks: {
              title: 'New Book',
              author: 'Andrew Hart',
            },
          },
        ],
        userBorrowRequests: [
          {
            id: 5,
            reason: 'Research',
            comments: 'Nil',
            returnDate: '2018-12-07T23:00:00.000Z',
            status: 'Accepted',
            createdAt: '2018-06-24T00:52:46.370Z',
            updatedAt: '2018-06-24T01:06:38.789Z',
            userId: 3,
            bookId: 99,
            borrowRequests: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
        userReturnRequests: [
          {
            id: 4,
            comments: null,
            status: 'Accepted',
            createdAt: '2018-06-24T01:14:32.115Z',
            updatedAt: '2018-06-24T01:20:19.244Z',
            userId: 3,
            bookId: 99,
            returnRequests: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
        userFavorites: [
          {
            id: 2,
            createdAt: '2018-06-23T19:14:10.907Z',
            updatedAt: '2018-06-23T19:14:10.907Z',
            userId: 3,
            bookId: 99,
            favBook: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
      },
    },
    profileErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to fetch user\'s profile',
    },
    favoritesResponse: {
      message: 'Successful',
      favorites: [
        {
          id: 1,
          createdAt: '2018-06-23T19:14:10.907Z',
          updatedAt: '2018-06-23T19:14:10.907Z',
          userId: 3,
          bookId: 99,
          favBook: {
            id: 99,
            title: 'Lies That Bind Us',
            author: 'Andrew Hart',
            description: 'Jan needs this.',
            subject: 'Fiction',
            imageURL: 'https://images.jpg',
            quantity: 10,
            borrowCount: 0,
            favCount: 1,
            upvotes: 0,
            downvotes: 1,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-23T19:14:10.925Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 1,
        currentPage: 1,
        dataCount: 1,
      },
    },
    favoritesErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to get user favorites',
    },
    profilePreviousState: {
      profile: {
        id: 3,
        firstName: 'Grace',
        lastName: 'Jade',
        email: 'gracejade@gmail.com',
        role: 'User',
        imageURL: null,
        createdAt: '2018-06-23T14:42:46.827Z',
        updatedAt: '2018-06-23T14:42:46.827Z',
        userBooks: [
          {
            id: 4,
            status: 'Returned',
            createdAt: '2018-06-24T01:06:38.794Z',
            updatedAt: '2018-06-24T01:20:19.257Z',
            userId: 3,
            bookId: 99,
            borrowedBooks: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
        userBorrowRequests: [
          {
            id: 5,
            reason: 'Research',
            comments: 'Nil',
            returnDate: '2018-12-07T23:00:00.000Z',
            status: 'Accepted',
            createdAt: '2018-06-24T00:52:46.370Z',
            updatedAt: '2018-06-24T01:06:38.789Z',
            userId: 3,
            bookId: 99,
            borrowRequests: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
        userReturnRequests: [],
        userFavorites: [
          {
            id: 2,
            createdAt: '2018-06-23T19:14:10.907Z',
            updatedAt: '2018-06-23T19:14:10.907Z',
            userId: 3,
            bookId: 99,
            favBook: {
              title: 'Lies That Bind Us',
              author: 'Andrew Hart',
            },
          },
        ],
      },
    },
  },
  books: {
    bookDataResponse: {
      message: 'Successful',
      book: {
        id: 97,
        title: 'A new book',
        author: 'Joanna Gaines',
        description: 'A new book',
        subject: 'Recipe',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 1,
        favCount: 0,
        upvotes: 0,
        downvotes: 0,
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-07-03T14:48:07.907Z',
        bookReviews: [],
      },
    },
    bookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Book was not found.',
    },
    upvoteBookResponse: {
      message: 'Successful',
      vote: {
        bookId: 97,
        book: {
          id: 97,
          title: 'A new book',
          author: 'Joanna Gaines',
          description: 'A new book',
          subject: 'Recipe',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 6,
          borrowCount: 0,
          favCount: 1,
          upvotes: 1,
          downvotes: 1,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-06-23T19:14:10.925Z',
        },
      },
    },
    upvoteBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Already upvoted book',
    },
    downvoteBookResponse: {
      message: 'Successful',
      vote: {
        bookId: 97,
        book: {
          id: 97,
          title: 'A new book',
          author: 'Joanna Gaines',
          description: 'A new book',
          subject: 'Recipe',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 6,
          borrowCount: 0,
          favCount: 1,
          upvotes: 0,
          downvotes: 1,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-06-23T19:14:10.925Z',
        },
      },
    },
    downvoteBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Already downvoted book',
    },
    favoriteBookResponse: {
      message: 'Successful',
      book: {
        id: 97,
        title: 'A new book',
        author: 'Joanna Gaines',
        description: 'A new book',
        subject: 'Recipe',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 1,
        upvotes: 0,
        downvotes: 1,
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    },
    favoriteBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Already favorited book',
    },
    borrowBookRequest: {
      returnDate: '12/08/2018',
      comments: 'Nil',
      reason: 'Research',
    },
    borrowBookResponse: {
      message: 'Successful',
      request: {
        status: 'Pending',
        id: 6,
        bookId: 97,
        userId: 1,
        reason: 'Research',
        returnDate: '2018-12-07T23:00:00.000Z',
        comments: 'Nil',
        updatedAt: '2018-06-24T13:27:59.303Z',
        createdAt: '2018-06-24T13:27:59.303Z',
      },
    },
    borrowBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Book was not found',
    },
    reviewBookRequest: {
      review: 'I enjoyed reading this book',
    },
    reviewBookResponse: {
      message: 'Successful',
      reviewedBook: {
        title: 'A new book',
        author: 'Joanna Gaines',
        description: 'A new book',
        subject: 'Recipe',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 1,
        upvotes: 0,
        downvotes: 1,
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
        bookReviews: [
          {
            id: 1,
            review: 'I enjoyed reading this book',
            createdAt: '2018-06-24T13:18:52.295Z',
            updatedAt: '2018-06-24T13:18:52.295Z',
            userId: 3,
            bookId: 1,
            userReviews: {
              id: 3,
              firstName: 'Grace',
              lastName: 'Jade',
              imageURL: null,
              createdAt: '2018-06-23T14:42:46.827Z',
            },
          },
        ],
      },
    },
    reviewBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Your review has already been created',
    },
    booksDataResponse: {
      message: 'Successful',
      books: [
        {
          id: 95,
          title: 'Born a Crime',
          author: 'Trevor Noah',
          description: 'Attuned to the power of la',
          subject: 'Biography',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 20,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 92,
          title: 'A Place Called Freedom',
          author: 'Ken Follet',
          description: 'This lush novel, set ',
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 2,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 97,
          title: 'Magnolia Table: A Collection of Recipes for Gathering',
          author: 'Joanna Gaines',
          description: 'Magnolia Table is infused with Joanna Gaines',
          subject: 'Recipe',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 7,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 3,
        currentPage: 1,
        dataCount: 3,
      },
    },
    booksErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to get books',
    },
    addBookRequest: {
      title: 'A new book',
      author: 'Stephen Covey',
      description: 'A new book',
      quantity: 20,
      subject: 'Inspiration',
      imageURL: 'https://images/I/51fEYMhtHoL.jpg',
    },
    addBookResponse: {
      message: 'Successful',
      bookEntry: {
        borrowCount: 0,
        favCount: 0,
        upvotes: 0,
        downvotes: 0,
        id: 5,
        title: 'A new book',
        author: 'Stephen Covey',
        description: 'A new book',
        quantity: 20,
        subject: 'Inspiration',
        imageURL: 'https://images/I/51fEYMhtHoL.jpg',
        updatedAt: '2018-06-24T12:59:07.573Z',
        createdAt: '2018-06-24T12:59:07.573Z',
      },
    },
    addBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'A book with this title exists',
    },
    searchBooksResponse: {
      message: 'Successful',
      books: [{
        id: 97,
        title: 'A new book',
        author: 'Joanna Gaines',
        description: 'A new book',
        subject: 'Recipe',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 1,
        upvotes: 0,
        downvotes: 1,
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 1,
        currentPage: 1,
        dataCount: 1,
      },
    },
    searchBooksErrorResponse: {
      message: 'Successful',
      error: 'No book matches search query',
    },
    editBookRequest: {
      title: 'Edited Book',
    },
    editBookResponse: {
      message: 'Successful',
      updatedBook: {
        id: 97,
        title: 'Edited book',
        author: 'Joanna Gaines',
        description: 'A new book',
        subject: 'Recipe',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 1,
        upvotes: 0,
        downvotes: 1,
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    },
    editBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Nothing to update',
    },
    deleteBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Book was not found',
    },
    upvotedBooksResponse: {
      message: 'Successful',
      books: [
        {
          id: 96,
          title: 'Love and Ruin',
          author: 'Paul McClain',
          description: 'Magnolia Table',
          subject: 'Romance',
          imageURL: 'https://images-na.ssl.jpg',
          quantity: 20,
          borrowCount: 1,
          favCount: 0,
          upvotes: 1,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-06-22T12:22:48.895Z',
          bookReviews: [],
        },
        {
          id: 1,
          title: 'Lean In',
          author: 'Sheryl Sandberg',
          description: 'A guide on how women can balance career and family',
          subject: 'Self-help',
          imageURL: 'https://res.cloudinary.com.jpg',
          quantity: 20,
          borrowCount: 0,
          favCount: 0,
          upvotes: 1,
          downvotes: 0,
          createdAt: '2018-06-22T08:56:20.614Z',
          updatedAt: '2018-06-22T12:22:28.308Z',
          bookReviews: [],
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 2,
        currentPage: 1,
        dataCount: 2,
      },
    },
    upvotedBooksErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to get most upvoted books',
    },
    returnBookResponse: {
      message: 'Successful',
      returnRequest: {
        id: 5,
        comments: null,
        status: 'Pending',
        createdAt: '2018-06-24T13:39:42.424Z',
        updatedAt: '2018-06-24T13:39:42.424Z',
        userId: 3,
        bookId: 97,
        returnRequests: {
          title: 'New title',
          author: 'New author',
        },
      },
    },
    returnBookErrorResponse: {
      message: 'Unsuccessful',
      error: 'Your request has already been sent',
    },
    bookPreviousState: {
      book: {
        id: 3,
        title: 'Another book',
        author: 'Joan Gaines',
        description: 'Another book',
        subject: 'Romabce',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 0,
        upvotes: 0,
        downvotes: 1,
        bookReviews: [],
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    },
    booksPreviousState: {
      books: [
        {
          id: 95,
          title: 'Born a Crime',
          author: 'Trevor Noah',
          description: 'Attuned to the power of la',
          subject: 'Biography',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 20,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 92,
          title: 'A Place Called Freedom',
          author: 'Ken Follet',
          description: 'This lush novel, set ',
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 2,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 97,
          title: 'Magnolia Table: A Collection of Recipes for Gathering',
          author: 'Joanna Gaines',
          description: 'Magnolia Table is infused with Joanna Gaines',
          subject: 'Recipe',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 7,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 3,
        currentPage: 1,
        dataCount: 3,
      },
    },
  },
  requests: {
    borrowRequestsResponse: {
      message: 'Successful',
      requests: [
        {
          id: 12,
          reason: 'Assignment',
          comments: null,
          returnDate: '2018-12-11T23:00:00.000Z',
          status: 'Pending',
          createdAt: '2018-06-25T02:15:45.082Z',
          updatedAt: '2018-06-25T02:17:03.472Z',
          bookId: 98,
          userId: 8,
          userBorrowRequests: {
            id: 8,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarachukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:14:05.369Z',
            updatedAt: '2018-06-25T02:14:05.369Z',
          },
          borrowRequests: {
            id: 98,
            title: 'I"ll Be Gone in the Dark',
            author: 'Michelle McNamara',
            description: 'A masterful true crime',
            subject: 'True Crime',
            imageURL: 'https://images.jpg',
            quantity: 4,
            borrowCount: 4,
            favCount: 2,
            upvotes: 0,
            downvotes: 2,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-27T12:18:46.422Z',
          },
        },
        {
          id: 11,
          reason: 'Research',
          comments: 'Nil',
          returnDate: '2018-12-07T23:00:00.000Z',
          status: 'Accepted',
          createdAt: '2018-06-25T02:09:01.743Z',
          updatedAt: '2018-06-25T02:09:59.410Z',
          bookId: 95,
          userId: 7,
          userBorrowRequests: {
            id: 7,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amaracukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:08:20.419Z',
            updatedAt: '2018-06-25T02:08:20.419Z',
          },
          borrowRequests: {
            id: 95,
            title: 'Born a Crime',
            author: 'Trevor Noah',
            description: 'Attuned to the power',
            subject: 'Biography',
            imageURL: 'https://image._AA300_.jpg',
            quantity: 18,
            borrowCount: 2,
            favCount: 0,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-25T02:09:59.423Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 2,
        currentPage: 1,
        dataCount: 2,
      },
    },
    borrowRequestsErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to get borrow requests',
    },
    handleBorrowRequestErrorResponse: {
      message: 'Unsuccessful',
      error: 'Request does not exist',
    },
    handleBorrowRequestResponse: {
      message: 'Successful',
      borrowRequest: {
        id: 12,
        reason: 'Research',
        comments: null,
        returnDate: '2018-12-11T23:00:00.000Z',
        status: 'Accepted',
        createdAt: '2018-06-26T22:33:09.130Z',
        updatedAt: '2018-06-26T22:33:24.168Z',
        userId: 1,
        bookId: 97,
        userBorrowRequests: {
          email: 'amarachukwu.agbo@gmail.com',
          firstName: 'Amarachi',
        },
        borrowRequests: {
          title: 'I"ll Be Gone in the Dark',
        },
      },
    },
    returnRequestsResponse: {
      message: 'Successful',
      requests: [
        {
          id: 2,
          comments: null,
          status: 'Accepted',
          createdAt: '2018-06-21T21:09:16.641Z',
          updatedAt: '2018-06-21T21:11:19.047Z',
          userId: 20000,
          bookId: 98,
          userReturnRequests: {
            id: 20000,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarkipkip@gmail.com',
            role: 'Admin',
            imageURL: null,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-05-10T03:11:52.181Z',
          },
          returnRequests: {
            id: 98,
            title: 'I"ll Be Gone in the Dark',
            author: 'Michelle McNamara',
            description: 'A masterful true crime account of the Golden S.',
            subject: 'True Crime',
            imageURL: 'https://res.cloudinary.com/ama-hello-books-v2/i.jpg',
            quantity: 4,
            borrowCount: 4,
            favCount: 2,
            upvotes: 1,
            downvotes: 2,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-07-06T00:59:36.273Z',
          },
        },
        {
          id: 1,
          comments: null,
          status: 'Accepted',
          createdAt: '2018-06-21T20:58:16.452Z',
          updatedAt: '2018-06-21T21:05:26.890Z',
          userId: 20000,
          bookId: 89,
          userReturnRequests: {
            id: 20000,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarkipkip@gmail.com',
            role: 'Admin',
            imageURL: null,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-05-10T03:11:52.181Z',
          },
          returnRequests: {
            id: 89,
            title: 'The 7 Habits of Highly Effective People',
            author: 'Stephen Covey',
            description: 'Dr. Covey\'s 7 Habits book is one of inspiring',
            subject: 'Inspiration',
            imageURL: 'https://images-na.ssl-images-amazon.com/images.jpg',
            quantity: 20,
            borrowCount: 1,
            favCount: 1,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-07-05T19:26:24.934Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 5,
        currentPage: 1,
        dataCount: 5,
      },
    },
    returnRequestsErrorResponse: {
      message: 'Unsuccessful',
      error: 'Unable to get return requests',
    },
    handleReturnRequestResponse: {
      message: 'Successful',
      status: 'Accepted',
      returnRequest: {
        id: 12,
        status: 'Returned',
        createdAt: '2018-06-24T13:34:31.172Z',
        updatedAt: '2018-06-24T13:46:22.856Z',
        userId: 1,
        bookId: 97,
      },
    },
    handleReturnRequestErrorResponse: {
      message: 'Unsuccessful',
      error: 'Return request was not found',
    },
    borrowRequestsPreviousState: {
      borrowRequests: [
        {
          id: 12,
          reason: 'Assignment',
          comments: null,
          returnDate: '2018-12-11T23:00:00.000Z',
          status: 'Pending',
          createdAt: '2018-06-25T02:15:45.082Z',
          updatedAt: '2018-06-25T02:17:03.472Z',
          bookId: 98,
          userId: 8,
          userBorrowRequests: {
            id: 8,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarachukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:14:05.369Z',
            updatedAt: '2018-06-25T02:14:05.369Z',
          },
          borrowRequests: {
            id: 98,
            title: 'I"ll Be Gone in the Dark',
            author: 'Michelle McNamara',
            description: 'A masterful true crime',
            subject: 'True Crime',
            imageURL: 'https://images.jpg',
            quantity: 4,
            borrowCount: 4,
            favCount: 2,
            upvotes: 0,
            downvotes: 2,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-27T12:18:46.422Z',
          },
        },
        {
          id: 11,
          reason: 'Research',
          comments: 'Nil',
          returnDate: '2018-12-07T23:00:00.000Z',
          status: 'Accepted',
          createdAt: '2018-06-25T02:09:01.743Z',
          updatedAt: '2018-06-25T02:09:59.410Z',
          bookId: 95,
          userId: 7,
          userBorrowRequests: {
            id: 7,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amaracukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:08:20.419Z',
            updatedAt: '2018-06-25T02:08:20.419Z',
          },
          borrowRequests: {
            id: 95,
            title: 'Born a Crime',
            author: 'Trevor Noah',
            description: 'Attuned to the power',
            subject: 'Biography',
            imageURL: 'https://image._AA300_.jpg',
            quantity: 18,
            borrowCount: 2,
            favCount: 0,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-25T02:09:59.423Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 2,
        currentPage: 1,
        dataCount: 2,
      },
    },
    returnRequestsPreviousState: {
      returnRequests: [
        {
          id: 12,
          comments: null,
          status: 'Pending',
          createdAt: '2018-06-21T20:58:16.452Z',
          updatedAt: '2018-06-21T21:05:26.890Z',
          userId: 20000,
          bookId: 89,
          userReturnRequests: {
            id: 20000,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarkipkip@gmail.com',
            role: 'Admin',
            imageURL: null,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-05-10T03:11:52.181Z',
          },
          returnRequests: {
            id: 89,
            title: 'The 7 Habits of Highly Effective People',
            author: 'Stephen Covey',
            description: 'Dr. Covey\'s 7 Habits book is one of inspiring',
            subject: 'Inspiration',
            imageURL: 'https://images-na.ssl-images-amazon.com/images.jpg',
            quantity: 20,
            borrowCount: 1,
            favCount: 1,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-07-05T19:26:24.934Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 1,
        currentPage: 1,
        dataCount: 1,
      },
    },
  },
};

export default mockData;
