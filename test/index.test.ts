import * as index from '../lib/index';

describe('Index', () => {
  test('export LoadBalancer class', () => {
    const classes = Object.keys(index);
    expect(classes).toContain('LoadBalancer');
  });
});
