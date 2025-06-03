// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useAuth } from '../context/AuthContext';
// const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [previousLastName, setPreviousLastName] = useState('');
//   const [numberOfChildren, setNumberOfChildren] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const { setUser, setToken } = useAuth(); 
//   // פונקציה לשליחה של הבקשה לשרת
//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const user = {
//       firstName,
//       lastName,
//       previousLastName,
//       numberOfChildren,
//       email,
//       password,
//     };
//     try {
//       // קריאת POST ל-API עם הנתונים שנשלחים מהמשתמש
//       const response = await axios.post('https://localhost:7287/api/auth/register', user);

//       if (response.data.token) {
//         if (response.data.token) {
//             const registeredUser = { 
//               ...user, 
//               id: response.data.id,  // הוספת ה-id שהתקבל מהשרת
//             };
//         localStorage.setItem('authToken', response.data.token);       
//         setUser(registeredUser);
//         setToken(response.data.token);
     
//       }
//       // אם נרשם בהצלחה
//       setSuccessMessage('User registered successfully!');
//       setError('');
//       // קריאה ל-onRegisterSuccess כדי להודיע לקומפוננטה האב שהרישום עבר בהצלחה
//       onRegisterSuccess();
//     }
// }
//      catch (err: unknown) {
//       // בדיקה אם err הוא מסוג AxiosError
//       if (err instanceof AxiosError) {
//         // אם השגיאה היא מסוג AxiosError, נוכל לגשת ל-response ול-data
//         setError('Registration failed: ' + err.response?.data?.message);
//       } else {
//         // אם השגיאה אינה מסוג AxiosError, מציגים שגיאה כללית
//         setError('Registration failed: Unknown error');
//       }
//     }
//   }

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Previous Last Name:</label>
//           <input
//             type="text"
//             value={previousLastName}
//             onChange={(e) => setPreviousLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Number of Children:</label>
//           <input
//             type="number"
//             value={numberOfChildren}
//             onChange={(e) => setNumberOfChildren(Number(e.target.value))}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
//     </div>
//   );
// };
// export default Register;
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  alpha,
  CircularProgress,
  Fade,
  Grow,
  Grid,
  Divider,
  Alert,
  AlertTitle,
  Slide,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BadgeIcon from '@mui/icons-material/Badge';
import HistoryIcon from '@mui/icons-material/History';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { keyframes } from '@emotion/react';

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

const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [previousLastName, setPreviousLastName] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuth();

  // Vibrant colors
  const vibrantPurple = "#8A2BE2"; // BlueViolet
  const vibrantPink = "#FF1493";   // DeepPink
  const vibrantBlue = "#1E90FF";   // DodgerBlue
  const vibrantMustard = "#E1AD01"; // Mustard
  const vibrantGreen = "#00C853";   // Green

  // פונקציה לשליחה של הבקשה לשרת
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const user = {
      firstName,
      lastName,
      previousLastName,
      numberOfChildren,
      email,
      password,
    };

    try {
      // קריאת POST ל-API עם הנתונים שנשלחים מהמשתמש
      const response = await axios.post('https://localhost:7287/api/auth/register', user);

      if (response.data.token) {
        const registeredUser = {
          ...user,
          id: response.data.id,  // הוספת ה-id שהתקבל מהשרת
        };
        localStorage.setItem('authToken', response.data.token);
        setUser(registeredUser);
        setToken(response.data.token);

        // אם נרשם בהצלחה
        setSuccessMessage('ההרשמה הושלמה בהצלחה!');
        setError('');
        
        // קריאה ל-onRegisterSuccess כדי להודיע לקומפוננטה האב שהרישום עבר בהצלחה
        setTimeout(() => {
          onRegisterSuccess();
        }, 1500); // מחכים 1.5 שניות כדי שהמשתמש יראה את הודעת ההצלחה
      }
    } catch (err: unknown) {
      // בדיקה אם err הוא מסוג AxiosError
      if (err instanceof AxiosError) {
        // אם השגיאה היא מסוג AxiosError, נוכל לגשת ל-response ול-data
        setError('ההרשמה נכשלה: ' + (err.response?.data?.message || 'שגיאה לא ידועה'));
      } else {
        // אם השגיאה אינה מסוג AxiosError, מציגים שגיאה כללית
        setError('ההרשמה נכשלה: שגיאה לא ידועה');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(vibrantPink, 0.8)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(vibrantMustard, 0.8)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: 'blur(25px)',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Grow in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 1,
                background: `linear-gradient(45deg, ${vibrantPink}, ${vibrantPurple}, ${vibrantMustard})`,
                backgroundSize: '300% auto',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${shimmer} 10s linear infinite`,
                letterSpacing: '0.05em',
                display: 'inline-block',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  background: vibrantMustard,
                  borderRadius: '2px',
                }
              }}
            >
              הרשמה
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 2,
                fontStyle: 'italic',
                animation: `${float} 6s infinite ease-in-out`,
              }}
            >
              הצטרף אלינו ותוכל ליהנות מכל השירותים שלנו
            </Typography>
          </Box>
        </Grow>

        <form onSubmit={handleRegister}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="שם פרטי"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: vibrantPink }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.5s ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: vibrantPink,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: vibrantPink,
                          boxShadow: `0 0 10px ${alpha(vibrantPink, 0.3)}`,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: vibrantPink,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="שם משפחה"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon sx={{ color: vibrantPurple }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.5s ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: vibrantPurple,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: vibrantPurple,
                          boxShadow: `0 0 10px ${alpha(vibrantPurple, 0.3)}`,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: vibrantPurple,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="שם משפחה קודם"
                    type="text"
                    value={previousLastName}
                    onChange={(e) => setPreviousLastName(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HistoryIcon sx={{ color: vibrantBlue }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.5s ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: vibrantBlue,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: vibrantBlue,
                          boxShadow: `0 0 10px ${alpha(vibrantBlue, 0.3)}`,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: vibrantBlue,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="מספר ילדים"
                    type="number"
                    value={numberOfChildren}
                    onChange={(e) => setNumberOfChildren(Number(e.target.value))}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ChildCareIcon sx={{ color: vibrantMustard }} />
                        </InputAdornment>
                      ),
                      inputProps: { min: 0 }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.5s ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: vibrantMustard,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: vibrantMustard,
                          boxShadow: `0 0 10px ${alpha(vibrantMustard, 0.3)}`,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: vibrantMustard,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Fade>

            <Divider sx={{ 
              my: 1, 
              '&::before, &::after': { 
                borderColor: alpha(vibrantMustard, 0.3) 
              } 
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  px: 1,
                  fontStyle: 'italic'
                }}
              >
                פרטי התחברות
              </Typography>
            </Divider>

            <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
              <TextField
                fullWidth
                label="אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: vibrantBlue }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.5s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: vibrantBlue,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                      borderColor: vibrantBlue,
                      boxShadow: `0 0 10px ${alpha(vibrantBlue, 0.3)}`,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: vibrantBlue,
                  },
                }}
              />
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
              <TextField
                fullWidth
                label="סיסמא"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: vibrantPurple }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.5s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: vibrantPurple,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                      borderColor: vibrantPurple,
                      boxShadow: `0 0 10px ${alpha(vibrantPurple, 0.3)}`,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: vibrantPurple,
                  },
                }}
              />
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <HowToRegIcon />}
                  sx={{
                    py: 1.5,
                    bgcolor: vibrantPink,
                    color: 'white',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: `0 8px 20px ${alpha(vibrantPink, 0.4)}`,
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      bgcolor: alpha(vibrantPink, 0.9),
                      boxShadow: `0 12px 25px ${alpha(vibrantPink, 0.5)}`,
                      transform: 'translateY(-3px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    letterSpacing: '0.05em',
                  }}
                >
                  {isLoading ? 'מבצע רישום...' : 'הירשם'}
                </Button>
              </Box>
            </Fade>

            {error && (
              <Slide direction="up" in={!!error} mountOnEnter unmountOnExit>
                <Alert 
                  severity="error"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    borderColor: alpha('#ff0000', 0.5),
                    background: alpha('#ff0000', 0.05),
                  }}
                >
                  <AlertTitle>שגיאה</AlertTitle>
                  {error}
                </Alert>
              </Slide>
            )}

            {successMessage && (
              <Slide direction="up" in={!!successMessage} mountOnEnter unmountOnExit>
                <Alert 
                  severity="success"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    borderColor: alpha(vibrantGreen, 0.5),
                    background: alpha(vibrantGreen, 0.05),
                  }}
                >
                  <AlertTitle>הצלחה</AlertTitle>
                  {successMessage}
                </Alert>
              </Slide>
            )}

            <Fade in={true} timeout={1000} style={{ transitionDelay: '1200ms' }}>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    '& a': {
                      color: vibrantBlue,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: vibrantPurple,
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  כבר יש לך חשבון? <a href="#">התחבר כאן</a>
                </Typography>
              </Box>
            </Fade>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;