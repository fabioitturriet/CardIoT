# Concurrent integration test (k6)

[`load-test-biosignal-in-fhir.js`](load-test-biosignal-in-fhir.js) is the [k6](https://k6.io/) script on which the concurrent FHIR integration evaluation of the article (Section 4.4.2) was based. It sends mock ECG data to an `Observation` resource of the FASS-ECG API through HTTP PATCH requests.

## Workload

| Parameter | Value |
|---|---|
| Executor | `ramping-arrival-rate` (open model), with a `timeUnit` of 1 s |
| Stages | Linear ramps to 10, 20, 30, and 40 requests per second (3 min each), followed by a ramp down to 0 (10 min, recovery) |
| Virtual users | 500 pre-allocated |
| Request | One PATCH per iteration, with a JSON Patch `add` operation that appends samples to the first component (one lead) of the same `Observation` |
| Payload | 0 to 5400 zero-valued samples, in random steps of 600; request body of approximately 0.07 to 10.9 kB |
| Retries | None |

## Running

1. Create an ECG `Observation` on a FASS-ECG server (see [`../../fhir-examples/`](../../fhir-examples/)) and note its identifier.
2. Run:

   ```
   k6 run -e BASE_URL=https://<server> -e OBSERVATION_ID=<id> load-test-biosignal-in-fhir.js
   ```

The script imports k6-utils from jslib.k6.io, so the machine running k6 needs internet access.

The endpoint of the original test was replaced by the `BASE_URL` and `OBSERVATION_ID` variables; the rest of the script is unchanged.
