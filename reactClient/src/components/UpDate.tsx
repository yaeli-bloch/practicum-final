
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { TextField, Button, Container, Typography } from "@mui/material";

// interface Props {
//   userId: number;
//   onClose: () => void;
// }

// const UserProfileUpdate: React.FC<Props> = ({ userId, onClose }) => {
//   const [user, setUser] = useState({
//     Id: userId,
//     LastName: "",
//     FirstName: "",
//     PreviousLastName: "",
//     NumberOfChildren: "",
//     Email: "",
//     Password: "",
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7287/api/user/${userId}`);
//         setUser({
//           Id: response.data.Id,
//           LastName: response.data.LastName || "",
//           FirstName: response.data.FirstName || "",
//           PreviousLastName: response.data.PreviousLastName || "",
//           NumberOfChildren: response.data.NumberOfChildren || "",
//           Email: response.data.Email || "",
//           Password: response.data.Password || "",
//         });
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       console.log("id מהכתובת:", userId);
//      console.log("id בגוף:", user.Id);
//      const updatedUser = {
//       ...user,
//       Id: userId, // כאן אנו מוסיפים את ה-ID במפורש שוב
//     };
//       await axios.put(`https://localhost:7287/api/user/${userId}`, updatedUser);
//       setMessage("הפרטים עודכנו בהצלחה!");
//       // סגירת הקומפוננטה לאחר הצלחה
//       setTimeout(() => {
//         onClose();
//       }, 1000); // נותן זמן להציג את ההודעה רגע לפני סגירה
//     } catch (error) {
//       setMessage("אירעה שגיאה בעדכון");
//       console.error(error);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         עדכון פרטי משתמש
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <TextField label="שם משפחה" name="LastName" value={user.LastName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <TextField label="שם פרטי" name="FirstName" value={user.FirstName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <TextField label="שם משפחה קודם" name="PreviousLastName" value={user.PreviousLastName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <TextField label="מספר ילדים" name="NumberOfChildren" value={user.NumberOfChildren} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <TextField label="אימייל" name="Email" value={user.Email} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <TextField label="סיסמה" name="Password" type="password" value={user.Password} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
//         <Button variant="contained" color="primary" type="submit" fullWidth>
//           עדכן פרטים
//         </Button>
//       </form>

//       {message && (
//         <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
//           {message}
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default UserProfileUpdate;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

interface Props {
  userId: number;
  onClose: () => void;
}

const UserProfileUpdate: React.FC<Props> = ({ userId, onClose }) => {
  const [user, setUser] = useState({
    Id: 0, // נאתחל ל-0 ונעדכן ב-useEffect
    LastName: "",
    FirstName: "",
    PreviousLastName: "",
    NumberOfChildren: "",
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://shareyourjoy-server.onrender.com/api/user/${userId}`);
        setUser({
          Id: response.data.id, // שים לב ש-C# שולח עם אות קטנה id
          LastName: response.data.lastName || "",
          FirstName: response.data.firstName || "",
          PreviousLastName: response.data.previousLastName || "",
          NumberOfChildren: response.data.numberOfChildren || "",
          Email: response.data.email || "",
          Password: response.data.password || "",
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("id מהכתובת:", userId);
      console.log("id בגוף:", user.Id);

      await axios.put(`https://shareyourjoy-server.onrender.com/api/user/${userId}`, user);
      setMessage("הפרטים עודכנו בהצלחה!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setMessage("אירעה שגיאה בעדכון");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        עדכון פרטי משתמש
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="שם משפחה" name="LastName" value={user.LastName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="שם פרטי" name="FirstName" value={user.FirstName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="שם משפחה קודם" name="PreviousLastName" value={user.PreviousLastName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="מספר ילדים" name="NumberOfChildren" value={user.NumberOfChildren} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="אימייל" name="Email" value={user.Email} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="סיסמה" name="Password" type="password" value={user.Password} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          עדכן פרטים
        </Button>
      </form>

      {message && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default UserProfileUpdate;
