import React from 'react';
import renderer from 'react-test-renderer';
import RelatedTracks from '../client';

test('Page renders', () => {
  const component = renderer.create(
    <RelatedTracks></RelatedTracks>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});