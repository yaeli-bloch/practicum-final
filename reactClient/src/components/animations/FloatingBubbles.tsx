import { Box } from "@mui/material";

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 50) + 20,
    left: `${Math.floor(Math.random() * 90)}%`,
    animationDuration: `${Math.floor(Math.random() * 12) + 8}s`,
    animationDelay: `${Math.floor(Math.random() * 5)}s`,
    opacity: Math.random() * 0.2 + 0.05,
    color: [
      '#2979FF', '#FF4081', '#00E5FF', '#00E676',
      '#FFAB00', '#651FFF', '#F50057', '#00B8D4'
    ][Math.floor(Math.random() * 8)]
  }));

  return (
    <Box sx={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {bubbles.map((bubble) => (
        <Box
          key={bubble.id}
          sx={{
            position: 'absolute',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            backgroundColor: bubble.color,
            opacity: bubble.opacity,
            left: bubble.left,
            bottom: '-100px',
            boxShadow: `0 0 15px ${bubble.color}`,
            animation: `float ${bubble.animationDuration} ease-in-out ${bubble.animationDelay} infinite`,
            '@keyframes float': {
              '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
              '10%': { opacity: bubble.opacity },
              '90%': { opacity: bubble.opacity * 0.7 },
              '100%': { transform: 'translateY(-120vh) rotate(360deg)', opacity: 0 }
            }
          }}
        />
      ))}
    </Box>
  );
};

export default FloatingBubbles;
