import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AddBookForm from '../../../../components/Admin/Form/AddBookForm';

let store;
let wrapper;

const props = {
  isAdding: false,
  submitForm: sinon.spy(() => Promise.resolve()),
  uploadedFile: '',
  uploadError: '',
  uploadedFileCloudinaryUrl: '',
  isUploadingImage: false,
  handleDrop: sinon.spy(() => Promise.resolve()),
};

describe('<LoginForm />', () => {
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    wrapper = mount(<Provider store={store}>
      <AddBookForm {...props}/>
    </Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('throws error if title field is visited and is blank', () => {
    const titleInput = wrapper.find('#title').last();
    titleInput.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Book title is required');
  });

  it('throws error if author field is visited and is blank', () => {
    const author = wrapper.find('#author').last();
    author.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Book author is required');
  });

  it('throws error if description field is visited and is blank', () => {
    const description = wrapper.find('#description').last();
    description.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text())
      .toEqual('Book description is required');
  });

  it('throws error if quanity field is visited and is blank', () => {
    const quantity = wrapper.find('#quantity').last();
    quantity.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text())
      .toEqual('quantity is required');
  });

  it('sets input values to store on input change', () => {
    const description = wrapper.find('#description').last();
    description.simulate('change', { target: { value: 'A nice book' } });
    expect(store.getState().form.book.values).toEqual({
      description: 'A nice book',
    });
  });

  it(`does not call the submitForm() method on form submit
    if some fields are missing`, () => {
    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(0);
  });


  it('shows a spinner icon when image is uploading', () => {
    wrapper.setProps({
      children: React.cloneElement(
        wrapper.props().children,
        { isUploadingImage: true },
      ),
    });
    expect(wrapper.find('i.fa-spinner')).toHaveLength(1);
  });
});
