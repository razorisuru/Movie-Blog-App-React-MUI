import React, { useState } from "react";
import { Grid, TextField, Button, CircularProgress, Box } from "@mui/material";
import axios from "axios";

const AddMovie = () => {
  // States to store the input data
  const [inputValue, setInputValue] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  // Handle initial input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Fetch data from the API based on user input
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${inputValue}?api_key=d456376837323d36e86f76d34160a1aa`
      );
      const data = response.data;
    //   console.log(data);

      // Update form fields and image with API data
      setFormData({
        field1: data.original_title,
        field2: data.overview,
        field3: data.release_date,
      });
      setImage(`https://image.tmdb.org/t/p/original/${data.backdrop_path}`); // Assuming you get an image URL from the API
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (to send data to MongoDB)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://your-backend-api/mongodb",
        formData
      );
      console.log("Data sent to MongoDB", response.data);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} mt={2}>
        {/* Input field to get the initial data */}
        <Grid item xs={12} md={12}>
          <TextField
            label="Enter Query"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Button to trigger the API call */}
        <Grid item xs={12} md={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Fetch Data"}
          </Button>
        </Grid>

        {/* Display API data in form fields */}
        {apiData && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="Field 1"
                fullWidth
                value={formData.field1}
                onChange={(e) =>
                  setFormData({ ...formData, field1: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Field 2"
                fullWidth
                value={formData.field2}
                onChange={(e) =>
                  setFormData({ ...formData, field2: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Field 3"
                fullWidth
                value={formData.field3}
                onChange={(e) =>
                  setFormData({ ...formData, field3: e.target.value })
                }
              />
            </Grid>

            {/* Display image from the API */}
            {image && (
              <Grid item xs={12} md={12}>
                <Box mt={2}>
                  <img src={image} alt="Fetched from API" width="100%" />
                </Box>
              </Grid>
            )}
          </>
        )}

        {/* Submit button to send the form data to MongoDB */}
        <Grid item xs={12} md={12}>
          <Button type="submit" variant="contained" color="secondary">
            Submit to MongoDB
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMovie;
