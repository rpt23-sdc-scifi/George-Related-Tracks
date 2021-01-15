import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');
const rps = 1000

export let options = {
  stages: [
    { duration: '2m', target: 100, rps },
    { duration: '2m', target: 200, rps },
    { duration: '2m', target: 300, rps },
    { duration: '2m', target: 400, rps },
    { duration: '4m', target: 0, rps },
  ],
  thresholds: {
    'failed requests': ['rate<0.1'],
    http_req_duration: ['p(90)<500', 'avg<700']
  }
}


export default function () {
  let res = http.get(`http://localhost:3001/${Math.ceil(Math.random() * 10000000)}`);
  myFailRate.add(res.status !== 200);
  sleep(1);
}