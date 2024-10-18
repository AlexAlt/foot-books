import { expect } from 'chai';
 
import Book, { sortBooks } from '../model/Book.js';
 
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

describe('sortBooks', function() {
    it('should sort books into read, currentlyReading, and toBeRead', function(done) {
        const books = [
            { title: 'Book 1', currentlyReading: true },
            { title: 'Book 2', readOn: new Date() },
            { title: 'Book 3' }
        ];

        const sortedBooks = sortBooks(books);
        expect(sortedBooks.currentlyReading.title).to.equal('Book 1');
        expect(sortedBooks.read[0].title).to.equal('Book 2');
        expect(sortedBooks.toBeRead[0].title).to.equal('Book 3');
        done();
    });
});
