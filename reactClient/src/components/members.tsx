"use client"
import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Box,
  Avatar,
  Paper,
  alpha,
  IconButton,
  Grid,
  Tooltip,
  Zoom,
} from "@mui/material"
import { useLocation} from "react-router-dom"
import EmailIcon from "@mui/icons-material/Email"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import SubjectIcon from "@mui/icons-material/Subject"
import MessageIcon from "@mui/icons-material/Message"
import SendIcon from "@mui/icons-material/Send"
import GroupIcon from "@mui/icons-material/Group"
import SearchIcon from "@mui/icons-material/Search"
import { styled } from "@mui/material/styles"
import { keyframes } from "@mui/system"



// אנימציה לאפקט הריחוף
const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
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
const luxuryRed = "#B22222" // אדום יוקרתי
const luxuryGreen = "#006400" // ירוק יוקרתי
const luxuryTeal = "#008080" // טורקיז יוקרתי

interface User {
  id: number
  name: string
  email: string
}

const MembersOfGroup = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const location = useLocation()
  const groupId = location.state?.groupId 
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://localhost:7287/api/User/byGroup/${groupId}`)
        const rawData = await response.json()

        const formattedData = rawData.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }))

        setUsers(formattedData)
      } catch (error) {
        console.error("Error fetching users:", error)
        setSnackbar({
          open: true,
          message: "שגיאה בטעינת המשתמשים",
          severity: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (groupId) fetchUsers()
  }, [groupId])

  const handleSendEmail = async () => {
    if (!selectedUser) return
    setIsSending(true)
    try {
      await fetch("https://localhost:7287/api/mail/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedUser.email,
          subject,
          body,
        }),
      })

      setSnackbar({ open: true, message: "המייל נשלח בהצלחה!", severity: "success" })
      setSelectedUser(null)
      setSubject("")
      setBody("")
    } catch (err) {
      console.error("Email send failed", err)
      setSnackbar({ open: true, message: "שליחת המייל נכשלה", severity: "error" })
    } finally {
      setIsSending(false)
    }
  }

  // פונקציה ליצירת צבע אקראי עבור האווטאר
  const getAvatarColor = (userId: number) => {
    const colors = [luxuryPurple, luxuryBlue, luxuryRed, luxuryGreen, luxuryTeal, luxuryGold]
    return colors[userId % colors.length]
  }

  // פונקציה ליצירת האות הראשונה מהשם
  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  // סינון משתמשים לפי חיפוש
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card
      elevation={5}
      sx={{
        maxWidth: 1200,
        width: "100%",
        margin: "auto",
        mt: 4,
        mb: 4,
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
        background: `linear-gradient(to bottom, #ffffff, ${alpha(luxuryGold, 0.05)})`,
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
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GroupIcon sx={{ fontSize: 28, mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              חברים בקבוצה
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: { xs: "100%", sm: "auto" } }}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: alpha("#ffffff", 0.15),
                borderRadius: "12px",
                padding: "4px 12px",
                width: "100%",
              }}
            >
              <SearchIcon sx={{ color: "#ffffff", mr: 1 }} />
              <TextField
                placeholder="חיפוש חברים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: "#ffffff",
                    "&::placeholder": {
                      color: alpha("#ffffff", 0.8),
                    },
                  },
                }}
              />
              
            </Paper>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ position: "relative", zIndex: 1, p: 3 }}>
        {isLoading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography>טוען משתמשים...</Typography>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            {searchTerm ? (
              <Typography>לא נמצאו משתמשים התואמים לחיפוש</Typography>
            ) : (
              <Typography>אין משתמשים בקבוצה זו</Typography>
            )}
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredUsers.map((user, index) => (
              <Grid item xs={6} sm={4} md={3} key={user.id}>
                <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "100%", // יוצר ריבוע מושלם
                      "&:hover .member-card-overlay": {
                        opacity: 1,
                      },
                      "&:hover .member-card": {
                        transform: "scale(1.05) rotate(2deg)",
                        boxShadow: `0 15px 30px ${alpha(getAvatarColor(user.id), 0.3)}`,
                      },
                    }}
                  >
                    {/* כרטיסיית חבר */}
                    <Card
                      className="member-card"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "16px",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        boxShadow: `0 8px 20px ${alpha(getAvatarColor(user.id), 0.2)}`,
                        border: `1px solid ${alpha(getAvatarColor(user.id), 0.3)}`,
                        background: `radial-gradient(circle at 70% 30%, #ffffff 0%, ${alpha(
                          getAvatarColor(user.id),
                          0.08,
                        )} 100%)`,
                      }}
                    >
                      {/* אווטאר */}
                      <Avatar
                        sx={{
                          width: "40%",
                          height: "40%",
                          bgcolor: getAvatarColor(user.id),
                          color: "#ffffff",
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          boxShadow: `0 8px 16px ${alpha(getAvatarColor(user.id), 0.4)}`,
                          border: `4px solid #ffffff`,
                          mb: 2,
                          animation: `${float} 6s infinite ease-in-out`,
                        }}
                      >
                        {getFirstLetter(user.name)}
                      </Avatar>

                      {/* שם המשתמש */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: getAvatarColor(user.id),
                          px: 2,
                        }}
                      >
                        {user.name}
                      </Typography>

                      {/* אימייל */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                          px: 2,
                          mt: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Card>

                    {/* שכבת אוברליי עם כפתור שליחת מייל */}
                    <Box
                      className="member-card-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: alpha(getAvatarColor(user.id), 0.85),
                        borderRadius: "16px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <Tooltip title="שלח מייל">
                        <IconButton
                          onClick={() => setSelectedUser(user)}
                          sx={{
                            backgroundColor: "#ffffff",
                            color: getAvatarColor(user.id),
                            width: "60px",
                            height: "60px",
                            "&:hover": {
                              backgroundColor: alpha("#ffffff", 0.9),
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <EmailIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 3,
          borderTop: `1px solid ${alpha(luxuryPurple, 0.1)}`,
          backgroundColor: alpha(luxuryPurple, 0.02),
        }}
      >
        {/* <Button
          onClick={() => navigate("/MyGroup", { state: { groupId } })}
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            backgroundColor: luxuryGold,
            color: "#ffffff",
            borderRadius: "12px",
            padding: "12px 24px",
            "&:hover": {
              backgroundColor: alpha(luxuryGold, 0.9),
              boxShadow: `0 8px 16px ${alpha(luxuryGold, 0.3)}`,
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
            boxShadow: `0 4px 12px ${alpha(luxuryGold, 0.3)}`,
          }}
        >
          חזרה לעמוד הקבוצה
        </Button> */}
      </Box>

      {/* דיאלוג שליחת מייל */}
      <Dialog
        open={!!selectedUser}
        onClose={() => !isSending && setSelectedUser(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: selectedUser
              ? `linear-gradient(135deg, ${getAvatarColor(selectedUser.id)}, ${alpha(getAvatarColor(selectedUser.id), 0.7)})`
              : `linear-gradient(135deg, ${luxuryPurple}, ${luxuryBlue})`,
            color: "#ffffff",
            fontWeight: "bold",
            padding: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon sx={{ mr: 1 }} />
            שלח מייל ל-{selectedUser?.name}
          </Box>
          {!isSending && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setSelectedUser(null)}
              aria-label="close"
              sx={{ color: "#ffffff" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>

        <DialogContent sx={{ padding: 3, pt: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: "12px",
              backgroundColor: alpha(luxuryBlue, 0.05),
              border: `1px solid ${alpha(luxuryBlue, 0.2)}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <PersonIcon sx={{ color: luxuryBlue, mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              אל: {selectedUser?.email}
            </Typography>
          </Paper>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <SubjectIcon sx={{ color: luxuryPurple, mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                נושא
              </Typography>
            </Box>
            <StyledTextField
              fullWidth
              placeholder="הזן נושא למייל"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="outlined"
              disabled={isSending}
              InputProps={{
                sx: {
                  backgroundColor: "#ffffff",
                },
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <MessageIcon sx={{ color: luxuryPurple, mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                תוכן המייל
              </Typography>
            </Box>
            <StyledTextField
              fullWidth
              multiline
              rows={6}
              placeholder="הזן את תוכן המייל כאן..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              variant="outlined"
              disabled={isSending}
              InputProps={{
                sx: {
                  backgroundColor: "#ffffff",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            padding: 3,
            borderTop: `1px solid ${alpha(luxuryPurple, 0.1)}`,
            backgroundColor: alpha(luxuryPurple, 0.02),
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setSelectedUser(null)}
            variant="outlined"
            disabled={isSending}
            sx={{
              borderColor: alpha(luxuryPurple, 0.5),
              color: luxuryPurple,
              borderRadius: "8px",
              "&:hover": {
                borderColor: luxuryPurple,
                backgroundColor: alpha(luxuryPurple, 0.05),
              },
            }}
          >
            ביטול
          </Button>
          <Button
            variant="contained"
            onClick={handleSendEmail}
            disabled={!subject || !body || isSending}
            startIcon={<SendIcon />}
            sx={{
              backgroundColor: selectedUser ? getAvatarColor(selectedUser.id) : luxuryGold,
              color: "#ffffff",
              borderRadius: "8px",
              padding: "10px 24px",
              "&:hover": {
                backgroundColor: selectedUser ? alpha(getAvatarColor(selectedUser.id), 0.9) : alpha(luxuryGold, 0.9),
                boxShadow: `0 8px 16px ${alpha(selectedUser ? getAvatarColor(selectedUser.id) : luxuryGold, 0.3)}`,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
              boxShadow: `0 4px 12px ${alpha(selectedUser ? getAvatarColor(selectedUser.id) : luxuryGold, 0.3)}`,
              "&:disabled": {
                backgroundColor: alpha(selectedUser ? getAvatarColor(selectedUser.id) : luxuryGold, 0.5),
                color: "#ffffff",
              },
            }}
          >
            {isSending ? "שולח..." : "שלח מייל"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* snackbar להצלחות ושגיאות */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            width: "100%",
            "& .MuiAlert-icon": {
              fontSize: "24px",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default MembersOfGroup
