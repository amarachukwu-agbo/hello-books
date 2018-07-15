import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../components/Common/NotFound.jsx';

describe('<Not Found />', () => {
  it('should render the Not found page correctly', () => {
    const tree = shallow(<NotFound />);
    expect(tree).toMatchSnapshot();
  });
});
