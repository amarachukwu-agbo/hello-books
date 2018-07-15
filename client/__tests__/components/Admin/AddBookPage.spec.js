/* eslint-disable */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import request from 'superagent/lib/client';
import nocker from 'superagent-nock';
import ConnectedAddBookPage,
{ AddBookPage } from '../../../components/Admin/AddBookPage';


const props = {
  addBook: sinon.spy(() => Promise.resolve()),
};

const files = [
  {
    lastModified: 1528116253099,
    preview: 'blob:http://127.0.0.1:8080/33e8015f-6038-49ff-a8fd-8fedd140bf1a',
    size: 5610114,
    type: 'image/jpeg',
  },
];
const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const nock = nocker(request);

nock('https://api.cloudinary.com/v1_1/test-url')
  .post('/image/upload')
  .reply(200, {
    secure_url: 'http://res.cloudinary.com/ama-hello-books-v2/image/upload/v1531091938/accessory-bracelets-earrings-949590_zawwj1.jpg', /*eslint-disable-line*/
  });


describe('<AddBookPage />', () => {
  it('should render correctly', () => {
    const tree = shallow(<AddBookPage {...props}/>);
    expect(tree).toMatchSnapshot();
  });

  it('calls submitForm()', () => {
    const values = {
      author: 'Author',
      title: 'A book',
      quantity: 5,
      description: 'A new book',
      subject: {
        value: 'Romance',
      },
    };
    const wrapper = shallow(<AddBookPage {...props}/>);
    wrapper.setState({
      cloudinaryUrl: 'http://res.cloudinary.com/test-url/image/upload/v1531091938/accessory-bracelets-earrings-949590_zawwj1.jpg',
    });
    sinon.spy(wrapper.instance(), 'submitForm');
    wrapper.instance().submitForm(values);
    expect(wrapper.instance().submitForm.calledOnce)
      .toEqual(true);
    expect(props.addBook.called).toEqual(true);
    expect(props.addBook.calledWith({
      ...values,
      subject: values.subject.value,
      imageURL: wrapper.state().uploadedFileCloudinaryUrl,
    }))
      .toEqual(true);
  });

  it('calls handleDrop() method', () => {
    const wrapper = shallow(<AddBookPage {...props}/>);
    sinon.spy(wrapper.instance(), 'handleDrop');
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().handleDrop.called).toEqual(true);
    expect(wrapper.state().uploadedFileCloudinaryUrl)
      .toEqual('http://res.cloudinary.com/ama-hello-books-v2/image/upload/v1531091938/accessory-bracelets-earrings-949590_zawwj1.jpg');
    expect(wrapper.state().uploadError)
      .toEqual('');
    expect(wrapper.state().isUploadingImage)
      .toEqual(false);
  });
});

describe('<ConnectedAddBookPage />', () => {
  it('should render successfully', () => {
    const connectedWrapper =
      shallow(<ConnectedAddBookPage store = { store }/>);
    expect(connectedWrapper.length).toBe(1);
  });
});

