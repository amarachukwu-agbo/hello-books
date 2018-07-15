import React from 'react';
import { shallow } from 'enzyme';
import PageFooter from '../../../components/Common/PageFooter';

describe('<PageFooter>', () => {
  it('should render the footer correctly', () => {
    const tree = shallow(<PageFooter />);
    expect(tree).toMatchSnapshot();
  });
});
