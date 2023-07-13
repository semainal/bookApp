import "./list.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import Header from '../../components/header/Header';
  
  const List = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState('');
    const { search } = useLocation();
    const { user } = useContext(Context);


  
      useEffect(() => {
        const fetchBooks = async () => {
     
     
        try {
        const res = await axios.get(`/books${search}`);
        const filteredBooks = res.data.filter(book => book.username === user.username);
        setBooks(filteredBooks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [search, user]);
  

  
  const createBook = async () => {
    try {
      const res = await axios.post("/books", { title: newBook, username: user.username }); // MongoDB'ye yeni bir kitap eklemek için kullanılacak endpoint'i burada belirtin
      setBooks([...books, res.data]);
      setNewBook('');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
    const deleteBook = async (id) => {
      try {
        await axios.delete(`/books/${id}`, {
          data: {username: user.username}
      })// MongoDB'den belirli bir görevi silmek için kullanılacak endpoint'i burada belirtin
        setBooks(books.filter(book => book._id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
      <Header/>
      <div className='bookList'>
        <h1 className='bookListTitle'>Okumak İstediğim Kitaplar</h1>
        <input className="bookListInput"
          type="text"
          value={newBook}
          onChange={e => setNewBook(e.target.value)}
        />
        <button className='bookListButton' onClick={createBook}>Ekle</button>
        <ul >
          {books.map(book => (
            <li className="bookListLi" key={book._id}>
              {book.title}
              <button className='bookListDeleteButton' onClick={() => deleteBook(book._id)}>Sil</button>
            </li>
          ))}
        </ul>
      </div>
      </>
    );
  };
  
  export default List;
  