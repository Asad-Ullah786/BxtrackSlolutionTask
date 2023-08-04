var express = require("express");
var router = express.Router();
const Book = require("../utiles/schema");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ _id: -1 });
    res.json({
      message: "successfully fetched data",
      results: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Error fetching books" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, authorName, date, numberOfPages } = req.body;
    const timestamp = Date.parse(date);
    const dateObject = new Date(timestamp);
    // Create a new book object using the model
    const newBook = new Book({
      title,
      author: authorName,
      publishDate: dateObject,
      Pages: numberOfPages,
    });

    // Save the book object to the database
    await newBook.save();

    res.status(201).json({ message: "Book data inserted successfully" });
  } catch (error) {
    console.error("Error inserting book data:", error);
    res.status(500).json({ error: "Error inserting book data" });
  }
});
router.delete("/delete-book/:id", async (req, res) => {
  const bid = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bid);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Error deleting book" });
  }
});
router.put("/update-book/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, authorName, date, numberOfPages } = req.body;
  const timestamp = Date.parse(date);
  const dateObject = new Date(timestamp);

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author: authorName,
        publishDate: dateObject,
        Pages: numberOfPages,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Error updating book" });
  }
});

module.exports = router;
