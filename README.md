# Related Tracks

## API

POST /relatedTracks
- Adds a new track with data from req.data

GET /relatedTracks/:songId
- Returns the JSON objects of all related songs

PUT /relatedTracks/:songId
- Updates database entry for the given ID with data from req.data

DELETE /relatedTracks/:songId
- Deletes the database entry for the given ID

## Usage
```sh
npm install
npm run seed
npm run prod
npm run start-server
```
- Runs on Port 3001