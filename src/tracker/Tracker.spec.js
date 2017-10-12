// @flow

const mockErrorTracker = jest.genMockFromModule('./ErrorTracker');
jest.mock('./ErrorTracker', () => mockErrorTracker);

const { initialize } = require('./Tracker');

describe('tracker', () => {
  beforeEach(() => {
    mockErrorTracker.initialize.mockClear();
  });

  it('can initialize', () => {
    initialize();
    expect(mockErrorTracker.initialize).toHaveBeenCalledTimes(1);
  });
});