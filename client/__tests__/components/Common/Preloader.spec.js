import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../../../components/Common/Preloader';

describe('<Preloader>', () => {
  it('should render the preloader component correctly', () => {
    const tree = shallow(<Preloader />);
    expect(tree).toMatchSnapshot();
  });
});
