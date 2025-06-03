import StarIcon from "@mui/icons-material/Star";

const Stars = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            color: 'warning.main',
            fontSize: 20,
            opacity: 0.85,
            animation: `twinkle 1.5s ease-in-out ${index * 0.3}s infinite alternate`,
            '@keyframes twinkle': {
              '0%': { opacity: 0.7, transform: 'scale(0.8)' },
              '100%': { opacity: 1, transform: 'scale(1.1)' }
            }
          }}
        />
      ))}
    </>
  );
};

export default Stars;
