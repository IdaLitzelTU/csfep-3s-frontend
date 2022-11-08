import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/router";

function NavBar() {
  const currentRoute = useRouter().asPath;

  const menuItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/datasets",
      title: "Manage Datasets",
    },
    {
      href: "/model",
      title: "Run Model",
    },
    {
      href: "/about",
      title: "About",
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{ color: "#95E338", backgroundColor: "#005B36" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            <Image
              src="/logo.jfif"
              alt="csfep logo"
              width={185}
              height={75}
              object-fit="cover"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack spacing={2} direction="row">
              {menuItems.map(({ href, title }) => (
                <Link href={href} key={href}>
                  <Button
                    className={
                      currentRoute === href
                        ? "Navbar-Button-active"
                        : "Navbar-Button"
                    }
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
