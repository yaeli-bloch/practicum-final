// import { useState } from "react";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const AddUser = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const groupId = location.state?.groupId; 

//   // פונקציה ליצירת סיסמה אקראית באורך 6 תווים
//   const generateRandomPassword = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let password = '';
//     for (let i = 0; i < 6; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       password += characters[randomIndex];
//     }
//     return password;
//   };

//   const handleAddMember = async () => {
//     try {
//       setError("");

//       // בדיקת אם האימייל קיים
//       const { data } = await axios.get(`https://localhost:7287/api/user/email-exists?email=${email}`);

//       let userId;
//       let password = ""; // הגדרת משתנה הסיסמה מחוץ לתנאי

//       if (data.exists) {
//         // אם קיים, משיגים את ה-id מהשרת
//         const userResponse = await axios.get(`https://localhost:7287/api/user/email/${encodeURIComponent(email)}`);
//         userId = userResponse.data.id;
//       } else {
//         // אם לא קיים, יוצרים סיסמה אקראית
//         password = generateRandomPassword();

//         // אם לא קיים – יוצרים משתמש חדש
//         const registerResponse = await axios.post(`https://localhost:7207/api/auth/register`, {
//           firstName: name,           // מאתרים את שם המשתמש
//           lastName: "---",        // שם משפחה (תוכל לשנות לפי הצורך)
//           previousLastName: "---", // שם משפחה נוסף אם יש לך מידע
//           numberOfChildren: 0,       // כמות ילדים (בהנחה שאין ילדים)
//           email,
//           password,                  // הסיסמה שנוצרה
//         });

//         // אחרי יצירת המשתמש, מקבלים את ה-id
//         const userResponse = await axios.get(`https://localhost:7207/api/user/email/${encodeURIComponent(email)}`);
//         userId = userResponse.data.id;
//       }

//       // הוספת המשתמש לקבוצה
//       await axios.post(`https://localhost:7207/api/group/${groupId}/users/${userId}`);
//       alert("המשתמש נוסף בהצלחה לקבוצה!");

//       // נושא וגוף המייל
//       const subject = "הצטרפת בהצלחה לקבוצה ב-shareyourjoy";
//       const body = `<div style="direction:rtl; color:pink"><h1>שלום ${name}</h1>
//       <h2>ב shareYourJoy  נרשמת בהצלחה לקבוצה! </h2>
//       <h2>${password} הסיסמה שלך להיכנס למערכת היא:</h2>
//       <h3>ברוך הבא !!!</h3>
//       <h3>בברכה צןות המערכת</h3></div>`;

//       // שליחת המייל
//       await fetch("https://localhost:7207/api/mail/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           to: email,    // שולחים את המייל שהוזן
//           subject,
//           body,
//         }),
//       });

//       // ניווט חזרה לעמוד הקודם
//       navigate(-1); 
//     } catch (err: any) {
//       setError(err.response?.data?.message || "שגיאה לא צפויה");
//     }
//   };

//   return (
    
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h5" gutterBottom>הוספת חבר לקבוצה</Typography>
//       <Box display="flex" flexDirection="column" gap={2}>
//         <TextField label="שם מלא" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
//         <TextField label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
//         <Button variant="contained" color="primary" onClick={handleAddMember}>הוסף לקבוצה</Button>
//         {error && <Typography color="error">{error}</Typography>}
//       </Box>
      
//     </Container>
//   );
// };

// export default AddUser;
import { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert,
  Fade,
  alpha,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { keyframes } from "@emotion/react";

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

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
  );
};

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location.state?.groupId;

  // Vibrant colors
  const vibrantGreen = "#00C851";    // Success Green
  const vibrantBlue = "#1E90FF";     // DodgerBlue
  const vibrantPurple = "#8A2BE2";   // BlueViolet
  const vibrantTeal = "#00CED1";     // DarkTurquoise

  // פונקציה ליצירת סיסמה אקראית באורך 6 תווים
  const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const handleAddMember = async () => {
    if (!email.trim() || !name.trim()) {
      setError("אנא מלא את כל השדות");
      return;
    }

    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      // בדיקת אם האימייל קיים
      const { data } = await axios.get(`https://localhost:7287/api/user/email-exists?email=${email}`);

      let userId;
      let password = ""; // הגדרת משתנה הסיסמה מחוץ לתנאי

      if (data.exists) {
        // אם קיים, משיגים את ה-id מהשרת
        const userResponse = await axios.get(`https://localhost:7287/api/user/email/${encodeURIComponent(email)}`);
        userId = userResponse.data.id;
      } else {
        // אם לא קיים, יוצרים סיסמה אקראית
        password = generateRandomPassword();

        // אם לא קיים – יוצרים משתמש חדש
        const registerResponse = await axios.post(`https://localhost:7287/api/auth/register`, {
          firstName: name,           // מאתרים את שם המשתמש
          lastName: "---",        // שם משפחה (תוכל לשנות לפי הצורך)
          previousLastName: "---", // שם משפחה נוסף אם יש לך מידע
          numberOfChildren: 0,       // כמות ילדים (בהנחה שאין ילדים)
          email,
          password,                  // הסיסמה שנוצרה
        });

        // אחרי יצירת המשתמש, מקבלים את ה-id
        const userResponse = await axios.get(`https://localhost:7287/api/user/email/${encodeURIComponent(email)}`);
        userId = userResponse.data.id;
      }

      // הוספת המשתמש לקבוצה
      await axios.post(`https://localhost:7287/api/group/${groupId}/users/${userId}`);
      
      setIsSuccess(true);

      // נושא וגוף המייל
      const subject = "הצטרפת בהצלחה לקבוצה ב-shareyourjoy";
      const body = `<div style="direction:rtl; color:pink"><h1>שלום ${name}</h1>
      <h2>ב shareYourJoy  נרשמת בהצלחה לקבוצה! </h2>
      <h2>${password} הסיסמה שלך להיכנס למערכת היא:</h2>
      <h3>ברוך הבא !!!</h3>
      <h3>בברכה צוות המערכת</h3></div>`;

      // שליחת המייל
      await fetch("https://localhost:7287/api/mail/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,    // שולחים את המייל שהוזן
          subject,
          body,
        }),
      });

      // ניווט חזרה לעמוד הקודם אחרי 2 שניות
      setTimeout(() => {
        navigate(-1); 
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה לא צפויה");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

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
      <DecorativeCircle size="300px" color={vibrantGreen} top="-5%" right="-5%" delay={0} left={undefined} bottom={undefined} />
      <DecorativeCircle size="250px" color={vibrantBlue} bottom="-10%" left="-10%" delay={500} top={undefined} right={undefined} />
      <DecorativeCircle size="200px" color={vibrantPurple} top="60%" right="-5%" delay={1000} left={undefined} bottom={undefined} />
      <DecorativeCircle size="180px" color={vibrantTeal} top="20%" left="-5%" delay={1500} right={undefined} bottom={undefined} />

      <Container maxWidth="sm">
        {/* Back button */}
        <Box sx={{ mb: 4, textAlign: "start" }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate(-1)}
            sx={{ 
              mb: 2,
              color: vibrantPurple,
              fontWeight: "bold",
              "&:hover": {
                bgcolor: alpha(vibrantPurple, 0.1),
                transform: "translateX(-5px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            חזרה לקבוצה
          </Button>
        </Box>

        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 6, position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${vibrantGreen}, ${vibrantBlue})`,
                backgroundSize: "200% auto",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${shimmer} 3s linear infinite`,
                textShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
              }}
            >
              הוספת חבר לקבוצה
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 500, 
                mx: "auto",
                color: "#666",
                fontWeight: 500,
              }}
            >
              הכנס את פרטי החבר החדש שברצונך להוסיף לקבוצה
            </Typography>
          </Box>
        </Fade>

        <Fade in={true} timeout={1200}>
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
                          0 0 30px ${alpha(vibrantGreen, 0.2)} inset`,
              border: "1px solid rgba(255, 255, 255, 0.5)",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: `linear-gradient(90deg, ${vibrantGreen}, ${vibrantBlue}, ${vibrantTeal})`,
                backgroundSize: "300% 100%",
                animation: `${shimmer} 3s linear infinite`,
              }
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField 
                label="שם מלא" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                fullWidth
                required
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      boxShadow: `0 0 0 3px ${alpha(vibrantGreen, 0.2)}`,
                    }
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    "&.Mui-focused": {
                      color: vibrantGreen,
                    }
                  }
                }}
              />
              
              <TextField 
                label="כתובת מייל" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                fullWidth
                required
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      boxShadow: `0 0 0 3px ${alpha(vibrantBlue, 0.2)}`,
                    }
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    "&.Mui-focused": {
                      color: vibrantBlue,
                    }
                  }
                }}
              />
              
              <Button 
                variant="contained" 
                size="large"
                onClick={handleAddMember}
                disabled={isLoading || !email.trim() || !name.trim()}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                sx={{
                  py: 2,
                  bgcolor: vibrantGreen,
                  color: "white",
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  boxShadow: `0 8px 20px ${alpha(vibrantGreen, 0.4)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: alpha(vibrantGreen, 0.9),
                    boxShadow: `0 12px 25px ${alpha(vibrantGreen, 0.5)}`,
                    transform: "translateY(-3px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                  "&:disabled": {
                    bgcolor: alpha(vibrantGreen, 0.3),
                    boxShadow: "none",
                    transform: "none",
                  }
                }}
              >
                {isLoading ? 'מוסיף...' : 'הוסף לקבוצה'}
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Success Message */}
        {isSuccess && (
          <Fade in={true} timeout={500}>
            <Alert 
              severity="success"
              sx={{
                maxWidth: 500,
                mx: "auto",
                mb: 3,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: "bold",
                boxShadow: `0 8px 20px ${alpha(vibrantGreen, 0.3)}`,
                border: `2px solid ${vibrantGreen}`,
                backgroundColor: alpha(vibrantGreen, 0.1),
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
                position: "relative",
                zIndex: 1,
              }}
            >
              המשתמש נוסף בהצלחה לקבוצה! מייל עם פרטי ההתחברות נשלח אליו.
            </Alert>
          </Fade>
        )}

        {/* Error Message */}
        {error && (
          <Fade in={true} timeout={500}>
            <Alert 
              severity="error"
              sx={{
                maxWidth: 500,
                mx: "auto",
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: "bold",
                boxShadow: `0 8px 20px ${alpha('#f44336', 0.3)}`,
                border: `2px solid #f44336`,
                backgroundColor: alpha('#f44336', 0.1),
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
                position: "relative",
                zIndex: 1,
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}
      </Container>

      {/* Bottom gradient */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "150px",
          background: `linear-gradient(to top, ${alpha(vibrantGreen, 0.2)} 0%, rgba(255,255,255,0) 100%)`,
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default AddUser;