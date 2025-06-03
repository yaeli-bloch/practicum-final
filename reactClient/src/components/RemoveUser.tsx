// import { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Container, TextField, Typography } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';

// const RemoveUser = () => {
//     const [mail, setMail] = useState('');
//     const [message, setMessage] = useState('');
//     const location = useLocation();
//     const navigate = useNavigate();
//     const groupId = location.state?.groupId;

//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         try {
//             await axios.delete(`https://localhost:7287/api/group/${groupId}/users/${mail}`);
//             setMessage('המשתמש הוסר בהצלחה.');
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 setMessage(error.response?.data?.message || 'אירעה שגיאה בבקשה.');
//             } else {
//                 setMessage('שגיאה לא צפויה.');
//             }
//         }

//         // מחכה 2 שניות ואז חוזר אוטומטית ל־GroupPage
//         setTimeout(() => {
//             navigate(-1); // חוזר לעמוד הקודם ב־history (שזה GroupPage)
//         }, 2000);
//     };

//     return (
//         <Container maxWidth="sm" sx={{ mt: 5 }}>
//             <Typography variant="h5" gutterBottom>הסרת חבר לקבוצה</Typography>
//             <Box display="flex" flexDirection="column" gap={2}>
//                 <TextField label="מייל" value={mail} onChange={(e) => setMail(e.target.value)} fullWidth />
//                 <Button variant="contained" color="primary" onClick={handleSubmit}>הסר מהקבוצה</Button>
//                 {message && <Typography color="error">{message}</Typography>}
//             </Box>
//         </Container>
//     );
// };

// export default RemoveUser;



import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  Fade,
  alpha,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { keyframes } from '@emotion/react';

// ===== אנימציות =====
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// ===== קומפוננטת עיגול דקורטיבי =====
interface DecorativeCircleProps {
  size: string;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
}

const DecorativeCircle: React.FC<DecorativeCircleProps> = ({
  size,
  color,
  top,
  left,
  right,
  bottom,
  delay,
}) => (
  <Box
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, rgba(106, 226, 36, 0) 70%)`,
      opacity: 0.6,
      top,
      left,
      right,
      bottom,
      animation: `${float} ${4 + delay / 1000}s infinite ease-in-out`,
      animationDelay: `${delay}ms`,
      zIndex: 0,
      filter: 'blur(20px)',
    }}
  />
);

// ===== קומפוננטת RemoveUser =====
const RemoveUser: React.FC = () => {
  const [mail, setMail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const groupId: string | undefined = location.state?.groupId;

  const vibrantRed = '#FF6B6B';
  const vibrantOrange = '#FF8C00';
  const vibrantPurple = '#8A2BE2';
  const vibrantPink = '#FF1493';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mail.trim()) {
      setMessage('אנא הכנס כתובת מייל');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await axios.delete(`https://localhost:7287/api/group/${groupId}/users/${mail}`);
      setMessage('המשתמש הוסר בהצלחה.');
      setIsSuccess(true);

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'אירעה שגיאה בבקשה.');
      } else {
        setMessage('שגיאה לא צפויה.');
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, #f0f4ff 0%, #f9f0ff 100%)`,
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
        pb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* עיגולים דקורטיביים */}
      <DecorativeCircle size="300px" color={vibrantRed} top="-5%" right="-5%" delay={0} />
      <DecorativeCircle size="250px" color={vibrantOrange} bottom="-10%" left="-10%" delay={500} />
      <DecorativeCircle size="200px" color={vibrantPurple} top="60%" right="-5%" delay={1000} />
      <DecorativeCircle size="180px" color={vibrantPink} top="20%" left="-5%" delay={1500} />

      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'start' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              color: vibrantPurple,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: alpha(vibrantPurple, 0.1),
                transform: 'translateX(-5px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            חזרה לקבוצה
          </Button>
        </Box>

        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${vibrantRed}, ${vibrantOrange})`,
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${shimmer} 3s linear infinite`,
                textShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
              }}
            >
              הסרת חבר מהקבוצה
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 500,
                mx: 'auto',
                color: '#666',
                fontWeight: 500,
              }}
            >
              הכנס את כתובת המייל של החבר שברצונך להסיר מהקבוצה
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
              mx: 'auto',
              mb: 6,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15),
                          0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                          0 0 30px ${alpha(vibrantRed, 0.2)} inset`,
              border: '1px solid rgba(255, 255, 255, 0.5)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: `linear-gradient(90deg, ${vibrantRed}, ${vibrantOrange})`,
                backgroundSize: '300% 100%',
                animation: `${shimmer} 3s linear infinite`,
              },
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="כתובת מייל"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                fullWidth
                required
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      boxShadow: `0 0 0 3px ${alpha(vibrantRed, 0.2)}`,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                    '&.Mui-focused': {
                      color: vibrantRed,
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={isLoading || !mail.trim()}
                startIcon={<PersonRemoveIcon />}
                sx={{
                  py: 2,
                  bgcolor: vibrantRed,
                  color: 'white',
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: `0 8px 20px ${alpha(vibrantRed, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(vibrantRed, 0.9),
                    boxShadow: `0 12px 25px ${alpha(vibrantRed, 0.5)}`,
                    transform: 'translateY(-3px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&:disabled': {
                    bgcolor: alpha(vibrantRed, 0.3),
                    boxShadow: 'none',
                    transform: 'none',
                  },
                }}
              >
                {isLoading ? 'מסיר...' : 'הסר מהקבוצה'}
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* הודעת הצלחה/שגיאה */}
        {message && (
          <Fade in={true} timeout={500}>
            <Alert
              severity={isSuccess ? 'success' : 'error'}
              sx={{
                maxWidth: 500,
                mx: 'auto',
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: `0 8px 20px ${alpha(isSuccess ? '#4caf50' : vibrantRed, 0.3)}`,
                border: `2px solid ${isSuccess ? '#4caf50' : vibrantRed}`,
                backgroundColor: isSuccess ? alpha('#4caf50', 0.1) : alpha(vibrantRed, 0.1),
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
                position: 'relative',
                zIndex: 1,
              }}
            >
              {message}
            </Alert>
          </Fade>
        )}
      </Container>

      {/* דקורציה בתחתית העמוד */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: `linear-gradient(to top, ${alpha(vibrantRed, 0.2)} 0%, rgba(255,255,255,0) 100%)`,
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default RemoveUser;
