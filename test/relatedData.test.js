const {MongoClient} = require('mongodb');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const React = require('react');
const {mount, shallow} = require('enzyme');
import RelatedTracks from '../client/index.jsx';
import 'regenerator-runtime/runtime';

Enzyme.configure({adapter: new Adapter()});

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

  it('should delete a doc from collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.findOneAndDelete(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(null);
  });
});

describe('incorrect find', () => {
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

  it('should not find a non-existent doc from collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'other-user-id', name: 'Henry Ford'};

    const insertedUser = await users.findOne({_id: 'other-user-id'});
    expect(insertedUser).toEqual(null);
  });
});

describe('image exists', () => {
  it ('should have an image', async () => {
    const wrapper = await mount(<RelatedTracks />);
    await expect(wrapper.find('img')).toBeTruthy();
  })
})