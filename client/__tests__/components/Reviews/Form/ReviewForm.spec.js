import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ReviewForm from '../../../../components/Reviews/Form/ReviewForm';

let store;
let wrapper;

const props = {
  isReviewing: false,
  submitForm: sinon.spy(() => Promise.resolve()),
};

describe('<ReviewForm />', () => {
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    wrapper = mount(<Provider store={store}>
      <ReviewForm {...props}/>
    </Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
    props.submitForm.reset();
  });

  it('sets review string to store on input change', () => {
    const review = wrapper.find('#review').last();
    review.simulate('change', { target: { value: 'A nice book' } });
    expect(store.getState().form.review.values).toEqual({
      review: 'A nice book',
    });
  });

  it('calls the submitForm() on form submit', () => {
    const review = wrapper.find('#review').last();
    review.simulate('change', { target: { value: 'A nice book' } });
    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(1);
  });
});
