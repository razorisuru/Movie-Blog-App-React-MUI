import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import LoadingComponent from "./LoadingComponent";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Product",
    title: "Innovative product features that drive success",
    description:
      "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=45",
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  const [movieData, setMovieData] = useState(null); // State to hold a single movie data
  const [moviesData, setMoviesData] = useState(null);
  const [genreData, setGenreData] = useState(null); // State to hold popular movies data
  const movieApiUrl =
    "https://api.themoviedb.org/3/movie/533535?api_key=d456376837323d36e86f76d34160a1aa";
  const popularMoviesApiUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=d456376837323d36e86f76d34160a1aa";
  const genres =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d456376837323d36e86f76d34160a1aa";

  // Fetch single movie data
  useEffect(() => {
    axios
      .get(movieApiUrl)
      .then((response) => {
        setMovieData(response.data); // Update state with the fetched movie data
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  // Fetch popular movies data
  useEffect(() => {
    axios
      .get(popularMoviesApiUrl)
      .then((response) => {
        // Get only the first 9 movies from the response
        setMoviesData(response.data.results.slice(0, 9));
        // console.log(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch genres from TMDB
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=d456376837323d36e86f76d34160a1aa&language=en-US"
        );
        setGenreData(response.data.genres); // Update state with fetched genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleClickG = (genreId) => {
    console.log("Genre clicked:", genreId);
    // You can add filtering logic here or navigation based on genre
  };

  // Render loading states
  if (!movieData || !moviesData) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
        <LoadingComponent />;
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          RaZoR TV
        </Typography>
        <Typography>
          Stay in the loop with the latest about our movies
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
            width: { lg: "75%", sm: "flex" }
          }}
        >
          <Chip
            onClick={() => handleClick("all")}
            size="medium"
            label="All categories"
          />

          {/* Map over fetched genres and display them in Chip components */}
          {genreData.map((genre) => (
            <Chip
              key={genre.id}
              onClick={() => handleClickG(genre.id)} // Pass the genre ID on click
              size="medium"
              label={genre.name}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid", // Optional styling
                borderColor: "#ccc", // Optional styling
                
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {cardData[0].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[0].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[0].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[0].authors} />
          </SyledCard>
        </Grid> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 1 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt={movieData.title}
                image={`https://image.tmdb.org/t/p/w780${movieData.backdrop_path}`} // Fetch the backdrop image for landscape
                aspect-ratio="16 / 9"
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {movieData.genres.map((genre) => genre.name).join(", ")}{" "}
                  {/* Display movie genres */}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {movieData.title} {/* Movie title */}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {movieData.overview} {/* Movie description */}
                </StyledTypography>
              </SyledCardContent>
              <Author
                authors={[
                  {
                    name: movieData.production_companies[0]?.name || "Unknown",
                  },
                ]}
              />{" "}
              {/* Display the production company */}
            </SyledCard>
          </Grid>
        </Grid>
        {moviesData.map((movie, index) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {movie.release_date}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {movie.overview}
                </StyledTypography>
              </SyledCardContent>
              <Author
                authors={[
                  {
                    name: movie.popularity,
                  },
                ]}
              />{" "}
            </SyledCard>
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {cardData[3].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardData[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={cardData[3].authors} />
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {cardData[4].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardData[4].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={cardData[4].authors} />
            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {cardData[5].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[5].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {cardData[5].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[5].authors} />
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
