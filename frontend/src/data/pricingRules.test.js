import test from 'node:test';
import assert from 'node:assert/strict';
import { VOLUME_BANDS, volumeBandFor, billableSeconds } from './pricingRules.js';

test('volume boundaries are deterministic, including the former million-minute bug', () => {
  for (const [minutes,index] of [[1,0],[20000,0],[20001,1],[100000,1],[100001,2],[300000,2],[300001,3],[1000000,3],[1000001,4],[1200000,4]]) assert.equal(volumeBandFor(minutes),VOLUME_BANDS[index]);
  for (const band of VOLUME_BANDS) assert.equal(volumeBandFor(band.preset),band);
});
test('short connected calls obey minimum and six-second rounding', () => {
  for (const [seconds,billed] of [[0,0],[1,30],[10,30],[30,30],[31,36],[36,36],[37,42],[42,42],[162,162]]) assert.equal(billableSeconds(seconds),billed);
});
