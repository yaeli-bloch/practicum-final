import { useState } from "react";
import { Avatar, Box } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
      }}
    >
      <Avatar sx={{ width: 100, height: 100, backgroundColor: 'transparent', zIndex: 2 }}>
        <Box sx={{
          width: '85%',
          height: '85%',
          borderRadius: '35% 65% 65% 35% / 35% 35% 65% 65%',
          background: 'linear-gradient(135deg, #2979FF, #651FFF, #F50057)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: isHovered ? 'pulse 1.5s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
        }}>
          <CelebrationIcon sx={{
            fontSize: 40,
            color: 'white',
            animation: isHovered ? 'spin 2s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
        </Box>
      </Avatar>

      <Box sx={{
        position: 'absolute',
        top: -10, left: -10, right: -10, bottom: -10,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41,121,255,0.4), rgba(101,31,255,0.3), rgba(245,0,87,0.2))',
        filter: 'blur(8px)',
        opacity: isHovered ? 0.8 : 0.4,
        transition: 'all 0.5s ease',
        zIndex: 1,
        animation: 'glow 3s ease-in-out infinite alternate',
        '@keyframes glow': {
          '0%': { opacity: 0.3, transform: 'scale(0.9)' },
          '100%': { opacity: 0.6, transform: 'scale(1.1)' }
        }
      }} />
    </Box>
  );
};

export default AnimatedLogo;
