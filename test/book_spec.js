import mongoose from 'mongoose';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

import Book, { sortBooks, toBeRead } from '../model/Book.js';

const connectToDatabase = async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URI)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
};

describe('book', function() {
    beforeEach(async function() {
        await connectToDatabase();
    });

    afterEach(async function() {
        await mongoose.connection.dropCollection('books');
        await mongoose.connection.close();
    });

    it('should be invalid if title is empty', async function() {
        const book = new Book();
        try {
            book.validate();
        } catch (err) {
            expect(err.errors.title).to.exist;
        }
    });

    it('should set default value for currentlyReading', async function() {
        const book = new Book({title: 'Book 1'});
        await book.save();
        expect(book.currentlyReading).to.be.false;
    });
});

describe('reading books from the database', function() {
    let reading, read, tbr1, tbr2;
    beforeEach(async function() { 
        await connectToDatabase();
        // seed models in DB
        reading = new Book({ title: 'Book 1', currentlyReading: true });
        read = new Book({ title: 'Book 2', readOn: new Date() });
        tbr1 = new Book({ title: 'Book 3' });
        tbr2 = new Book({ title: 'Book 4' });
        await reading.save();
        await read.save();
        await tbr1.save();
        await tbr2.save();
    }); 
      
    afterEach(async function() {
        await mongoose.connection.dropCollection('books');
        await mongoose.connection.close();
    });

    describe('toBeRead', function() {
        it('should return books that are not read and not currentlyReading', async function() {
            const books = await toBeRead();
            expect(books.length).to.equal(2);
            expect([tbr1.title, tbr2.title]).to.include(books[0].title);
        });
    });
    
    describe('sortBooks', function() {
        it('should sort books into read, currentlyReading, and toBeRead', async function() {
            const sortedBooks = await sortBooks();
            expect(sortedBooks.currentlyReading[0].title).to.equal('Book 1');
            expect(sortedBooks.read[0].title).to.equal('Book 2');
            expect(sortedBooks.toBeRead.map(book => book.title)).to.have.members(['Book 3', 'Book 4']);
        });
    });
});

describe('updating books', function() {
    beforeEach(async function() {
        await connectToDatabase();
        const book = new Book({title: 'Book 1', currentlyReading: true});
        await book.save();
    });

    afterEach(async function() {
        await mongoose.connection.dropCollection('books');
        await mongoose.connection.close();
    });

    describe('updateMultipleFields', function() {
        it('updates multiple fields at once', async function() {
            const book1 = await Book.findOne({title: 'Book 1'});
            book1.updateMultipleFields({title: 'Book 123', author: 'Me'})
            const result = await book1.save();
            expect(result.title).to.equal('Book 123');
            expect(result.author).to.equal('Me');
            // Does not update existing fields
            expect(result.currentlyReading).to.be.true;
        })
    })
})
