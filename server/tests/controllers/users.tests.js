import { expect } from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../index';
import testData from '../../testdata';

dotenv.config();

const request = supertest;
let userToken;
let adminToken;

describe('Users Controller', () => {
  describe('User Actions', () => {
    describe('/api/v1/users/signup', () => {
      it('should signup a user successfully', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send(testData.secondValidUser)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Successful');
            expect(res.body).to.have.property('token');
            expect(res.body.user.firstName).to.equal('Grace');
            expect(res.body.user.role).to.equal('User');
            done();
          });
      });
      it(
        'should throw 400 error if some fields are missing in the request',
        (done) => {
          request(app)
            .post('/api/v1/users/signup')
            .send(testData.missingPasswordUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have.string('["password" is required]');
              done();
            });
        },
      );
      it(
        'should throw 400 error if a field contains an invalid data type',
        (done) => {
          request(app)
            .post('/api/v1/users/signup')
            .send(testData.invalidDetailsUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["firstName" must be a string]');
              expect(res.body.error).to.have
                .string('["email" must be a valid email]');
              expect(res.body.error).to.have
                .string('["password" must be a string]');
              done();
            });
        },
      );
      it(
        `should throw 409 error if user tries to sign
        up with an existing email`,
        (done) => {
          request(app)
            .post('/api/v1/users/signup')
            .send(testData.secondValidUser)
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body).to.have.property('error');
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body.error).to
                .equal('Email already exists. Input a different email');
              done();
            });
        },
      );
    });

    describe('POST /api/v1/users/login', () => {
      it('should return 201 status and a token', (done) => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: testData.secondValidUser.email,
            password: testData.secondValidUser.password,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            expect(res.body.message).to.equal('Successful');
            expect(res.body.user.firstName).to.equal('Grace');
            expect(res.body.user.role).to.equal('User');
            userToken = res.body.token;
            done();
          });
      });
      it('should throw 400 error and if some fields are missing', (done) => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: testData.secondValidUser.email,
            password: '',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.not.have.property('token');
            expect(res.body).to.not.have.property('user');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.have
              .string('["password" is not allowed to be empty]');
            done();
          });
      });
      it('should throw 404 error if user is not found', (done) => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: testData.unregisteredUser.email,
            password: testData.unregisteredUser.password,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.deep.equal('Unsuccessful');
            expect(res.body.error).to.equal('User not found');
            expect(res.body).to.not.have.property('token');
            expect(res.body).to.not.have.property('user');
            done();
          });
      });
      it(
        'should throw 401 error if user logins with a wrong password',
        (done) => {
          request(app)
            .post('/api/v1/users/login')
            .send({
              email: testData.secondValidUser.email,
              password: 'WrongPassword',
            })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.deep.equal('Unsuccessful');
              expect(res.body.error).to.deep
                .equal('Password provided does not match the user');
              expect(res.body).to.not.have.property('token');
              done();
            });
        },
      );
    });

    describe('GET /api/v1/:userId/favbooks', () => {
      before((done) => {
        request(app)
          .post('/api/v1/books/94/favorite')
          .set('Authorization', `Token ${userToken}`)
          .end(() => {
            done();
          });
      });
      it('should return 200 status and user\'s favorite books', (done) => {
        request(app)
          .get('/api/v1/users/2/favbooks')
          .set('Authorization', `Token ${userToken}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Successful');
            expect(res.body).to.have.property('favorites');
            expect(res.body.favorites[0]).to.have.any.keys(
              'id',
              'bookId',
              'userId',
            );
            expect(res.body.favorites[0].favBook.title).to.equal('Macbeth');
            expect(res.body.pagination.currentPage).to.equal(1);
            done();
          });
      });
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .get('/api/v1/users/2/favbooks')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('favorites');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it(
        `should return 403 error if userId in params is not
      matched to user's token's id`,
        (done) => {
          request(app)
            .get('/api/v1/users/-2/favbooks')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to
                .equal('You are not authorized to perform this action');
              expect(res.body).to.have.not.have.property('favorites');
              done();
            });
        },
      );
    });

    describe('POST /api/v1/users/:userId/borrow/:bookId', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .post('/api/v1/users/2/borrow/94')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('request');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it('should send a borrow request successfully', (done) => {
        request(app)
          .post('/api/v1/users/2/borrow/94')
          .set('Authorization', `Token ${userToken}`)
          .send({
            reason: 'Research',
            returnDate: '12/12/2018',
          })
          .end((err, res) => {
            expect(res.status).to.equal(202);
            expect(res.body.message).to.equal('Successful');
            expect(res.body).to.have.property('request');
            expect(res.body.request.status).to.equal('Pending');
            expect(res.body.request.bookId).to.equal(94);
            done();
          });
      });
      it(
        'should throw 409 error if the request has already been sent',
        (done) => {
          request(app)
            .post('/api/v1/users/2/borrow/94')
            .set('Authorization', `Token ${userToken}`)
            .send({
              reason: 'Research',
              returnDate: '12/12/2018',
            })
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('request');
              expect(res.body.error).to
                .equal('Your request has already been sent');
              done();
            });
        },
      );
      it(
        `should throw 403 error if the quantity of the
        book to be borrowed is 0`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/borrow/93')
            .set('Authorization', `Token ${userToken}`)
            .send({
              reason: 'Research',
              returnDate: '12/12/2018',
            })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('request');
              expect(res.body.error).to.equal('Book is not available');
              done();
            });
        },
      );
      it(
        'should throw 404 error if the book to be borrowed does not exist',
        (done) => {
          request(app)
            .post('/api/v1/users/2/borrow/930')
            .set('Authorization', `Token ${userToken}`)
            .send({
              reason: 'Research',
              returnDate: '12/12/2018',
            })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('request');
              expect(res.body.error).to.equal('Book was not found');
              done();
            });
        },
      );
      it(
        `should throw 404 error if some of the fields
        in the request are missing`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/borrow/930')
            .set('Authorization', `Token ${userToken}`)
            .send({
              reason: 'Research',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('request');
              expect(res.body).to.have.property('error');
              done();
            });
        },
      );
    });
    describe('GET /api/v1/users/:userId', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .get('/api/v1/users/2')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('user');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it(
        `should throw 403 error if userId in params
       is not matched to user's token's id`,
        (done) => {
          request(app)
            .get('/api/v1/users/4')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to
                .equal('You are not authorized to perform this action');
              expect(res.body).to.have.not.have.property('user');
              done();
            });
        },
      );
      it(
        'should return user details of a user with an authenticated token',
        (done) => {
          request(app)
            .get('/api/v1/users/2')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('user');
              expect(res.body.user.id).to.equal(2);
              expect(res.body.user).to.have.property('userBooks');
              expect(res.body.user).to.have.property('userBorrowRequests');
              expect(res.body.user).to.have.property('userFavorites');
              expect(res.body.user).to.have.property('userReturnRequests');
              done();
            });
        },
      );
    });
  });

  describe('Authenticated admin actions', () => {
    before((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        }).end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
    describe('PUT /api/v1/users/:userId/borrow/:bookId', () => {
      before((done) => {
        request(app)
          .post('/api/v1/users/2/borrow/89')
          .set('Authorization', `Token ${userToken}`)
          .send({
            reason: 'Assignment',
            returnDate: '12/12/2018',
          })
          .end(() => {
            done();
          });
      });
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .put('/api/v1/users/2/borrow/94')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('borrowRequest');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it(
        'should throw 403 if a user tries to handle a borrow request',
        (done) => {
          request(app)
            .put('/api/v1/users/2/borrow/94')
            .set('Authorization', `Token ${userToken}`)
            .send({
              status: 'Accepted',
            })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('borrowRequest');
              expect(res.body.error).to
                .equal('You must be an admin to access this feature');
              done();
            });
        },
      );
      it(
        `should throw 400 error if the userId
         or bookId are not positive integers`,
        (done) => {
          request(app)
            .put('/api/v1/users/-2/borrow/-89')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declined',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('borrowRequest');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["bookId" must be a positive number]');
              expect(res.body.error).to.have
                .string('["userId" must be a positive number]');
              done();
            });
        },
      );
      it(
        `should throw 400 error if admin tries to
        handle a request with the wrong status`,
        (done) => {
          request(app)
            .put('/api/v1/users/2/borrow/89')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declin',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('borrowRequest');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["status" must be one of [Declined, Accepted]]');
              done();
            });
        },
      );
      it(
        'should return 200 status if an admin accepts a borrow request',
        (done) => {
          request(app)
            .put('/api/v1/users/2/borrow/94')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Accepted',
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('borrowRequest');
              expect(res.body.borrowRequest.status).to.equal('Accepted');
              expect(res.body.borrowRequest.bookId).to.equal(94);
              done();
            });
        },
      );
      it(
        'should return 200 status if an admin declines a borrow request',
        (done) => {
          request(app)
            .put('/api/v1/users/2/borrow/89')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declined',
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('borrowRequest');
              expect(res.body.borrowRequest.status).to.equal('Declined');
              expect(res.body.borrowRequest.bookId).to.equal(89);
              done();
            });
        },
      );
      it(
        `should throw 404 error if admin tries to handle a
        request already declined or accepted`,
        (done) => {
          request(app)
            .put('/api/v1/users/2/borrow/89')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declined',
            })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('borrowRequest');
              expect(res.body.error).to.equal('Borrow request not found');
              done();
            });
        },
      );
    });
    describe('POST /api/v1/users/:userId/return/94', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .post('/api/v1/users/2/return/94')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('returnRequest');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it(
        `should throw 403 error if a user tries to
         return a book he has not borrowed`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/89')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.not.have.property('returnRequest');
              expect(res.body.error).to
                .equal('You have not borrowed this book');
              done();
            });
        },
      );
      it(
        `should throw 400 error if a user adds 
        an empty (optional)comment in the request`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${userToken}`)
            .send({
              comments: '',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.not.have.property('returnRequest');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["comments" is not allowed to be empty]');
              done();
            });
        },
      );
      it(
        `should return 201 status if a user
         sends a request to return a borrowed book`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('returnRequest');
              expect(res.body.returnRequest.bookId).to.equal(94);
              expect(res.body.returnRequest.userId).to.equal(2);
              expect(res.body.returnRequest.status).to.equal('Pending');
              done();
            });
        },
      );
      it(
        'should throw 409 error if a user has already sent the request',
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('returnRequest');
              expect(res.body.error).to
                .equal('Your request has already been sent');
              done();
            });
        },
      );
      it(
        `should return 403 error if userId in params
        is not matched to user's token's id`,
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${adminToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to
                .equal('You are not authorized to perform this action');
              expect(res.body).to.have.not.have.property('returnRequest');
              done();
            });
        },
      );
      it(
        'should return 400 error if bookId in params is not a positive integer',
        (done) => {
          request(app)
            .post('/api/v1/users/2/return/-94')
            .set('Authorization', `Token ${userToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.have.property('error');
              expect(res.body).to.have.not.have.property('returnRequest');
              expect(res.body.error).to.have
                .string('["bookId" must be a positive number]');
              done();
            });
        },
      );
    });
    describe('PUT /api/v1/users/:userId/return/:bookId', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .put('/api/v1/users/2/return/94')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('returnRequest');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it(
        'should throw 403 if a user tries to handle a return request',
        (done) => {
          request(app)
            .put('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${userToken}`)
            .send({
              status: 'Accepted',
            })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('returnRequest');
              expect(res.body.error).to
                .equal('You must be an admin to access this feature');
              done();
            });
        },
      );
      it(
        `should throw 400 error if the userId or
        bookId are not positive integers`,
        (done) => {
          request(app)
            .put('/api/v1/users/-2/return/-94')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declined',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('returnRequest');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["bookId" must be a positive number]');
              expect(res.body.error).to.have
                .string('["userId" must be a positive number]');
              done();
            });
        },
      );
      it(
        `should throw 400 error if admin tries to handle a
        request with the wrong status`,
        (done) => {
          request(app)
            .put('/api/v1/users/2/return/89')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declin',
            })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('returnRequest');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.have
                .string('["status" must be one of [Declined, Accepted]]');
              done();
            });
        },
      );
      it(
        'should return 200 status if an admin accepts a return request',
        (done) => {
          request(app)
            .put('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Accepted',
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('returnRequest');
              expect(res.body.returnRequest.status).to.equal('Returned');
              expect(res.body.returnRequest.bookId).to.equal(94);
              expect(res.body.returnRequest.userId).to.equal(2);
              done();
            });
        },
      );
      it(
        `should throw 404 error if admin tries to handle a
        request already declined or accepted`,
        (done) => {
          request(app)
            .put('/api/v1/users/2/return/94')
            .set('Authorization', `Token ${adminToken}`)
            .send({
              status: 'Declined',
            })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('Unsuccessful');
              expect(res.body).to.not.have.property('returnRequest');
              expect(res.body.error).to.equal('Return request not found');
              done();
            });
        },
      );
    });
    describe('GET /api/v1/borrowRequests', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .get('/api/v1/borrowRequests')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('requests');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it('should throw 403 if a user tries to get borrow requests', (done) => {
        request(app)
          .get('/api/v1/borrowRequests')
          .set('Authorization', `Token ${userToken}`)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.not.have.property('requests');
            expect(res.body.error).to
              .equal('You must be an admin to access this feature');
            done();
          });
      });
      it(
        `should return 200 status and requests
         if an admin tries to get borrow requests`,
        (done) => {
          request(app)
            .get('/api/v1/borrowRequests')
            .set('Authorization', `Token ${adminToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('requests');
              expect(res.body.pagination.currentPage).to.equal(1);
              done();
            });
        },
      );
    });
    describe('GET /api/v1/returnRequests', () => {
      it('should throw 401 error if no token is provided', (done) => {
        request(app)
          .get('/api/v1/returnRequests')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.have.not.have.property('requests');
            expect(res.body.error).to.equal('No token provided');
            done();
          });
      });
      it('should throw 403 if a user tries to get return requests', (done) => {
        request(app)
          .get('/api/v1/returnRequests')
          .set('Authorization', `Token ${userToken}`)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('Unsuccessful');
            expect(res.body).to.not.have.property('requests');
            expect(res.body.error).to
              .equal('You must be an admin to access this feature');
            done();
          });
      });
      it(
        `should return 200 status and requests if
         an admin tries to get return requests`,
        (done) => {
          request(app)
            .get('/api/v1/returnRequests')
            .set('Authorization', `Token ${adminToken}`)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('Successful');
              expect(res.body).to.have.property('requests');
              expect(res.body.pagination.currentPage).to.equal(1);
              done();
            });
        },
      );
    });
  });
});
