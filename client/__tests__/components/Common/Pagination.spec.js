import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Pagination from '../../../components/Common/Pagination';

let wrapper;

const props = {
  pagination: {
    currentPage: 4,
    dataCount: 20,
    pageCount: 8,
  },
  onPageChange: sinon.spy(() => Promise.resolve()),
};

describe('<Pagination />', () => {
  beforeEach(() => {
    wrapper = shallow(<Pagination {...props}/>);
  });
  it(`calls the onPageChange() method when
    the previous button is clicked`, () => {
    const previousButton = wrapper.find('#previous');
    previousButton.simulate('click');
    expect(props.onPageChange.called).toEqual(true);
    expect(props.onPageChange.calledWith(3)).toEqual(true);
  });

  it(`calls the onPageChange() method when
    the next button is clicked`, () => {
    const nextButton = wrapper.find('#next');
    nextButton.simulate('click');
    expect(props.onPageChange.called).toEqual(true);
    expect(props.onPageChange.calledWith(5)).toEqual(true);
  });

  it('renders correctly when floating button is true', () => {
    wrapper.setProps({
      floatingButton: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the onPageChange() method when floating button is true and
    the previous button is clicked`, () => {
    wrapper.setProps({
      floatingButton: true,
    });
    const previousButton = wrapper.find('#floating-previous');
    previousButton.simulate('click');
    expect(props.onPageChange.called).toEqual(true);
    expect(props.onPageChange.calledWith(3)).toEqual(true);
  });

  it(`calls the onPageChange() method when floating button is true and
    the next button is clicked`, () => {
    wrapper.setProps({
      floatingButton: true,
    });
    const nextButton = wrapper.find('#floating-next');
    nextButton.simulate('click');
    expect(props.onPageChange.called).toEqual(true);
    expect(props.onPageChange.calledWith(5)).toEqual(true);
  });
});
