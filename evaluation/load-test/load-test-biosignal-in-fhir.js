// k6 script for the concurrent FHIR integration test with the FASS-ECG API.
// Usage: k6 run -e BASE_URL=<FASS-ECG server URL> -e OBSERVATION_ID=<Observation id> load-test-biosignal-in-fhir.js
// The endpoint of the original test was replaced by the BASE_URL and OBSERVATION_ID variables; the rest is unchanged.

import { sleep} from "k6";
import http from "k6/http";
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';
export const options = {
    scenarios:{
        open_model: {
            executor: 'ramping-arrival-rate',
            timeUnit: '1s',
            preAllocatedVUs: 500,
            stages: [
                { duration: "3m", target: 10 }, // below normal load
                { duration: "3m", target: 20 },
                { duration: "3m", target: 30 }, // around the breaking point
        
                { duration: "3m", target: 40 }, // beyond the breaking point
        
                { duration: "10m", target: 0 }, // scale down. Recovery stage.
            ]
          },
    }
   
}
const mockValues = []
for(let i = 0 ; i < 10 ; i++){
    let time = Math.floor(Math.random() *  (60 - 10) + 10);
    let values = [];
    for (let b =0 ;b < (time ) ; b++){
        values.push(0);
    }
    mockValues.push(values);
}

export default function (){

    let time = Math.floor(Math.random() *   10);
    let values = [];
    for (let i =0 ;i < (time  * 600 ) ; i++){
        
        values.push(0);
    }
  tagWithCurrentStageIndex();
    // console.log(JSON.stringify([{
    //     op:"add",
    //     path:"/component/0/valueSampleData/data",
    //     value: values.join(' ')}]));
    const res = http.patch(`${__ENV.BASE_URL}/baseR4/Observation/${__ENV.OBSERVATION_ID}`,JSON.stringify([{
        op:"add",
        path:"/component/0/valueSampleData/data",
        value: values.join(' ')
    }]), { headers: { 'Content-Type': 'application/json' }})
    console.log(res.status)
    
}