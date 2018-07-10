import React from 'react';
import renderer from 'react-test-renderer';
import Preloader from '../../components/Common/Preloader';

describe('<Preloader>', () => {
  it('should render the preloader component correctly', () => {
    const tree = renderer.create(<Preloader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
