// home/search page 

import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form"; // search form
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// using ES6

class Home extends Component {
    // property values for the search on home page.
  state = {
    books: [],  // user will input any term.
    q: "",  // user will get back results in a query list from their search term.
    message: "Search For A Book To Begin!"  // static message/placeholder until query is made.
  };

 //  form input when user enters a term to search for.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

 //  event handler for submit button to search for books   
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

 //  gets books from the Google API (utils/API.js).
  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
     //  if no book within that term is found, return this message.
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

 // saves a book to MongoDB with an ID to retrieve later   
  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);
   // properties saved to database (if applicable)
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };

 
  render() {
    return (
        // start all component names in scope with uppercase first letter
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
                {/* lowercase first letter for DOM tags such as <div>, etc */}
              <h1 className="text-center">
                <strong>Google Books</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              
              {/* user input search form, submit button, and query results on home page */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">

              {/* Query results that shows on page after search */}
            <Card title="Results"> 
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                //   message returned if no book is found from term used.
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
