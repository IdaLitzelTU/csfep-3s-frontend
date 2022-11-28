import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Link from "next/link"
import Stack from "@mui/material/Stack"
import Image from "next/image"
import { useRouter } from "next/router"

function NavBar() {
  const currentRoute = useRouter().asPath

  const menuItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/framework",
      title: "3S Framework",
    },
    {
      href: "/model",
      title: "3S Model",
    },
    {
      href: "/about",
      title: "Contact",
    },
  ]

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
              display: { xs: "flex", md: "flex" },
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
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
                      color: currentRoute === href ? "#afb0ae" : "white",
                      display: "block",
                      textTransform: "none",
                      fontFamily: currentRoute === href ? "Gotham Book": "Gotham Medium" 
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
  )
}
export default NavBar
