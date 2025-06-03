 "use client"

import { useState } from "react"
import {
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Fade,
  alpha,
} from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import { useAuth } from "../context/AuthContext"
import UserProfileUpdate from "./UpDate"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { keyframes } from "@emotion/react"

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`



const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

// Decorative element
const DecorativeCircle = ({ size, color, top, left, right, bottom, delay }:{size:any
  ,color:any,top:any,left:any,right:any,bottom:any,delay:any
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, rgba(106, 226, 36, 0) 70%)`,
        opacity: 0.6,
        top,
        left,
        right,
        bottom,
        animation: `${float} ${4 + delay / 1000}s infinite ease-in-out`,
        animationDelay: `${delay}ms`,
        zIndex: 0,
        filter: "blur(20px)",
      }}
    />
  )
}

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const { user } = useAuth() // קבלת המשתמש מה-context
  

  // Vibrant colors
  const vibrantPurple = "#8A2BE2" // BlueViolet
  const vibrantPink = "#FF1493"   // DeepPink
  const vibrantBlue = "#1E90FF"   // DodgerBlue
  const vibrantTeal = "#00CED1"   // DarkTurquoise
  const vibrantOrange = "#FF8C00" // DarkOrange

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setCurrentPage("myGroups") // אחרי התחברות, אפשר לעבור לדף קבוצות
  }

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true)
    setCurrentPage("myGroups") // גם אחרי הרשמה
  }

  const handleUpdateProfileClick = () => {
    setShowProfileUpdate(true) // הצגת קומפוננטת עדכון פרטים
  }

  const handleCloseProfileUpdate = () => {
    setShowProfileUpdate(false) // סגירת קומפוננטת העדכון
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #f0f4ff 0%, #f9f0ff 100%)`,
        position: "relative",
        overflow: "hidden",
        pt: 8,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Decorative elements with vibrant colors */}
      <DecorativeCircle size="300px" color={vibrantPurple} top="-5%" right="-5%" delay={0} left={undefined} bottom={undefined} />
      <DecorativeCircle size="250px" color={vibrantPink} bottom="-10%" left="-10%" delay={500} top={undefined} right={undefined} />
      <DecorativeCircle size="200px" color={vibrantBlue} top="60%" right="-5%" delay={1000} left={undefined} bottom={undefined} />
      <DecorativeCircle size="180px" color={vibrantTeal} top="20%" left="-5%" delay={1500} right={undefined} bottom={undefined} />

      <Container maxWidth="sm">
        {/* Back button when not on home page */}
        {currentPage !== "home" && (
          <Box sx={{ mb: 4, textAlign: "start" }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => setCurrentPage("home")} 
              sx={{ 
                mb: 2,
                color: vibrantPurple,
                "&:hover": {
                  bgcolor: alpha(vibrantPurple, 0.1),
                }
              }}
            >
              חזרה לדף הבית
            </Button>
          </Box>
        )}

        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 6, position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${vibrantPurple}, ${vibrantPink}, ${vibrantBlue})`,
                backgroundSize: "200% auto",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${shimmer} 5s linear infinite`,
                textShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
              }}
            >
              share your joy
            ברוכה הבאה לקהילה 
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 600, 
                mx: "auto",
                color: "#555",
                fontWeight: 500,
              }}
            >
              המקום המושלם לשיתוף אירועים, קבצים והזמנות עם הקבוצות שלך
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {!showProfileUpdate && currentPage === "home" && (
            <Fade in={true} timeout={1000}>
              <Paper
                elevation={6}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  maxWidth: 500,
                  mx: "auto",
                  mb: 6,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                              0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                              0 0 30px ${alpha(vibrantPurple, 0.2)} inset`,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: `linear-gradient(90deg, ${vibrantPurple}, ${vibrantPink}, ${vibrantBlue}, ${vibrantTeal})`,
                    backgroundSize: "300% 100%",
                    animation: `${shimmer} 3s linear infinite`,
                  }
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => setCurrentPage("login")}
                    sx={{
                      py: 2,
                      bgcolor: vibrantPurple,
                      color: "white",
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      boxShadow: `0 8px 20px ${alpha(vibrantPurple, 0.4)}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: alpha(vibrantPurple, 0.9),
                        boxShadow: `0 12px 25px ${alpha(vibrantPurple, 0.5)}`,
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      }
                    }}
                  >
                    התחברות
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={() => setCurrentPage("register")}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      borderWidth: 2,
                      borderColor: vibrantPurple,
                      color: vibrantPurple,
                      textTransform: "none",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderWidth: 2,
                        borderColor: vibrantPink,
                        color: vibrantPink,
                        bgcolor: alpha(vibrantPink, 0.05),
                        transform: "translateY(-3px)",
                        boxShadow: `0 8px 20px ${alpha(vibrantPink, 0.2)}`,
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      }
                    }}
                  >
                    הרשמה
                  </Button>
                </Box>
              </Paper>
            </Fade>
          )}

          {!showProfileUpdate && currentPage === "login" && (
            <Fade in={true} timeout={500}>
              <Paper
                elevation={6}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  maxWidth: 500,
                  mx: "auto",
                  mb: 6,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                              0 0 0 1px rgba(234, 18, 18, 0.3) inset,
                              0 0 30px ${alpha(vibrantBlue, 0.2)} inset`,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: vibrantBlue,
                  }
                }}
              >
                <Login onLoginSuccess={handleLoginSuccess} />
              </Paper>
            </Fade>
          )}

          {!showProfileUpdate && currentPage === "register" && (
            <Fade in={true} timeout={500}>
              <Paper
                elevation={6}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  maxWidth: 500,
                  mx: "auto",
                  mb: 6,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                              0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                              0 0 30px ${alpha(vibrantPink, 0.2)} inset`,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: vibrantPink,
                  }
                }}
              >
                <Register onRegisterSuccess={handleRegisterSuccess} />
              </Paper>
            </Fade>
          )}

          {isAuthenticated && !showProfileUpdate && user?.id && (
            <Fade in={true} timeout={500}>
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleUpdateProfileClick}
                  sx={{
                    py: 1.5,
                    px: 4,
                    bgcolor: vibrantOrange,
                    color: "white",
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    boxShadow: `0 8px 20px ${alpha(vibrantOrange, 0.4)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: alpha(vibrantOrange, 0.9),
                      boxShadow: `0 12px 25px ${alpha(vibrantOrange, 0.5)}`,
                      transform: "translateY(-3px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    }
                  }}
                >
                  עדכון פרטים
                </Button>
              </Box>
            </Fade>
          )}

          {showProfileUpdate && user?.id && (
            <Fade in={true} timeout={500}>
              <Paper
                elevation={6}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  maxWidth: 500,
                  mx: "auto",
                  mb: 6,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                              0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                              0 0 30px ${alpha(vibrantOrange, 0.2)} inset`,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: vibrantOrange,
                  }
                }}
              >
                <UserProfileUpdate userId={user.id} onClose={handleCloseProfileUpdate} />
              </Paper>
            </Fade>
          )}
        </Box>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "150px",
          background: `linear-gradient(to top, rgba(255, 225, 0, 0.3) 0%, rgba(255,255,255,0) 100%)`,
          zIndex: 0,
        }}
      />
    </Box>
  )
}

export default HomePage