import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import GroupForm from "./GroupForm";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Container,
  alpha,
  Fade,
  Grow,
  CircularProgress,
  Paper,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Define animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// New animations for background elements
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const floatSideways = keyframes`
  0% { transform: translateX(0px); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0px); }
`;

const breathe = keyframes`
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(1); }
`;

const MyGroups = () => {
  
  const { user } = useAuth();  
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Vibrant colors
  const vibrantPurple = "#8A2BE2"; // BlueViolet
  const vibrantPink = "#FF1493"; // DeepPink
  const vibrantBlue = "#1E90FF"; // DodgerBlue
  const vibrantMustard = "#E1AD01"; // Mustard
  const vibrantTeal = "#00CED1"; // Dark Turquoise
  const vibrantCoral = "#FF7F50"; // Coral
  
  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    axios
      .get(`https://shareyourjoy-server.onrender.com/api/user/${user.id}/groups`)
      .then((response) => {
        setGroups(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching groups", error);
        setIsLoading(false);
      });
  }, [user]);

  const handleAddGroupClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        textAlign: "center",
        pt: 8,
        pb: 4,
        position: "relative",
        overflow: "hidden", // Important to contain the background elements
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at center, ${alpha("#ffffff", 0.9)} 0%, ${alpha("#f8f9fa", 0.95)} 100%)`,
          zIndex: 0,
        },
      }}
    >
      {/* Enhanced decorative background elements */}
      {/* Large gradient circle */}
      <Box
        sx={{
          position: "absolute",
          top: "-5%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(vibrantMustard, 0.6)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: "blur(30px)",
          animation: `${breathe} 15s infinite ease-in-out`,
          zIndex: 0,
        }}
      />

      {/* Bottom left gradient */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(vibrantBlue, 0.7)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: "blur(35px)",
          animation: `${breathe} 20s infinite ease-in-out reverse`,
          zIndex: 0,
        }}
      />

      {/* Middle gradient */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "15%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(vibrantPurple, 0.7)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.5,
          filter: "blur(20px)",
          animation: `${float} 10s infinite ease-in-out`,
          zIndex: 0,
        }}
      />

      {/* Additional decorative elements */}
      {/* Small floating circles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={`small-circle-${i}`}
          sx={{
            position: "absolute",
            top: `${10 + i * 20}%`,
            left: `${5 + i * 18}%`,
            width: `${20 + i * 5}px`,
            height: `${20 + i * 5}px`,
            borderRadius: "50%",
            backgroundColor: [vibrantPink, vibrantTeal, vibrantCoral, vibrantPurple, vibrantBlue][i % 5],
            opacity: 0.4,
            filter: "blur(4px)",
            animation: `${float} ${8 + i * 2}s infinite ease-in-out ${i}s`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Right side decorative elements */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={`right-element-${i}`}
          sx={{
            position: "absolute",
            top: `${25 + i * 20}%`,
            right: `${8 + i * 5}%`,
            width: `${15 + i * 10}px`,
            height: `${15 + i * 10}px`,
            borderRadius: i % 2 === 0 ? "50%" : "30%",
            backgroundColor: [vibrantTeal, vibrantMustard, vibrantPink, vibrantBlue][i % 4],
            opacity: 0.4,
            filter: "blur(3px)",
            animation: `${i % 2 === 0 ? floatSideways : float} ${10 + i * 3}s infinite ease-in-out ${i * 1.5}s`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Background pattern - subtle grid */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${alpha(vibrantPurple, 0.03)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(vibrantPurple, 0.03)} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          zIndex: 0,
        }}
      />

      {/* Large rotating ring */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: `2px solid ${alpha(vibrantMustard, 0.2)}`,
          opacity: 0.6,
          animation: `${rotate} 60s infinite linear`,
          zIndex: 0,
        }}
      />

      {/* Second rotating ring */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: `2px solid ${alpha(vibrantBlue, 0.15)}`,
          opacity: 0.4,
          animation: `${rotate} 45s infinite linear reverse`,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Grow in={true} timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                background: `linear-gradient(45deg, ${vibrantBlue}, ${vibrantPurple}, ${vibrantMustard})`,
                backgroundSize: "300% auto",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${shimmer} 10s linear infinite`,
                letterSpacing: "0.05em",
                display: "inline-block",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "3px",
                  background: vibrantMustard,
                  borderRadius: "2px",
                },
              }}
            >
              <GroupIcon
                sx={{
                  mr: 1,
                  verticalAlign: "middle",
                  fontSize: "1.2em",
                }}
              />
              הקבוצות שלי
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 2,
                fontStyle: "italic",
                animation: `${float} 6s infinite ease-in-out`,
              }}
            >
              כאן תוכל לנהל את כל הקבוצות שלך
            </Typography>
          </Box>
        </Grow>

        {/* כפתור הוספת קבוצה */}
        <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
          <Button
            variant="contained"
            onClick={handleAddGroupClick}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              position: "fixed",
              top: 80,
              right: 20,
              zIndex: 9999,
              bgcolor: vibrantMustard,
              color: "white",
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: `0 8px 20px ${alpha(vibrantMustard, 0.4)}`,
              py: 1,
              px: 2,
              transition: "all 0.5s ease",
              "&:hover": {
                bgcolor: alpha(vibrantMustard, 0.9),
                boxShadow: `0 12px 25px ${alpha(vibrantMustard, 0.5)}`,
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              letterSpacing: "0.05em",
            }}
          >
            הוסף קבוצה
          </Button>
        </Fade>

        {/* תוכן עיקרי */}
        {showForm ? (
          <Grow in={showForm} timeout={500}>
            <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
              <GroupForm onClose={handleCloseForm} />
            </Box>
          </Grow>
        ) : (
          <Box sx={{ width: "100%", mt: 4 }}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress
                  sx={{ color: vibrantPurple }}
                  size={60}
                  thickness={4}
                />
              </Box>
            ) : groups.length > 0 ? (
              <Fade in={!isLoading} timeout={1000}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    maxWidth: 600,
                    mx: "auto",
                  }}
                >
                  {groups.map((group:any, index) => (
                    <Grow
                      in={true}
                      timeout={800}
                      style={{ transitionDelay: `${200 * index}ms` }}
                      key={group.id}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 3,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: `0 10px 20px ${alpha(
                              vibrantPurple,
                              0.2
                            )}`,
                          },
                          // Subtle glass-like effect
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${alpha("#fff", 0.15)}, ${alpha("#fff", 0.05)})`,
                            zIndex: 0,
                          },
                        }}
                      >
                        <Button
                          fullWidth
                          sx={{
                            py: 2,
                            px: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            bgcolor: "white",
                            color: "text.primary",
                            textTransform: "none",
                            fontSize: "1.2rem",
                            fontWeight: "medium",
                            borderRight: `4px solid ${vibrantPurple}`,
                            "&:hover": {
                              bgcolor: alpha(vibrantPurple, 0.05),
                            },
                            "&:active": {
                              bgcolor: alpha(vibrantPurple, 0.1),
                            },
                            position: "relative",
                            zIndex: 1,
                          }}
                          onClick={() =>
                            navigate("/MyGroup", {
                              state: { groupId: group.id },
                            })
                          }
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              "& svg": {
                                mr: 2,
                                color: vibrantPurple,
                              },
                            }}
                          >
                            <GroupIcon />
                            {group.name}
                          </Box>
                          <ArrowForwardIosIcon
                            sx={{
                              fontSize: "1rem",
                              color: vibrantPurple,
                              transition: "transform 0.3s ease",
                              transform: "rotate(180deg)",
                            }}
                          />
                        </Button>
                      </Paper>
                    </Grow>
                  ))}
                </Box>
              </Fade>
            ) : (
              <Fade in={!isLoading} timeout={1000}>
                <Box
                  sx={{
                    mt: 6,
                    p: 4,
                    borderRadius: 4,
                    border: `2px dashed ${alpha(vibrantBlue, 0.4)}`,
                    bgcolor: alpha(vibrantBlue, 0.05),
                    maxWidth: 500,
                    mx: "auto",
                    animation: `${pulse} 4s infinite ease-in-out`,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${alpha(vibrantBlue, 0.05)}, ${alpha(vibrantPurple, 0.05)})`,
                      zIndex: 0,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: vibrantBlue, 
                      mb: 2, 
                      fontWeight: "medium",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    עדיין אין לך קבוצות
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: "text.secondary",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    לחץ על "הוסף קבוצה" כדי ליצור את הקבוצה הראשונה שלך
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleAddGroupClick}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      mt: 3,
                      borderColor: vibrantBlue,
                      color: vibrantBlue,
                      position: "relative",
                      zIndex: 1,
                      "&:hover": {
                        borderColor: vibrantBlue,
                        bgcolor: alpha(vibrantBlue, 0.1),
                      },
                    }}
                  >
                    צור קבוצה חדשה
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MyGroups;
// MyGroups.tsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import GroupForm from "./GroupForm";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Box,
//   Typography,
//   Container,  
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { keyframes } from "@emotion/react";

// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// // טיפוס לקבוצה
// interface Group {
//   id: number;
//   name: string;
//   [key: string]: any; // אם יש שדות נוספים
// }

// // אנימציות
// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-5px); }
//   100% { transform: translateY(0px); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// const rotate = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const floatSideways = keyframes`
//   0% { transform: translateX(0px); }
//   50% { transform: translateX(10px); }
//   100% { transform: translateX(0px); }
// `;

// const breathe = keyframes`
//   0% { opacity: 0.5; transform: scale(1); }
//   50% { opacity: 0.8; transform: scale(1.1); }
//   100% { opacity: 0.5; transform: scale(1); }
// `;

// const MyGroups: React.FC = () => {
//   const { user } = useAuth(); // נניח שהוא מחזיר אובייקט עם id
//   const [groups, setGroups] = useState<Group[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   // צבעים
//   const vibrantPurple = "#8A2BE2";
//   const vibrantPink = "#FF1493";
//   const vibrantBlue = "#1E90FF";
//   const vibrantMustard = "#E1AD01";
//   const vibrantTeal = "#00CED1";
//   const vibrantCoral = "#FF7F50";

//   useEffect(() => {
//     if (!user) return;

//     setIsLoading(true);
//     axios
//       .get<Group[]>(`https://localhost:7287/api/user/${user.id}/groups`)
//       .then((response) => {
//         setGroups(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching groups", error);
//         setIsLoading(false);
//       });
//   }, [user]);

//   const handleAddGroupClick = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   return (
//     <Container maxWidth="md" sx={{ pt: 8, pb: 4, position: "relative" }}>
//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <Typography variant="h4" gutterBottom>
//           הקבוצות שלי
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<AddCircleOutlineIcon />}
//           onClick={handleAddGroupClick}
//         >
//           הוסף קבוצה
//         </Button>

//         {showForm && <GroupForm onClose={handleCloseForm} />}

//         {isLoading ? (
//           <Box sx={{ mt: 4, textAlign: "center" }}>
//             <CircularProgress />
//           </Box>
//         ) : groups.length > 0 ? (
//           <Box sx={{ mt: 4 }}>
//             {groups.map((group) => (
//               <Paper
//                 key={group.id}
//                 sx={{
//                   mb: 2,
//                   p: 2,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="body1">{group.name}</Typography>
//                 <Button
//                   endIcon={<ArrowForwardIosIcon />}
//                   onClick={() =>
//                     navigate("/MyGroup", {
//                       state: { groupId: group.id },
//                     })
//                   }
//                 >
//                   כנס
//                 </Button>
//               </Paper>
//             ))}
//           </Box>
//         ) : (
//           <Typography sx={{ mt: 4 }}>אין לך קבוצות עדיין</Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default MyGroups;
