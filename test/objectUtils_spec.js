import { expect } from 'chai';
import { compact } from '../util/objectUtils.js';

describe('objectUtils', function() {
  describe('compact', function() {
    it('should remove undefined values from an object', function() {
      const obj = {
        'title': 'Book 1',
        'author': undefined,
        'currentlyReading': false,
      };

      const compacted = compact(obj);
      expect(compacted).to.not.have.property('author');
      expect(compacted).to.not.have.property('meta');
      expect(compacted).to.have.property('title');
      // does not filter false
      expect(compacted).to.have.property('currentlyReading');
    });
  });
});
