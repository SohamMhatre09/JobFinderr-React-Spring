  import React, { useEffect, useState } from "react";
  import { Box, Card, Grid, TextField, Typography, InputAdornment, Button } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import { Link } from "react-router-dom";
  import axios from "axios";
  import './Feed.css';

  const Feed = () => {
    const [query, setQuery] = useState("");
    const [searched, setSearched] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/posts/${query}`);
          setPosts(response.data);
          setSearched(query);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      const fetchInitialPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/allPosts`);
          setPosts(response.data);
          console.log(response.data);
          setSearched("");
        } catch (error) {
          console.error("Error fetching initial posts:", error);
        }
      };

      if (query.length === 0) fetchInitialPosts();
      if (query.length > 2) fetchPosts();
    }, [query]);

    return (
      <Grid container spacing={2} className="container">
        <Grid item xs={12} md={12} lg={12}>
          <Button variant="outlined" className="button">
            <Link to="/">Home</Link>
          </Button>
          <Box>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search..."
              className="searchBar"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Grid>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} md={6} lg={4}>
            <Card className="card">
              <Typography variant="h5" className="postTitle">
                {post.profile}
              </Typography>
              <Typography className="description" variant="body1">
                Description: {post.desc}
              </Typography>
              <br />
              <br />
              <Typography variant="h6">Years of Experience: {post.exp} years</Typography>
              <Typography variant="body1" className="skillsTitle">
                Skills:
              </Typography>
              {post.techs.map((tech, index) => (
                <Typography key={index} variant="body1" className="skill">
                  {tech} .
                </Typography>
              ))}
            </Card>
          </Grid>
        ))}
        {searched === "" && posts.length === 0 && (
          <Typography variant="body1">No posts available.</Typography>
        )}
        {searched !== "" && posts.length === 0 && (
          <Typography variant="body1">No posts found for "{searched}".</Typography>
        )}
      </Grid>
    );
  };

  export default Feed;
