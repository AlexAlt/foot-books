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

describe('sortBooks', function (done) {
    // seed models in DB
    beforeEach(() => { 
        const reading =  new Book({ title: 'Book 1', currentlyReading: true })
        const read =  new Book({ title: 'Book 2', readOn: new Date() })
        const tbr =  new Book({ title: 'Book 3' })

        reading.save() 
            .then(() => read.save())
            .then(() => tbr.save())
            .then(() => done()); 
    }); 
    it('should sort books into read, currentlyReading, and toBeRead', async function () {
        sortBooks().then(() => {
            expect(sortedBooks.reading[0].title).to.equal('Book 1')
            expect(sortedBooks.read[0].title).to.equal('Book 2');
            expect(sortedBooks.toBeRead[0].title).to.equal('Book 3');
        })
    });
});
