import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('USER', () => {
    it('should create a user when all required fields are present', (done) => {
      models.User.create({
        firstName: 'Dennis',
        lastName: 'Bullet',
        email: 'dennisbullet@gmail.com',
        password: 'dbpassword',
      }).then((user) => {
        expect(user).to.have.property('firstName');
        expect(user).to.have.property('lastName');
        expect(user).to.have.property('email');
        expect(user).to.have.property('password');
        expect(user.firstName).to.equal('Dennis');
        expect(user.lastName).to.equal('Bullet');
        expect(user.email).to.equal('dennisbullet@gmail.com');
        expect(user.role).to.equal('User');
        expect(user.imageURL).to.equal(null);
        done();
      });
    });
    it('should throw validation error if email is not valid', (done) => {
      models.User.create({
        firstName: 'Dennis',
        lastName: 'Bullet',
        email: 'dennisbulletgmailcom',
        password: 'dbpassword',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Your email is not valid. Try again.');
        done();
      });
    });
    it(
      'should throw unique constraint error if email already exists',
      (done) => {
        models.User.create({
          firstName: 'Dennis',
          lastName: 'Bullet',
          email: 'dennisbullet@gmail.com',
          password: 'dbpassword',
        }).then(() => {
          done();
        }).catch((error) => {
          expect(error.name).to.equal('SequelizeUniqueConstraintError');
          expect(error.errors[0].message).to
            .equal('A user with this email already exists.');
          done();
        });
      },
    );
    it('should throw validation error if firstName is null', (done) => {
      models.User.create({
        lastName: 'User',
        email: 'test1@gmail.com',
        password: 'password',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('User.firstName cannot be null');
        done();
      });
    });
    it('should throw validation error if lastName is null', (done) => {
      models.User.create({
        firstName: 'User',
        email: 'test2@gmail.com',
        password: 'password',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('User.lastName cannot be null');
        done();
      });
    });
    it('should throw validation error if email is null', (done) => {
      models.User.create({
        firstName: 'User',
        lastName: 'Surname',
        password: 'password',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('User.email cannot be null');
        done();
      });
    });
    it('should throw validation error if password is null', (done) => {
      models.User.create({
        firstName: 'User',
        lastName: 'Surname',
        email: 'test3@gmail.com',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('User.password cannot be null');
        done();
      });
    });
  });
});
