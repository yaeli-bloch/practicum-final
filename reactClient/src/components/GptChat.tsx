// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Typography,
//   Box,
//   InputAdornment,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// interface ChatEntry {
//   q: string;
//   a: string;
// }

// const GptChat = ({ groupId }: { groupId: number }) => {
//   const [question, setQuestion] = useState("");
//   const [groupContent, setGroupContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chat, setChat] = useState<ChatEntry[]>([]);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchGroupContent = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7287/api/Group/${groupId}/files`
//         );
//         const combinedText = response.data
//           .map((f: any) => `כותרת: ${f.title}\nתוכן: ${f.content}`)
//           .join("\n\n");
//         setGroupContent(combinedText);
//       } catch (error) {
//         console.error("שגיאה בקבלת קבצי הקבוצה", error);
//       }
//     };

//     fetchGroupContent();
//   }, [groupId]);

//   const handleSend = async () => {
//     if (!question.trim()) return;
//     setLoading(true);
//     const currentQuestion = question;
//     setQuestion(""); // clear input

//     try {
//       const response = await axios.post("https://localhost:7287/api/chat", {
//         Prompt: `המידע הבא לקוח מקבצים של קבוצה מס' ${groupId}:\n${groupContent}\nענה אך ורק על סמך מידע זה.`,
//         Question: currentQuestion,
//       });

//       const content = response.data.choices?.[0]?.message?.content;
//       const answerText =
//         content || "אין לי תשובה לשאלה זו על סמך המידע שבקבוצה.";

//       setChat((prev) => [...prev, { q: currentQuestion, a: answerText }]);
//     } catch (error) {
//       console.error(error);
//       setChat((prev) => [
//         ...prev,
//         { q: currentQuestion, a: "שגיאה בשליחת שאלה לשרת." },
//       ]);
//     }

//     setLoading(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         height: "80vh",
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* אזור צ'אט */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//           px: 2,
//           py: 1,
//         }}
//       >
//         {chat.map((entry, index) => (
//           <Paper key={index} sx={{ p: 2, mb: 2 }}>
//             <Typography variant="subtitle2">🧍 שאלה:</Typography>
//             <Typography gutterBottom>{entry.q}</Typography>
//             <Typography variant="subtitle2">🤖 תשובה:</Typography>
//             <Typography>{entry.a}</Typography>
//           </Paper>
//         ))}
//         <div ref={bottomRef} />
//       </Box>

//       {/* שורת אינפוט */}
//       <Box sx={{ p: 2 }}>
//         <TextField
//           fullWidth
//           label="כתוב שאלה ולחץ Enter..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           onKeyPress={handleKeyPress}
//           multiline
//           rows={2}    
//           maxRows={8}  
//           variant="outlined"
//           disabled={loading}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSend} disabled={loading}>
//                   <SendIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           sx={{ height: "auto", minHeight: "160px" }}  
//         />
//       </Box>
//     </Box>
//   );
// };

// export default GptChat;


"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import {
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
  alpha,
  Card,
  } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import MicIcon from "@mui/icons-material/Mic"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { styled } from "@mui/material/styles"
import { keyframes } from "@mui/system"

// אנימציה לאפקט הקלדה
const typing = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`

// אנימציה לאפקט הופעה
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

// סטיילינג מותאם לשדה הטקסט
const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px",
    transition: "all 0.3s ease",
    backgroundColor: alpha("#f5f5f5", 0.8),
    "&:hover": {
      backgroundColor: alpha("#f5f5f5", 1),
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px",
  },
}))

// צבעים יוקרתיים
const luxuryPurple = "#800080" // סגול יוקרתי
const luxuryBlue = "#0047AB" // כחול יוקרתי
const luxuryGold = "#D4AF37" // זהב יוקרתי

interface ChatEntry {
  q: string
  a: string
  timestamp: Date
}

const GptChat = ({ groupId }: { groupId: number }) => {
  const [question, setQuestion] = useState("")
  const [groupContent, setGroupContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState<ChatEntry[]>([])
  const [typingEffect, setTypingEffect] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
 
  

  useEffect(() => {
    const fetchGroupContent = async () => {
      try {
        const response = await axios.get(`https://shareyourjoy-server.onrender.com/api/Group/${groupId}/files`)
        const combinedText = response.data.map((f: any) => `כותרת: ${f.title}\nתוכן: ${f.content}`).join("\n\n")
        setGroupContent(combinedText)

        // הוספת הודעת פתיחה
        setTimeout(() => {
          setChat([
            {
              q: "",
              a: "שלום! אני עוזר חכם שיכול לענות על שאלות בנוגע לתוכן הקבוצה. איך אוכל לעזור לך היום?",
              timestamp: new Date(),
            },
          ])
          setInitialLoading(false)
        }, 1000)
      } catch (error) {
        console.error("שגיאה בקבלת קבצי הקבוצה", error)
        setInitialLoading(false)
      }
    }

    fetchGroupContent()
  }, [groupId])

  const handleSend = async () => {
    if (!question.trim()) return
    setLoading(true)
    const currentQuestion = question
    setQuestion("") // clear input

    // הוספת השאלה לצ'אט מיד
    const newEntry: ChatEntry = {
      q: currentQuestion,
      a: "",
      timestamp: new Date(),
    }
    setChat((prev) => [...prev, newEntry])

    // אפקט הקלדה
    setTimeout(() => {
      setTypingEffect(true)
    }, 500)

    try {
      const response = await axios.post("https://shareyourjoy-server.onrender.com/api/chat", {
        Prompt: `המידע הבא לקוח מקבצים של קבוצה מס' ${groupId}:\n${groupContent}\nענה אך ורק על סמך מידע זה.`,
        Question: currentQuestion,
      })

      const content = response.data.choices?.[0]?.message?.content
      const answerText = content || "אין לי תשובה לשאלה זו על סמך המידע שבקבוצה."

      // הפסקת אפקט ההקלדה
      setTypingEffect(false)

      // עדכון התשובה
      setTimeout(() => {
        setChat((prev) => prev.map((entry, idx) => (idx === prev.length - 1 ? { ...entry, a: answerText } : entry)))
      }, 500)
    } catch (error) {
      console.error(error)
      setTypingEffect(false)
      setChat((prev) =>
        prev.map((entry, idx) => (idx === prev.length - 1 ? { ...entry, a: "שגיאה בשליחת שאלה לשרת." } : entry)),
      )
    }

    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat, typingEffect])

  // פורמט תאריך ושעה
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card
      elevation={5}
      sx={{
        maxWidth: 800,
        width: "100%",
        height: "80vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
        background: `linear-gradient(to bottom, #ffffff, ${alpha(luxuryGold, 0.05)})`,
        position: "relative",
      }}
    >
      {/* כותרת הצ'אט */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${luxuryPurple}, ${luxuryBlue})`,
          padding: { xs: 2, md: 3 },
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alpha("#ffffff", 0.1)}`,
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
            background: `radial-gradient(circle, ${alpha("#fff", 0.2)} 0%, rgba(255,255,255,0) 70%)`,
            zIndex: 0,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <Avatar
            sx={{
              bgcolor: alpha("#ffffff", 0.2),
              mr: 2,
              boxShadow: `0 0 0 2px ${alpha("#ffffff", 0.3)}`,
            }}
          >
            <SmartToyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
              עוזר חכם
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {initialLoading ? "מתחבר..." : "מחובר"}
            </Typography>
          </Box>
        </Box>

        <IconButton sx={{ color: "#ffffff", zIndex: 1 }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* אזור צ'אט */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: { xs: 2, md: 3 },
          py: 2,
          backgroundColor: alpha("#f5f5f5", 0.3),
          backgroundImage: `radial-gradient(${alpha(luxuryPurple, 0.03)} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        {initialLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress size={40} sx={{ color: luxuryPurple }} />
          </Box>
        ) : (
          chat.map((entry, index) => (
            <Box key={index} sx={{ mb: 3, animation: `${fadeIn} 0.3s ease-out` }}>
              {/* הודעת משתמש */}
              {entry.q && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                  <Box sx={{ maxWidth: "80%", display: "flex", alignItems: "flex-end" }}>
                    <Box
                      sx={{
                        backgroundColor: alpha(luxuryBlue, 0.1),
                        p: 2,
                        borderRadius: "18px 18px 0 18px",
                        position: "relative",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        border: `1px solid ${alpha(luxuryBlue, 0.2)}`,
                        mr: 1,
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
                        {entry.q}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right", mt: 1, color: "text.secondary" }}
                      >
                        {formatTime(entry.timestamp)}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: luxuryBlue,
                        boxShadow: `0 0 0 2px ${alpha(luxuryBlue, 0.3)}`,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </Box>
                </Box>
              )}

              {/* הודעת בוט */}
              {(entry.a || index === chat.length - 1) && (
                <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
                  <Box sx={{ maxWidth: "80%", display: "flex", alignItems: "flex-end" }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: luxuryPurple,
                        boxShadow: `0 0 0 2px ${alpha(luxuryPurple, 0.3)}`,
                        mr: 1,
                      }}
                    >
                      <SmartToyIcon />
                    </Avatar>
                    <Box
                      sx={{
                        backgroundColor: "#ffffff",
                        p: 2,
                        borderRadius: "18px 18px 18px 0",
                        position: "relative",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
                      }}
                    >
                      {typingEffect && index === chat.length - 1 && !entry.a ? (
                        <Box sx={{ display: "flex", alignItems: "center", height: "24px" }}>
                          {[0, 1, 2].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: luxuryPurple,
                                mx: 0.5,
                                animation: `${typing} 1s infinite`,
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          ))}
                        </Box>
                      ) : (
                        <>
                          <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
                            {entry.a}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ display: "block", textAlign: "right", mt: 1, color: "text.secondary" }}
                          >
                            {formatTime(entry.timestamp)}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))
        )}
        <div ref={bottomRef} />
      </Box>

      {/* שורת אינפוט */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          pt: 2,
          borderTop: `1px solid ${alpha(luxuryPurple, 0.1)}`,
          backgroundColor: "#ffffff",
        }}
      >
        <StyledTextField
          fullWidth
          placeholder="כתוב שאלה ולחץ Enter..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          rows={2}
          maxRows={4}
          variant="outlined"
          disabled={loading || initialLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ color: alpha(luxuryBlue, 0.6) }}>
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton sx={{ color: alpha(luxuryBlue, 0.6), mr: 1 }}>
                    <MicIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleSend}
                    disabled={loading || initialLoading || !question.trim()}
                    sx={{
                      backgroundColor: luxuryPurple,
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: alpha(luxuryPurple, 0.9),
                      },
                      "&.Mui-disabled": {
                        backgroundColor: alpha(luxuryPurple, 0.3),
                        color: "#ffffff",
                      },
                      width: 40,
                      height: 40,
                    }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(luxuryPurple, 0.2),
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(luxuryPurple, 0.3),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: luxuryPurple,
            },
          }}
        />
      </Box>
    </Card>
  )
}

export default GptChat
