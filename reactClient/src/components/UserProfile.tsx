
// "use client"
// import { useAuth } from '../context/AuthContext';
// import { Avatar, Box, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';

// const UserProfile = () => {
//   const { user } = useAuth();  // מקבלים את ה-user מה-context
//   const [showHello, setShowHello] = useState(true);  // להראות "Hello" בהתחלה

//   useEffect(() => {
//     // אחרי 2 שניות להסתיר את "Hello"
//     const timer = setTimeout(() => {
//       setShowHello(false);
//     }, 2000);

//     // לנקות את ה-timer אם הקומפוננטה מוסרת
//     return () => clearTimeout(timer);
//   }, []);

//   if (!user) {
//     return null;  // אם אין יוזר (למשל אם הוא לא מחובר), לא מציגים כלום
//   }

//   // הפקת האות הראשונה משם המשתמש
//   const firstLetter = user.firstName.charAt(0).toUpperCase();

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 10,
//         left: 10,
//         display: 'flex',
//         alignItems: 'center',
//         padding: '8px 16px',
//         borderRadius: '50%',
//         boxShadow: 'none',
//         backgroundColor: 'transparent',
//         zIndex: 1000,  // לוודא שזה תמיד מעל התוכן
//       }}
//     >
//       {/* עיגול סגול כהה */}
//       <Avatar 
//         sx={{
//           bgcolor: '#8E24AA', // צבע סגול כהה יותר
//           width: 50, 
//           height: 50,
//           fontSize: 22, // גודל טקסט בתוך העיגול
//           border: 'none',  // אין מסגרת סביב העיגול
//         }}
//       >
//         {firstLetter}
//       </Avatar>

//       <Typography 
//         variant="h6" 
//         sx={{
//           marginLeft: 2, 
//           color: '#8E24AA',  // טקסט בצבע סגול כהה
//           fontWeight: 'bold',
//           display: showHello ? 'inline' : 'none',  // להציג רק בזמן שמילים "Hello" מוצגות
//         }}
//       >
//         Hello {user.firstName}
//       </Typography>

//       <Typography 
//         variant="h6" 
//         sx={{
//           marginLeft: 2, 
//           color: '#8E24AA',  // טקסט בצבע סגול כהה
//           fontWeight: 'bold',
//           display: showHello ? 'none' : 'inline',  // להציג את שם המשתמש אחרי 2 שניות
//         }}
//       >
//         {user.firstName}
//       </Typography>
//     </Box>
//   );
// };

// export default UserProfile;
"use client"
import { useAuth } from '../context/AuthContext';
import { Avatar, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { user } = useAuth();  // מקבלים את ה-user מה-context
  const [showHello, setShowHello] = useState(true);  // להראות "Hello" בהתחלה

  useEffect(() => {
    // אחרי 2 שניות להסתיר את "Hello"
    const timer = setTimeout(() => {
      setShowHello(false);
    }, 2000);

    // לנקות את ה-timer אם הקומפוננטה מוסרת
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return null;  // אם אין יוזר (למשל אם הוא לא מחובר), לא מציגים כלום
  }

  // הפקת האות הראשונה משם המשתמש
  const firstLetter = user.firstName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 8,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        borderRadius: '30px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        }
      }}
    >
      {/* עיגול עם גרדיאנט סגול-ורוד */}
      <Avatar 
        sx={{
          background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
          width: 56,
          height: 56,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(156, 39, 176, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 25px rgba(156, 39, 176, 0.5)',
          }
        }}
      >
        {firstLetter}
      </Avatar>

      <Typography 
        variant="h6"
        sx={{
          marginLeft: 3,
          background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 70%, #FF4081 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          textShadow: '0 2px 10px rgba(156, 39, 176, 0.3)',
          display: showHello ? 'inline' : 'none',
          transition: 'all 0.3s ease',
          filter: 'drop-shadow(0 0 8px rgba(233, 30, 99, 0.4))',
        }}
      >
        Hello {user.firstName}
      </Typography>

      <Typography 
        variant="h6"
        sx={{
          marginLeft: 3,
          background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 70%, #FF4081 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          textShadow: '0 2px 10px rgba(156, 39, 176, 0.3)',
          display: showHello ? 'none' : 'inline',
          transition: 'all 0.3s ease',
          filter: 'drop-shadow(0 0 8px rgba(233, 30, 99, 0.4))',
        }}
      >
        {user.firstName}
      </Typography>
    </Box>
  );
};

export default UserProfile;