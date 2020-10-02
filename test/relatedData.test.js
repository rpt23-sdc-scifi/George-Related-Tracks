// import React from 'react';
// import renderer from 'react-test-renderer';
// import RelatedTracks from '../client';
const {MongoClient} = require('mongodb');

// test('Page renders', () => {
//   const component = renderer.create(
//     <RelatedTracks></RelatedTracks>
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
    });
    db = await connection.db('Track');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});

describe('delete', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
    });
    db = await connection.db('Track');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.findOneAndDelete(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(null);
  });
});