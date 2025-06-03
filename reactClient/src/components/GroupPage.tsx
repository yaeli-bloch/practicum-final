// // import { useEffect, useState } from "react";
// // import { Typography, Container, Button, Box, Snackbar, Alert } from "@mui/material";
// // import axios from "axios";
// // import { useNavigate, useLocation, Outlet } from "react-router-dom";
// // import Uploader from "./upload";
// // import { jwtDecode } from "jwt-decode";
// // import GptChat from "./GptChat";
// // import GroupChat from "./GroupChat";

// // const GroupPage = () => {
// //   const [group, setGroup] = useState<any | null>(null);
// //   const [activeComponent, setActiveComponent] = useState<string | null>(null);
// //   const [showAlert, setShowAlert] = useState(false);
// //   const [userId, setUserId] = useState<number | null>(null);
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const groupId = location.state?.groupId;

// //   useEffect(() => {
// //     const token = localStorage.getItem("authToken");
// //     if (token) {
// //       try {
// //         const decoded: any = jwtDecode(token);
// //         setUserId(decoded.id);
// //       } catch (error) {
// //         console.error("שגיאה בפענוח הטוקן:", error);
// //       }
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchGroupDetails = async () => {
// //       try {
// //         const response = await axios.get(`https://localhost:7287/api/Group/${groupId}`);
// //         setGroup(response.data);
// //       } catch (error) {
// //         console.error("שגיאה בשליפת הקבוצה:", error);
// //       }
// //     };

// //     if (groupId) {
// //       fetchGroupDetails();
// //     }
// //   }, [groupId]);

// //   const handleClick = (component: string | null, path?: string) => {
// //     setActiveComponent(null); // מנקה תמיד
    
// //     if (path) {
// //       navigate(path, { state: { groupId } });
// //     } else if (component) {
// //       navigate("/myGroup", { state: { groupId } })
// //       setActiveComponent(component);
// //     }
// //   };

// //   const goToAddMember = () => {
     
// //     if (!group || userId === null) return;
// //     if (String(userId) !== String(group.adminId)) {
// //       setShowAlert(true);
// //       return;
// //     }
// //     handleClick("manager");
// //   };

// //   if (!group || userId === null) {
// //     return <div>טוען נתונים...</div>;
// //   }

// //   return (
// //     <Container
// //       maxWidth="sm"
// //       sx={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         minHeight: "100vh",
// //         textAlign: "center",
// //         position: "relative",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           position: "fixed",
// //           top: "60px",
// //           left: "50%",
// //           transform: "translateX(-50%)",
// //           display: "flex",
// //           gap: "10px",
// //           background: "white",
// //           padding: "10px",
// //           borderRadius: "8px",
// //           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
// //           zIndex: 1000,
// //         }}
// //       >
// //         <Button onClick={() => handleClick(null, "calendar")} variant="contained">
// //           אירועי החודש 📅
// //         </Button>
// //         <Button onClick={() => handleClick(null, "/MyGroups")} variant="outlined">
// //           חזרה לקבוצות
// //         </Button>
// //         <Button onClick={() => handleClick("upload")} variant="contained" color="secondary">
// //           העלאת קובץ הזמנה
// //         </Button>
// //         <Button onClick={goToAddMember} variant="contained" color="success">
// //           ניהול משתמשים
// //         </Button>
// //         <Button onClick={() => handleClick(null, "group-users")} variant="contained" color="primary">
// //           רשימת חברים 👥
// //         </Button>
// //         <Button onClick={() => handleClick("chat")} variant="outlined" color="info">
// //           צ'אט GPT 🤖
// //         </Button>
// //         <Button onClick={() => handleClick("groupChat")} variant="outlined" color="secondary">
// //           💬 צ'אט קבוצה
// //        </Button>
// //       </Box>

// //       <Typography variant="h4" gutterBottom sx={{ marginTop: "120px" }}>
// //         {group.name}
// //       </Typography>
// //       <Typography variant="body1">{group.description}</Typography>

// //       {activeComponent === "upload" && (
// //         <Uploader GroupId={groupId} onUploadFinish={() => setActiveComponent(null)} />
// //       )}

// //       {activeComponent === "chat" && (
// //         <Box sx={{ mt: 4, width: "100%" }}>
// //           <GptChat groupId={groupId} />
// //           <Button
// //             variant="text"
// //             color="error"
// //             onClick={() => setActiveComponent(null)}
// //             sx={{
// //               position: "fixed",
// //               top: "80%",
// //               left: 400,
// //               transform: "translateY(-50%)",
// //               zIndex: 1000,
// //             }}
// //           >
// //             ❌ סגור צ'אט
// //           </Button>

// //         </Box>
// //       )}
// // {activeComponent === "groupChat" && (
// //   <Box sx={{ mt: 4, width: "100%" }}>
// //     <GroupChat groupId={groupId} userId={userId} />
// //     <Button
// //       variant="text"
// //       color="error"
// //       onClick={() => setActiveComponent(null)}
// //       sx={{
// //         position: "fixed",
// //         top: "80%",
// //         left: 400,
// //         transform: "translateY(-50%)",
// //         zIndex: 1000,
// //       }}
// //     >
// //       ❌ סגור צ'אט
// //     </Button>
// //   </Box>
// // )}
// //       {activeComponent === "manager" && (
// //         <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
// //           <Button
// //             variant="outlined"
// //             color="primary"
// //             onClick={() => handleClick(null, "add-member")}
// //           >
// //             ➕ הוסף חבר
// //           </Button>
// //           <Button
// //             variant="outlined"
// //             color="error"
// //             onClick={() => handleClick(null, "remove-member")}
// //           >
// //             ➖ הסר חבר
// //           </Button>
// //         </Box>
// //       )}

// //       <Snackbar
// //         open={showAlert}
// //         autoHideDuration={3000}
// //         onClose={() => setShowAlert(false)}
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //       >
// //         <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
// //           רק מנהל הקבוצה יכול להוסיף חברים 😅
// //         </Alert>
// //       </Snackbar>
// //       <Outlet />
// //     </Container>
// //   );
// // };

// // export default GroupPage;
 



import { useEffect, useState } from "react"
import {
  Typography,Container,Button,Box,Snackbar,Alert,Paper,Fade,alpha,IconButton} from "@mui/material"
import axios from "axios"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import Uploader from "./upload"
import { jwtDecode } from "jwt-decode"
import GptChat from "./GptChat"
import GroupChat from "./GroupChat"
import { keyframes } from "@emotion/react"
import CloseIcon from "@mui/icons-material/Close"

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
interface DecorativeCircleProps {
  size: string | number;
  color: string;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  delay: number;
}
// Decorative element
const DecorativeCircle = ({ size, color, top, left, right, bottom, delay }:DecorativeCircleProps) => {
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

const GroupPage = () => {
  const [group, setGroup] = useState<any | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const groupId = location.state?.groupId


  // Vibrant colors
  const vibrantPurple = "#8A2BE2" // BlueViolet
  const vibrantPink = "#FF1493" // DeepPink
  const vibrantBlue = "#1E90FF" // DodgerBlue
  const vibrantTeal = "#00CED1" // DarkTurquoise
  const vibrantOrange = "#FF8C00" // DarkOrange

  // State to track if menu should be collapsed (for all navigation options)
  const [menuCollapsed, setMenuCollapsed] = useState(false)

  // State to track current route page
  const [currentRoutePage, setCurrentRoutePage] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        setUserId(decoded.id)
      } catch (error) {
        console.error("שגיאה בפענוח הטוקן:", error)
      }
    }
  }, [])

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7287/api/Group/${groupId}`)
        setGroup(response.data)
      } catch (error) {
        console.error("שגיאה בשליפת הקבוצה:", error)
      }
    }

    if (groupId) {
      fetchGroupDetails()
    }
  }, [groupId])

  const handleClick = (component: string | null, path?: string) => {
    // Clear active component when selecting a new one
    if (component !== activeComponent) {
      setActiveComponent(null)
    }

    if (path) {
      // For path navigation, collapse the menu but don't set an active component
      setMenuCollapsed(true)
      setCurrentRoutePage(path) // Set current route page
      navigate(path, { state: { groupId } })
    } else if (component) {
      // For component display, collapse menu and set the active component
      setMenuCollapsed(true)
      setCurrentRoutePage(null)
      setActiveComponent(component)
      navigate("/myGroup", { state: { groupId } })
    }
  }

  const handleCloseComponent = () => {
    setActiveComponent(null)
    setCurrentRoutePage(null)
    setMenuCollapsed(false) // Expand menu when closing component
  }

  const goToAddMember = () => {
    if (!group || userId === null) return
    if (String(userId) !== String(group.adminId)) {
      setShowAlert(true)
      return
    }
    setMenuCollapsed(true)
    setActiveComponent("manager")
  }

  if (!group || userId === null) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, #f0f4ff 0%, #f9f0ff 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: vibrantPurple,
            fontWeight: "bold",
          }}
        >
          טוען נתונים...
        </Typography>
      </Box>
    )
  }

  // Define menu options for reuse
  const menuOptions = [
    {
      label: "אירועי החודש",
      icon: "📅",
      onClick: () => handleClick(null, "calendar"),
      variant: "contained",
      color: vibrantPurple,
    },
    {
      label: "חזרה לקבוצות",
      icon: "🏠",
      onClick: () => handleClick(null, "/MyGroups"),
      variant: "outlined",
      color: vibrantPurple,
    },
    {
      label: "העלאת קובץ הזמנה",
      icon: "📤",
      onClick: () => handleClick("upload"),
      variant: "contained",
      color: vibrantPink,
    },
    {
      label: "ניהול משתמשים",
      icon: "👥",
      onClick: goToAddMember,
      variant: "contained",
      color: vibrantTeal,
    },
    {
      label: "רשימת חברים",
      icon: "👥",
      onClick: () => handleClick(null, "group-users"),
      variant: "contained",
      color: vibrantBlue,
    },
    {
      label: "צ'אט GPT",
      icon: "🤖",
      onClick: () => handleClick("chat"),
      variant: "outlined",
      color: vibrantBlue,
    },
    {
      label: "צ'אט קבוצה",
      icon: "💬",
      onClick: () => handleClick("groupChat"),
      variant: "outlined",
      color: vibrantPink,
    },
  ]

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
      }}
    >
      {/* Decorative elements with vibrant colors */}
      <DecorativeCircle
        size="300px"
        color={vibrantPurple}
        top="-5%"
        right="-5%"
        delay={0}
        left={undefined}
        bottom={undefined}
      />
      <DecorativeCircle
        size="250px"
        color={vibrantPink}
        bottom="-10%"
        left="-10%"
        delay={500}
        top={undefined}
        right={undefined}
      />
      <DecorativeCircle
        size="200px"
        color={vibrantBlue}
        top="60%"
        right="-5%"
        delay={1000}
        left={undefined}
        bottom={undefined}
      />
      <DecorativeCircle
        size="180px"
        color={vibrantTeal}
        top="20%"
        left="-5%"
        delay={1500}
        right={undefined}
        bottom={undefined}
      />

      {/* Fixed header with group name */}
      <Box
        sx={{
          position: "fixed",
          top: 50,
          left: 0,
          right: 0,
          zIndex: 100,
          //background: "rgba(255, 255, 255, 0.8)",
          //backdropFilter: "blur(10px)",
          //boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          py: 2,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(45deg, ${vibrantPurple}, ${vibrantPink}, ${vibrantBlue})`,
                backgroundSize: "200% auto",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${shimmer} 5s linear infinite`,
                textShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "25%",
                  width: "50%",
                  height: "3px",
                  background: `linear-gradient(90deg, transparent, ${vibrantPink}, transparent)`,
                  borderRadius: "2px",
                },
              }}
            >
              {group.name}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        {/* Menu Container */}
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={6}
            sx={{
              p: menuCollapsed ? 2 : 5,
              borderRadius: 6,
              maxWidth: "100%",
              mx: "auto",
              mb: menuCollapsed ? 2 : 6,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                          0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                          0 0 30px ${alpha(vibrantPurple, 0.2)} inset`,
              border: "1px solid rgba(255, 255, 255, 0.5)",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.5s ease",
              zIndex: 10,
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
              },
            }}
          >
            {/* Expanded Menu (Grid of Square Buttons) */}
            {!menuCollapsed && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
                  gap: 3,
                }}
              >
                {menuOptions.map((option, index) => (
                  <Button
                    key={index}
                    onClick={option.onClick}
                    variant={option.variant as "contained" | "outlined"}
                    sx={{
                      height: 140,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      bgcolor: option.variant === "contained" ? option.color : "transparent",
                      color: option.variant === "contained" ? "white" : option.color,
                      borderRadius: 4,
                      borderWidth: option.variant === "outlined" ? 2 : 0,
                      borderColor: option.variant === "outlined" ? option.color : "transparent",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      boxShadow: option.variant === "contained" ? `0 8px 20px ${alpha(option.color, 0.4)}` : "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: option.variant === "contained" ? alpha(option.color, 0.9) : alpha(option.color, 0.05),
                        borderColor: option.variant === "outlined" ? option.color : "transparent",
                        color: option.variant === "contained" ? "white" : option.color,
                        transform: "translateY(-3px)",
                        boxShadow:
                          option.variant === "contained"
                            ? `0 12px 25px ${alpha(option.color, 0.5)}`
                            : `0 8px 20px ${alpha(option.color, 0.2)}`,
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <Box sx={{ fontSize: "2rem", mb: 1 }}>{option.icon}</Box>
                    {option.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Collapsed Menu (Horizontal Row of Small Buttons) */}
            {menuCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  gap: 1,
                  py: 1,
                  px: 2,
                  "&::-webkit-scrollbar": {
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: alpha(vibrantPurple, 0.3),
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: alpha(vibrantPurple, 0.05),
                    borderRadius: "3px",
                  },
                }}
              >
                {menuOptions.map((option, index) => (
                  <Button
                    key={index}
                    onClick={option.onClick}
                    variant={option.variant as "contained" | "outlined"}
                    size="small"
                    sx={{
                      minWidth: "auto",
                      whiteSpace: "nowrap",
                      px: 2,
                      py: 1,
                      bgcolor: option.variant === "contained" ? option.color : "transparent",
                      color: option.variant === "contained" ? "white" : option.color,
                      borderRadius: 2,
                      borderWidth: option.variant === "outlined" ? 1 : 0,
                      borderColor: option.variant === "outlined" ? option.color : "transparent",
                      textTransform: "none",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      flexShrink: 0,
                      boxShadow: option.variant === "contained" ? `0 2px 5px ${alpha(option.color, 0.4)}` : "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: option.variant === "contained" ? alpha(option.color, 0.9) : alpha(option.color, 0.05),
                        borderColor: option.variant === "outlined" ? option.color : "transparent",
                        color: option.variant === "contained" ? "white" : option.color,
                        transform: "translateY(-2px)",
                        boxShadow:
                          option.variant === "contained"
                            ? `0 4px 8px ${alpha(option.color, 0.5)}`
                            : `0 2px 5px ${alpha(option.color, 0.2)}`,
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </Button>
                ))}
              </Box>
            )}
          </Paper>
        </Fade>

        {/* Active Component Display */}
        {activeComponent === "upload" && (
          <Fade in={true} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 6,
                maxWidth: 800,
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
                },
              }}
            >
              <Uploader GroupId={groupId} onUploadFinish={handleCloseComponent} />
              <Button
                variant="text"
                color="error"
                onClick={handleCloseComponent}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  color: vibrantPink,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ❌ סגור
              </Button>
            </Paper>
          </Fade>
        )}

        {activeComponent === "chat" && (
          <Fade in={true} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 6,
                maxWidth: 800,
                mx: "auto",
                mb: 6,
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                            0 0 0 1px rgba(255, 255, 255, 0.3) inset,
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
                },
              }}
            >
              <GptChat groupId={groupId} />
              <Button
                variant="text"
                color="error"
                onClick={handleCloseComponent}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  color: vibrantBlue,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ❌ סגור צ'אט
              </Button>
            </Paper>
          </Fade>
        )}

        {activeComponent === "groupChat" && (
          <Fade in={true} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 6,
                maxWidth: 800,
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
                },
              }}
            >
              <GroupChat groupId={groupId} userId={userId} />
              <Button
                variant="text"
                color="error"
                onClick={handleCloseComponent}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  color: vibrantPink,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ❌ סגור צ'אט
              </Button>
            </Paper>
          </Fade>
        )}

        {activeComponent === "manager" && (
          <Fade in={true} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 6,
                maxWidth: 800,
                mx: "auto",
                mb: 6,
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15), 
                            0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                            0 0 30px ${alpha(vibrantTeal, 0.2)} inset`,
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
                  background: vibrantTeal,
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setMenuCollapsed(true)
                    handleClick(null, "add-member")
                  }}
                  sx={{
                    py: 2,
                    px: 4,
                    bgcolor: vibrantTeal,
                    color: "white",
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    boxShadow: `0 8px 20px ${alpha(vibrantTeal, 0.4)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: alpha(vibrantTeal, 0.9),
                      boxShadow: `0 12px 25px ${alpha(vibrantTeal, 0.5)}`,
                      transform: "translateY(-3px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  ➕ הוסף חבר
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setMenuCollapsed(true)
                    handleClick(null, "remove-member")
                  }}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: vibrantPink,
                    color: vibrantPink,
                    textTransform: "none",
                    fontSize: "1.1rem",
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
                    },
                  }}
                >
                  ➖ הסר חבר
                </Button>
              </Box>
              <Button
                variant="text"
                color="error"
                onClick={handleCloseComponent}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  color: vibrantTeal,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ❌ סגור
              </Button>
            </Paper>
          </Fade>
        )}

        {/* Route pages with close button */}
        {currentRoutePage && (
          <Fade in={true} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 6,
                maxWidth: 800,
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
                  background: vibrantPurple,
                },
              }}
            >
              {/* Close button for route pages */}
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handleCloseComponent}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: vibrantPurple,
                    zIndex: 2,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <Box sx={{ pt: 4 }}>
                  <Outlet />
                </Box>

                <Button
                  variant="text"
                  color="error"
                  onClick={handleCloseComponent}
                  sx={{
                    mt: 3,
                    borderRadius: 3,
                    color: vibrantPurple,
                    textTransform: "none",
                    fontWeight: "bold",
                    display: "block",
                    mx: "auto",
                  }}
                >
                  ❌ סגור
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{
            width: "100%",
            bgcolor: vibrantOrange,
            fontWeight: "bold",
          }}
        >
          רק מנהל הקבוצה יכול להוסיף חברים 😅
        </Alert>
      </Snackbar>

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

export default GroupPage
