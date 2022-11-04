import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import Stack from "@mui/material/Stack";


function NavBar() {
  const menuItems = [
    {
      href: "/about",
      title: "About",
    },
    {
      href: "/datasets",
      title: "Datasets",
    },
    {
      href: "/model",
      title: "Model",
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#95E338", color: "#005B36" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CSFEP-3S
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack spacing={2} direction="row">
              {menuItems.map(({ href, title }) => (
                <Link href={href} key={href}>
                  <Button
                    key={title}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                    variant="text"
                  >
                    {title}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
