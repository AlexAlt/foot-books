import { expect } from 'chai';
 
import Book from '../model/Book.js'
 
describe('book', function() {
    // skipping for now- false positive 
    xit('should be invalid if title is empty', function(done) {
        const book = new Book();

        book.validate(function(err) {
            expect(err.errors.title).to.exist;
        });
        done();
    });

    it('should set default value for currentlyReading', function(done) {
        const book = new Book();
        expect(book.currentlyReading).to.be.false;
        done();
    });
});
