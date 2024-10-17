import { expect } from 'chai';
 
import Book from '../model/Book.js'
 
describe('book', function() {
    it('should be invalid if title is empty', function(done) {
        const book = new Book();

        book.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
        done();
    });

    it('should set default value for currentlyReading', function(done) {
        const book = new Book();
        expect(book.currentlyReading).to.be.false;
        done();
    });
});
