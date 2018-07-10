import React from 'react';
import renderer from 'react-test-renderer';
import PageFooter from '../../components/Common/PageFooter';

describe('<PageFooter>', () => {
  it('should render the footer correctly', () => {
    const tree = renderer.create(<PageFooter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
