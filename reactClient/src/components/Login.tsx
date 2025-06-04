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
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { keyframes } from '@emotion/react';


const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuth();


  const vibrantPurple = "#8A2BE2"; 
  const vibrantBlue = "#1E90FF";  
  const vibrantMustard = "#E1AD01";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsLoading(true);
    setErrorMessage('');

    try {
         const response = await axios.post('https://shareyourjoy-server.onrender.com/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",  
        },
      });

     
      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Login failed");
      }

      
      localStorage.setItem('authToken', token);
      setUser(user);
      setToken(token);

      
      onLoginSuccess();
      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        setErrorMessage(error.response ? error.response.data.Message : 'שגיאה לא צפויה');
      } else if (error instanceof Error) {
       
        setErrorMessage(error.message || 'שגיאה לא צפויה');
      } else {

        setErrorMessage('שגיאה לא צפויה');
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
          top: '-15px',
          right: '-15px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(vibrantMustard, 0.8)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: 'blur(15px)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(vibrantBlue, 0.8)} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.6,
          filter: 'blur(20px)',
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
                background: `linear-gradient(45deg, ${vibrantBlue}, ${vibrantPurple}, ${vibrantMustard})`,
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
              התחברות
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
              ברוך שובך! אנא הזן את פרטי ההתחברות שלך
            </Typography>
          </Box>
        </Grow>

        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
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

            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
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

            <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    py: 1.5,
                    bgcolor: vibrantMustard,
                    color: 'white',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: `0 8px 20px ${alpha(vibrantMustard, 0.4)}`,
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      bgcolor: alpha(vibrantMustard, 0.9),
                      boxShadow: `0 12px 25px ${alpha(vibrantMustard, 0.5)}`,
                      transform: 'translateY(-3px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    letterSpacing: '0.05em',
                  }}
                >
                  {isLoading ? 'מתחבר...' : 'התחבר'}
                </Button>
              </Box>
            </Fade>

            {errorMessage && (
              <Grow in={!!errorMessage} timeout={500}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha('#ff0000', 0.1),
                    border: `1px solid ${alpha('#ff0000', 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <ErrorOutlineIcon color="error" />
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                </Box>
              </Grow>
            )}

            <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
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
                  שכחת את הסיסמה? <a href="#">לחץ כאן</a>
                </Typography>
              </Box>
            </Fade>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;