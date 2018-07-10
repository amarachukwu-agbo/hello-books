import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import AdminBooks from '../../../components/Admin/AdminBooks.jsx';

const props = {
  books: [
    {
      id: 1,
      title: 'Half of a yellow sun',
      quantity: 20,
      description: 'An enchanting novel',
      subject: 'Fiction',
      author: 'Ngozi Adichie',
      imageURL: 'https://www.images.png',
    },
    {
      id: 2,
      title: 'Her every wish',
      quantity: 10,
      description: 'An enchanting novel',
      subject: 'Fiction',
      author: 'Ngozi Adichie',
      imageURL: 'https://www.images.png',
    },
  ],
  deleteBook: sinon.spy(() => Promise.resolve()),
  setBookForEdit: sinon.spy(() => Promise.resolve()),
};
describe('<AdminBooks>', () => {
  it('should display a table with the available books', () => {
    const wrapper = shallow(<AdminBooks { ...props }/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not display table if there are no available books', () => {
    const wrapper = shallow(<AdminBooks books = {[]} />);
    expect(wrapper.find('p').text()).toEqual('You have not added any books');
    expect(wrapper.find('table').exists()).toBeFalsy();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should call fuction setBookForEdit() when edit button is clicked', () => {
    const wrapper = shallow(<AdminBooks { ...props }/>);
    wrapper.find('#editButton0').simulate('click');
    expect(props.setBookForEdit.calledOnce).toEqual(true);
    expect(props.setBookForEdit.calledWith(1, 0));
  });

  it('should calls fuction deleteBook when delete button is clicked', () => {
    const wrapper = shallow(<AdminBooks { ...props }/>);
    wrapper.find('#deleteButton0').simulate('click');
    expect(props.deleteBook.calledOnce).toEqual(true);
    expect(props.deleteBook.calledWith(1)).toEqual(true);
  });
});
