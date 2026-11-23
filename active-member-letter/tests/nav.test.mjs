import { test } from "node:test";
import assert from "node:assert/strict";
import { step, gesture, slideFromHash } from "../nav.js";

test("step moves forward and back, stopping at both ends", () => {
  assert.equal(step(0, 1, 12), 1);
  assert.equal(step(11, 1, 12), 11);
  assert.equal(step(5, -1, 12), 4);
  assert.equal(step(0, -1, 12), 0);
});

test("a short touch is a tap, which goes forward", () => {
  assert.equal(gesture(3, 4), 1);
});

test("a swipe to the left goes forward, to the right goes back", () => {
  assert.equal(gesture(-80, 10), 1);
  assert.equal(gesture(80, -10), -1);
});

test("a mostly vertical drag does nothing", () => {
  assert.equal(gesture(30, 120), 0);
});

test("a drag that is neither a tap nor a swipe does nothing", () => {
  assert.equal(gesture(25, 0), 0);
});

test("the address hash picks the slide, counted from 1", () => {
  assert.equal(slideFromHash("#4", 12), 3);
  assert.equal(slideFromHash("", 12), 0);
  assert.equal(slideFromHash("#abc", 12), 0);
  assert.equal(slideFromHash("#99", 12), 11);
  assert.equal(slideFromHash("#0", 12), 0);
});
