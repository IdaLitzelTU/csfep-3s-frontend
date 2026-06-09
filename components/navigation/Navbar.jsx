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
      title: "About",
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
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "Gotham Medium, sans-serif",
              fontWeight: 100,
              color: "#efc005",
              textDecoration: "none",
              letterSpacing: "3px",
              transition: "0.4s ease",
              textShadow: `
                4px 4px 5px rgba(0, 30, 15, 0.9),
                0 0 12px rgba(0, 60, 30, 0.4)
              `,
              
              "&:hover": {
                transform: "scale(1.15)",
                textShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
            }}}
          >
            3S
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
                      fontFamily: "Gotham Medium, sans-serif"
                    }}
                    variant="text"
                  >
                    {title}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://www.tu.berlin/urbanoikos/"
          > 
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
              }} >

            <Image
              src="/TU_BERLIN_Logo_Kurz_CMYK_SR_schwarz.png"
              alt="csfep logo"
              width={110}
              height={75}
              object-fit="contain"
            />
            </div>
          </Typography>


    <Typography
          variant="h6"
          noWrap
          component="a"
          href="https://cdrterra.de/consortia/forestovershoot/"
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              bgcolor: "#efc005",
              px: 0.5,
              py: 0.0,
              borderRadius: 2,
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle, #efc005 0%, #efc005 28%, rgba(239,192,5,0) 80%)",
            }}
          >
            <Image
              src="/ForestOvershoot-logo-dark.png"
              alt="ForestOvershoot logo"
              width={120}
              height={90}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Typography>


        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
