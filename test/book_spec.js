import { expect } from 'chai';
 
import Book, { sortBooks, toBeRead } from '../model/Book.js';
 
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

describe('reading books from the database', function(done) {
    // seed models in DB
    beforeEach(() => { 
        const reading =  new Book({ title: 'Book 1', currentlyReading: true })
        const read =  new Book({ title: 'Book 2', readOn: new Date() })
        const tbr1 =  new Book({ title: 'Book 3' })
        const tbr2 =  new Book({ title: 'Book 4' })

        reading.save() 
            .then(() => read.save())
            .then(() => tb1r.save())
            .then(() => tb2r.save())
            .then(() => done()); 
    }); 

    describe('toBeRead', function (done) {
        it('should return books that are not read and not currentlyReading', async function () {
            toBeRead().then((books) => {
                expect(books.length).to.equal(1);
                expect([tbr1.title, tbr2.title]).to.include(books[0].title);
            })
        });
    });
    
    describe('sortBooks', function (done) {
        it('should sort books into read, currentlyReading, and toBeRead', async function () {
            sortBooks().then(() => {
                expect(sortedBooks.reading[0].title).to.equal('Book 1')
                expect(sortedBooks.read[0].title).to.equal('Book 2');
                expect(sortedBooks.toBeRead.map(book => book.title)).to.have.members(['Book 3', 'Book 4']);
            })
        });
    });
});
