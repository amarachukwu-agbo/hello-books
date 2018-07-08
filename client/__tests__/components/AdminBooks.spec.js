/* import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import AdminBooks from '../AdminBooks';

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
  deleteBook: sinon.spy(),
};
describe('<AdminBooks>', () => {
  it('should display a table with the available books', () => {
    const wrapper = shallow(<AdminBooks { ...props }/>);
    expect(wrapper.find('h4').text()).toEqual('Books Catalog');
    expect(wrapper.find('table').exists()).toBeTruthy();
    expect(wrapper.find('tr').length).toBe(3);
  });

  it('should not display table if there are no available books', () => {
    const wrapper = shallow(<AdminBooks books = {[]} />);
    expect(wrapper.find('p').text()).toEqual('You have not added any books');
    expect(wrapper.find('table').exists()).toBeFalsy();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should call fuction toggleModal when edit button is clicked', () => {
    const spy = sinon.spy(AdminBooks.prototype, 'toggleModal');
    const wrapper = shallow(<AdminBooks { ...props }/>);
    wrapper.find('#editButton0').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith(1, 0));
    spy.restore();
  });

  it('should call fuction deleteBook when delete button is clicked', () => {
    const wrapper = shallow(<AdminBooks { ...props }/>);
    wrapper.find('#deleteButton0').simulate('click');
    expect(props.deleteBook.calledOnce).toEqual(true);
    expect(props.deleteBook.calledWith(1, 0)).toEqual(true);
  });
}); */
