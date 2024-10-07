import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import MainContent from "./components/MainContent";
import AddMovie from "./AddMovie/AddMovie";
import Footer from "./components/Footer";

import getBlogTheme from "./theme/getBlogTheme";

export default function Add() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    // <TemplateFrame
    //   toggleCustomTheme={toggleCustomTheme}
    //   showCustomTheme={showCustomTheme}
    //   mode={mode}
    //   toggleColorMode={toggleColorMode}
    // >
    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <AppAppBar toggleColorMode={toggleColorMode} mode={mode} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 8, gap: 4 }}
      >
        <AddMovie />
        {/* <Latest /> */}
      </Container>
      <Footer />
    </ThemeProvider>
    // </TemplateFrame>
  );
}
