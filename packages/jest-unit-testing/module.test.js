import mut from './module.js';

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    expect(mut.div(10, 2)).toBe(5);
});

test('Testing div -- div by 0', () => {
    expect(mut.div(10, 0)).toBe(Infinity);
});

test('Testing div -- floats', () => {
    expect(mut.div(10, 3)).toBeCloseTo(3.333);
});

test('Testing containsNumbers -- success', () => {
    expect(mut.containsNumbers("123")).toBe(true);
});

test('Testing containsNumbers -- no numbers', () => {
    expect(mut.containsNumbers("abc")).toBe(false);
});

test('Testing containsNumbers -- empty string', () => {
    expect(mut.containsNumbers("")).toBe(false);
});

test('Testing containsNumbers -- mixed', () => {
    expect(mut.containsNumbers("ab1c!")).toBe(true);
});

test('Testing containsNumbers -- everything that isnt a number', () => {
    expect(mut.containsNumbers("qwertyuiopasdfghjklzxcvbnm~!@#$%^&*()_+`-={}|;:'/<>,. \\|")).toBe(false);
});