import React, { useState } from "react";
import './Create.css'
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { profile: "", exp: 0, techs: [], desc: "" };

const Create = () => {
  const skillSet = [
    {
      id: 1,
      name: "Javascript"
    },
    {
      id: 2,
      name: "Java"
    },
    {
      id: 3,
      name: "Python"
    },
    {
      id: 4,
      name: "Django"
    },
    {
      id: 5,
      name: "Rust"
    }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate('/employee/feed');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { profile, exp, desc } = form;

  const handleChange = (e) => {
    const { value } = e.target;
    setForm(prevState => ({ ...prevState, techs: [...prevState.techs, value] }));
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="text"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
            label="Job-profile"
            variant="outlined"
            value={profile}
          />
          <TextField
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={exp}
          />
          <TextField
            type="text"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={desc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <Typography variant="h6">Please mention required skills</Typography>
            <ul>
              {skillSet.map(({ id, name }) => (
                <li key={id}>
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${id}`}
                      name={name}
                      value={name}
                      onChange={handleChange}
                    />
                    <label htmlFor={`custom-checkbox-${id}`}>{name}</label>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
