
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { Button, TextField, LinearProgress, Box, Typography } from "@mui/material";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const Uploader = ({ GroupId, onUploadFinish }: { GroupId: number, onUploadFinish: () => void }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [title, setTitle] = useState("");
//   const [uploadDate, setUploadDate] = useState("");
//   const [content, setContent] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const { user } = useAuth();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setShowForm(true);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !title || !uploadDate) {
//       alert("נא למלא את כל השדות כולל תאריך וכותרת.");
//       return;
//     }

//     try {
//       const response = await axios.get("https://localhost:7287/api/upload/presigned-url", {
//         params: { fileName: file.name },
//       });

//       const presignedUrl = response.data.url;

//       await axios.put(presignedUrl, file, {
//         headers: { "Content-Type": file.type },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
//           setProgress(percent);
//         },
//       });

//       const fileDownloadUrl = presignedUrl.split('?')[0];

//       // פענוח טקסט מהתמונה
//       const ocrResponse = await axios.post("https://localhost:7287/api/files/read-text", null, {
//         params: { imageUrl: fileDownloadUrl },
//       });

//       const extractedText = ocrResponse.data;
//       console.log(extractedText +"---content")
//       setContent(extractedText);

//       // שליחת הנתונים לשרת
//       const fileData = {
//         title,
//         fileUrl: fileDownloadUrl,
//         content: extractedText,
//         userId: user?.id,
//         groupId: GroupId,
//         createdAt: new Date(uploadDate),
//         updatedAt: new Date(),
//       };

//       await axios.post("https://localhost:7287/api/files", fileData);

//       alert("הקובץ הועלה בהצלחה!");
//       setFile(null);
//       setTitle("");
//       setUploadDate("");
//       setContent("");
//       setProgress(0);
//       setShowForm(false);

//       const inputFileElement = document.querySelector('input[type="file"]');
//       if (inputFileElement) {
//         (inputFileElement as HTMLInputElement).value = '';
//       }

//       onUploadFinish();
//     } catch (error) {
//       console.error("שגיאה בהעלאה:", error);
//       alert("הייתה שגיאה בהעלאה. נסה שוב.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         width: "400px",
//         margin: "20px auto",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           padding: "20px",
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           border: "2px dashed #4caf50",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           cursor: "pointer",
//           "&:hover": { backgroundColor: "#f1f1f1" },
//         }}
//         onClick={() => document.getElementById("file-input")?.click()}
//       >
//         <CloudUploadIcon sx={{ fontSize: "40px", color: "#4caf50", mb: 1 }} />
//         <Typography variant="body1" sx={{ color: "#4caf50" }}>
//           לחץ כאן או גרור קובץ כדי להעלות
//         </Typography>
//         <input
//           type="file"
//           id="file-input"
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//         />
//       </Box>

//       {showForm && (
//         <Box sx={{ width: "100%", mt: 2 }}>
//           <TextField
//             fullWidth
//             label="כותרת לקובץ"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             type="date"
//             label="תאריך"
//             InputLabelProps={{ shrink: true }}
//             value={uploadDate}
//             onChange={(e) => setUploadDate(e.target.value)}
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />          
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleUpload}
//           >
//             העלה קובץ
//           </Button>
//         </Box>
//       )}

//       {progress > 0 && (
//         <Box sx={{ width: "100%", mt: 2 }}>
//           <LinearProgress variant="determinate" value={progress} />
//           <Typography variant="caption" display="block" textAlign="center">
//             {progress}%
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Uploader;
"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import {
  Button,
  TextField,
  LinearProgress,
  Box,
  Typography,
  Paper,
  alpha,
  Fade,
  Grow,
  CircularProgress,
  IconButton,
  Tooltip,
  Card,
  CardContent, 
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import TitleIcon from "@mui/icons-material/Title"
import { styled } from "@mui/material/styles"
import { keyframes } from "@mui/system"

// אנימציה לאפקט הזוהר
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

// אנימציה לאפקט הריחוף
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`

// סטיילינג מותאם לשדות הטקסט
const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: luxuryPurple,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
      borderColor: luxuryPurple,
      boxShadow: `0 0 10px ${alpha(luxuryPurple, 0.3)}`,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: luxuryPurple,
  },
  "& .MuiInputBase-input": {
    padding: "16px",
  },
}))

// צבעים יוקרתיים
const luxuryGold = "#D4AF37" // זהב יוקרתי
const luxuryPurple = "#800080" // סגול יוקרתי
const luxuryBlue = "#0047AB" // כחול יוקרתי

const Uploader = ({ GroupId, onUploadFinish }: { GroupId: number; onUploadFinish: () => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState("")
  const [uploadDate, setUploadDate] = useState("")
  const [, setContent] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  //const theme = useTheme()
 // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setShowForm(true)
      setUploadSuccess(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setShowForm(true)
      setUploadSuccess(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setTitle("")
    setUploadDate("")
    setContent("")
    setProgress(0)
    setShowForm(false)
    setUploadSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file || !title || !uploadDate) {
      alert("נא למלא את כל השדות כולל תאריך וכותרת.")
      return
    }

    setIsUploading(true)

    try {
      console.log("type",file.type);
      const response = await axios.get("https://shareyourjoy-server.onrender.com/api/upload/presigned-url", {
        params: { fileName: file.name, fileType : file.type},
      })

      const presignedUrl = response.data.url
      const contentTypeFromServer = response.data.contentType
      console.log(contentTypeFromServer)
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": contentTypeFromServer || "application/octet-stream"},
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      const fileDownloadUrl = presignedUrl.split("?")[0]
      let extractedText=""
     try{
      const ocrResponse = await axios.post("https://shareyourjoy-server.onrender.com/api/files/read-text", null, {
        params: { imageUrl: fileDownloadUrl },
      })

       extractedText = ocrResponse.data
      console.log(extractedText + "---content")
      setContent(extractedText)
     }
     catch{
      extractedText="bla bla"
      console.log("ocr failed");
     }
      // שליחת הנתונים לשרת
      const fileData = {
        title,
        fileUrl: fileDownloadUrl,
        content: extractedText,
        userId: user?.id,
        groupId: GroupId,
        createdAt: new Date(uploadDate),
        updatedAt: new Date(),
      }

      await axios.post("https://shareyourjoy-server.onrender.com/api/files", fileData)

      setUploadSuccess(true)
      setTimeout(() => {
        resetForm()
        onUploadFinish()
      }, 2000)
    } catch (error) {
      console.error("שגיאה בהעלאה:", error)
      alert("הייתה שגיאה בהעלאה. נסה שוב.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card
      elevation={5}
      sx={{
        width: { xs: "100%", sm: "450px" },
        margin: "20px auto",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
        background: `linear-gradient(to bottom, white, ${alpha(luxuryGold, 0.05)})`,
        position: "relative",
      }}
    >
      {/* אלמנטים דקורטיביים */}
      <Box
        sx={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(luxuryGold, 0.2)} 0%, rgba(255,255,255,0) 70%)`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(luxuryPurple, 0.15)} 0%, rgba(255,255,255,0) 70%)`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* כותרת */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${luxuryPurple}, ${luxuryBlue})`,
          padding: { xs: 2, md: 3 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          העלאת קובץ
        </Typography>
      </Box>

      <CardContent sx={{ position: "relative", zIndex: 1, padding: 3 }}>
        {/* אזור גרירת קבצים */}
        {!showForm && (
          <Grow in={!showForm} timeout={800}>
            <Box
              sx={{
                width: "100%",
                padding: "30px 20px",
                backgroundColor: dragActive ? alpha(luxuryPurple, 0.1) : "white",
                borderRadius: "12px",
                border: `2px dashed ${dragActive ? luxuryPurple : alpha(luxuryPurple, 0.3)}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(luxuryPurple, 0.05),
                  borderColor: luxuryPurple,
                  transform: "translateY(-3px)",
                  boxShadow: `0 10px 20px ${alpha(luxuryPurple, 0.1)}`,
                },
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUploadIcon
                sx={{
                  fontSize: "60px",
                  color: luxuryPurple,
                  mb: 2,
                  animation: `${float} 3s infinite ease-in-out`,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: luxuryPurple,
                  fontWeight: "bold",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                לחץ כאן או גרור קובץ
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                ניתן להעלות תמונות, מסמכים וקבצים אחרים
              </Typography>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
            </Box>
          </Grow>
        )}

        {/* טופס פרטי הקובץ */}
        {showForm && (
          <Fade in={showForm} timeout={500}>
            <Box sx={{ width: "100%" }}>
              {/* פרטי הקובץ שנבחר */}
              <Paper
                elevation={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  borderRadius: "12px",
                  marginBottom: 3,
                  backgroundColor: alpha(luxuryBlue, 0.05),
                  border: `1px solid ${alpha(luxuryBlue, 0.2)}`,
                  position: "relative",
                }}
              >
                <InsertDriveFileIcon
                  sx={{
                    fontSize: "40px",
                    color: luxuryBlue,
                    marginLeft: 2,
                  }}
                />
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {file?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file ? (file.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                  </Typography>
                </Box>
                <Tooltip title="בטל בחירה">
                  <IconButton
                    size="small"
                    onClick={resetForm}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: luxuryPurple },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Paper>

              {/* שדות הטופס */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TitleIcon sx={{ color: luxuryPurple, mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    כותרת לקובץ
                  </Typography>
                </Box>
                <StyledTextField
                  fullWidth
                  placeholder="הזן כותרת לקובץ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarTodayIcon sx={{ color: luxuryPurple, mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    תאריך
                  </Typography>
                </Box>
                <StyledTextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>

              {/* כפתור העלאה */}
              <Button
                variant="contained"
                fullWidth
                disabled={isUploading || uploadSuccess}
                onClick={handleUpload}
                sx={{
                  backgroundColor: luxuryGold,
                  color: "white",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: `0 8px 16px ${alpha(luxuryGold, 0.3)}`,
                  "&:hover": {
                    backgroundColor: alpha(luxuryGold, 0.9),
                    boxShadow: `0 12px 20px ${alpha(luxuryGold, 0.4)}`,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": uploadSuccess
                    ? {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, ${alpha(luxuryGold, 0)} 0%, ${alpha(
                          luxuryGold,
                          0.5,
                        )} 50%, ${alpha(luxuryGold, 0)} 100%)`,
                        backgroundSize: "200% 100%",
                        animation: `${shimmer} 2s infinite linear`,
                      }
                    : {},
                }}
                startIcon={
                  isUploading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : uploadSuccess ? (
                    <CheckCircleIcon />
                  ) : (
                    <CloudUploadIcon />
                  )
                }
              >
                {isUploading ? "מעלה..." : uploadSuccess ? "הועלה בהצלחה!" : "העלה קובץ"}
              </Button>
            </Box>
          </Fade>
        )}

        {/* מד התקדמות */}
        {progress > 0 && !uploadSuccess && (
          <Fade in={progress > 0} timeout={500}>
            <Box sx={{ width: "100%", mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: luxuryPurple,
                  }}
                >
                  התקדמות ההעלאה
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: luxuryPurple,
                    mr: "auto",
                  }}
                >
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(luxuryPurple, 0.1),
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: luxuryPurple,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  )
}

export default Uploader
