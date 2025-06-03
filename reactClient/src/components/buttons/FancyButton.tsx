import { useState, ReactNode } from "react";
import { Button, Box } from "@mui/material";
import theme from "../theme/theme";

interface FancyButtonProps {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "info" | "success" | "warning";
  icon?: ReactNode;
  onClick?: () => void;
  sx?: any;
}

const FancyButton = ({ children, variant = "contained", color = "primary", icon, onClick, sx = {} }: FancyButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGradient = () => {
    switch (color) {
      case 'primary': return 'linear-gradient(45deg, #2979FF, #651FFF)';
      case 'secondary': return 'linear-gradient(45deg, #FF4081, #F50057)';
      case 'info': return 'linear-gradient(45deg, #00E5FF, #00B8D4)';
      case 'success': return 'linear-gradient(45deg, #00E676, #00C853)';
      case 'warning': return 'linear-gradient(45deg, #FFAB00, #FF6D00)';
      default: return 'linear-gradient(45deg, #2979FF, #651FFF)';
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      startIcon={icon}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: "220px",
        padding: "12px 24px",
        fontSize: "1.1rem",
        fontWeight: 700,
        borderRadius: 10,
        textTransform: "none",
        background: variant === 'contained' ? getGradient() : 'transparent',
        border: variant === 'outlined' ? `2px solid ${theme.palette[color].main}` : 'none',
        boxShadow: isHovered
          ? `0 10px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 255, 255, 0.1)`
          : `0 6px 12px rgba(0, 0, 0, 0.1)`,
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        ...sx
      }}
    >
      {children}
      {isHovered && (
        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.8)',
          boxShadow: '0 0 20px 10px rgba(255,255,255,0.4)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          animation: 'sparkle 0.8s ease-in-out',
          '@keyframes sparkle': {
            '0%': { opacity: 0, width: '5px', height: '5px' },
            '50%': { opacity: 1, width: '15px', height: '15px' },
            '100%': { opacity: 0, width: '5px', height: '5px' }
          }
        }} />
      )}
    </Button>
  );
};

export default FancyButton;
