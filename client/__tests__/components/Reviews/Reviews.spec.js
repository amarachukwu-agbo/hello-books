import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Notify from '../../../helpers/Notify';
import Reviews from '../../../components/Reviews/Reviews';
import mockData from '../../__mocks__/mockData';

let wrapper;
const { books } = mockData;
const NotifyError = sinon.spy(Notify, 'notifyError');

const props = {
  book: books.reviewBookResponse.reviewedBook,
  reviews: books.reviewBookResponse.reviewedBook.bookReviews,
  isAuthenticated: true,
  isReviewing: false,
  reviewBook: sinon.spy(() => Promise.resolve()),
};

sinon.spy(Reviews.prototype, 'submitForm');

describe('<Reviews />', () => {
  afterEach(() => {
    props.reviewBook.reset();
  });

  beforeEach(() => {
    wrapper = shallow(<Reviews {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the submitForm() method', () => {
    const values = {
      review: 'I love this book',
    };
    wrapper.instance().submitForm(values);
    expect(Reviews.prototype.submitForm.called).toEqual(true);
    expect(props.reviewBook.called).toEqual(true);
  });

  it(`calls the submitForm() method and notifies user
    with an error if review is empty`, () => {
    const values = {
      review: '',
    };
    wrapper.instance().submitForm(values);
    expect(Reviews.prototype.submitForm.called).toEqual(true);
    expect(NotifyError.called).toEqual(true);
    expect(NotifyError.calledWith('Review must not be empty'))
      .toEqual(true);
    expect(props.reviewBook.called).toEqual(false);
  });

  it('renders p if there are no reviews', () => {
    wrapper.setProps({
      reviews: [],
      book: books.bookDataResponse.book,
    });
    expect(wrapper.find('p').text()).toEqual('No Reviews yet.');
    expect(wrapper.find('.review-box')).toHaveLength(0);
  });
});
