import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './home.css';
import Posts from '../../components/posts/Posts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts${search}`);
        const filteredPosts = res.data.filter(post => post.username === user.username);
        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [search, user]);

  return (
    
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
