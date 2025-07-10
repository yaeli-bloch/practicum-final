"use client"

import { useEffect, useState } from "react"
import {
  Container,
  Button,
  Grid,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Fade,
  Grow,
  alpha,
  Badge,
  Avatar,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import axios from "axios"
import { useLocation } from "react-router-dom"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import EventIcon from "@mui/icons-material/Event"
import ImageIcon from "@mui/icons-material/Image"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"

const CalendarPage = () => {
  const [files, setFiles] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any | null>(null)

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  //const eventsSectionRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
    const groupId = location.state?.groupId
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // צבעים יוקרתיים
  const luxuryGold = "#D4AF37" // זהב יוקרתי
  const luxuryPurple = "#800080" // סגול יוקרתי
  const luxuryBlue = "#0047AB" // כחול יוקרתי


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // קריאת API אמיתית לקבלת הנתונים
        const res = await axios.get(`https://shareyourjoy-server.onrender.com/api/Group/${groupId}/files`)
        setFiles(res.data)
      } catch (err) {
        console.error("Error loading files", err)
      }
    }

    if (groupId) {
      fetchFiles()
    }
  }, [groupId])

  const handleDateClick = (date: string) => {
    const matchedFiles = files.filter((file: any) => new Date(file.createdAt).toLocaleDateString() === date)
    setEventsForSelectedDate(matchedFiles)
    setSelectedDate(date)
  }

  const handleEventClick = (event: any) => {
    setSelectedFile(event)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedFile(null)
  }

  // const handleBackToGroup = () => {
  //   if (groupId) {
  //     navigate("/MyGroup", { state: { groupId } })
  //   }
  // }

  const handleMonthChange = (direction: string) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    } else if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }
  }

  // בדיקה אם יש אירועים בתאריך מסוים
  const hasEvents = (date: string) => {
    return files.some((file: any) => new Date(file.createdAt).toLocaleDateString() === date)
  }

  // מספר האירועים בתאריך מסוים
  const getEventCount = (date: string) => {
    return files.filter((file: any) => new Date(file.createdAt).toLocaleDateString() === date).length
  }

  // בדיקה אם התאריך הוא היום
  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const getCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    // התאמה ליום ראשון כיום הראשון בשבוע (0)
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const calendar = []

    // יצירת תאים ריקים לשורה הראשונה (שבוע)
    for (let i = 0; i < startDay; i++) {
      calendar.push(
        <Grid item xs={1.7} sm={1.7} md={1.7} key={`empty-${i}`}>
          <Box
            sx={{
              height: isMobile ? "60px" : "120px",
              borderRadius: "12px",
              backgroundColor: alpha("#f5f5f5", 0.5),
              border: "1px dashed #ddd",
            }}
          />
        </Grid>,
      )
    }

    // יצירת ימי לוח השנה
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day).toLocaleDateString()
      const hasEventsToday = hasEvents(date)
      const eventCount = getEventCount(date)
      const todayHighlight = isToday(day)

      calendar.push(
        <Grid item xs={1.7} sm={1.7} md={1.7} key={day}>
          <Card
            elevation={hasEventsToday ? 4 : todayHighlight ? 3 : 1}
            sx={{
              height: isMobile ? "60px" : "120px",
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: selectedDate === date ? "scale(1.03)" : "scale(1)",
              cursor: "pointer",
              border: todayHighlight
                ? `2px solid ${luxuryGold}`
                : hasEventsToday
                  ? `2px solid ${luxuryPurple}`
                  : "none",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: hasEventsToday ? `0 8px 24px ${alpha(luxuryPurple, 0.4)}` : "0 8px 16px rgba(0,0,0,0.1)",
                zIndex: 10,
              },
              backgroundColor:
                selectedDate === date
                  ? alpha(luxuryBlue, 0.1)
                  : todayHighlight
                    ? alpha(luxuryGold, 0.1)
                    : hasEventsToday
                      ? alpha(luxuryPurple, 0.05)
                      : "#ffffff",
            }}
            onClick={() => handleDateClick(date)}
          >
            {/* רקע דקורטיבי לימים עם אירועים */}
            {hasEventsToday && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.05,
                  backgroundImage:
                    "radial-gradient(circle, rgba(128, 0, 128, 0.8) 10%, transparent 10.5%), radial-gradient(circle, rgba(128, 0, 128, 0.8) 10%, transparent 10.5%)",
                  backgroundSize: "30px 30px",
                  backgroundPosition: "0 0, 15px 15px",
                  zIndex: 0,
                }}
              />
            )}

            <CardContent
              sx={{
                height: "100%",
                padding: isMobile ? "8px !important" : "16px !important",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* מספר היום */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={{
                    fontWeight: "bold",
                    color: todayHighlight ? luxuryGold : hasEventsToday ? luxuryPurple : "text.primary",
                  }}
                >
                  {day}
                </Typography>

                {/* אייקון לציון היום הנוכחי */}
                {todayHighlight && (
                  <CalendarTodayIcon
                    fontSize="small"
                    sx={{
                      color: luxuryGold,
                      animation: "pulse 2s infinite ease-in-out",
                      "@keyframes pulse": {
                        "0%": { opacity: 0.6 },
                        "50%": { opacity: 1 },
                        "100%": { opacity: 0.6 },
                      },
                    }}
                  />
                )}

                {/* תג מספר האירועים */}
                {hasEventsToday && !isMobile && (
                  <Badge
                    badgeContent={eventCount}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: luxuryPurple,
                        color: "#ffffff",
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}
              </Box>

              {/* רשימת אירועים מקוצרת */}
              {hasEventsToday && !isMobile && (
                <Box sx={{ mt: 1 }}>
                  {files
                    .filter((file: any) => new Date(file.createdAt).toLocaleDateString() === date)
                    .slice(0, 2)
                    .map((event, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: idx % 2 === 0 ? luxuryPurple : luxuryBlue,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            fontSize: "0.7rem",
                          }}
                        >
                          {event.title}
                        </Typography>
                      </Box>
                    ))}

                  {eventCount > 2 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: luxuryPurple,
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                      }}
                    >
                      +{eventCount - 2} עוד
                    </Typography>
                  )}
                </Box>
              )}

              {/* אינדיקטור לאירועים במובייל */}
              {hasEventsToday && isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <EventAvailableIcon
                    fontSize="small"
                    sx={{
                      color: luxuryPurple,
                    }}
                  />
                </Box>
              )}
            </CardContent>

            {/* קו תחתון צבעוני לימים עם אירועים */}
            {hasEventsToday && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: `linear-gradient(to right, ${luxuryPurple}, ${luxuryBlue})`,
                }}
              />
            )}
          </Card>
        </Grid>,
      )
    }

    return calendar
  }

  return (
    <Container maxWidth="lg" dir="rtl" sx={{ mb: 4 }}>
      <Card
        elevation={5}
        sx={{
          overflow: "hidden",
          borderRadius: "16px",
          marginY: 4,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
          background: `linear-gradient(to bottom, #ffffff, ${alpha(luxuryGold, 0.05)})`,
        }}
      >
        {/* כותרת עם רקע גרדיאנט */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${luxuryPurple}, ${luxuryBlue})`,
            padding: { xs: 2, md: 3 },
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
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

          <Box
            sx={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha("#fff", 0.15)} 0%, rgba(255,255,255,0) 70%)`,
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <EventIcon /> לוח שנה
            </Typography>

            {/* <Button
              variant="contained"
              color="inherit"
              onClick={handleBackToGroup}
              startIcon={<ArrowBackIcon />}
              sx={{
                backgroundColor: alpha("#ffffff", 0.2),
                color: "#ffffff",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: alpha("#ffffff", 0.3),
                },
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              חזרה לעמוד הקבוצה
            </Button> */}
          </Box>
        </Box>

        {/* ניווט בין חודשים */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: 2, md: 3 },
            borderBottom: `1px solid ${alpha(luxuryPurple, 0.1)}`,
            backgroundColor: alpha(luxuryPurple, 0.02),
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handleMonthChange("prev")}
            startIcon={<ChevronRightIcon />}
            sx={{
              borderColor: luxuryBlue,
              color: luxuryBlue,
              borderRadius: "8px",
              "&:hover": {
                borderColor: luxuryBlue,
                backgroundColor: alpha(luxuryBlue, 0.1),
                transform: "translateX(3px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            חודש קודם
          </Button>

          <Grow in={true} timeout={800}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${luxuryPurple}, ${luxuryBlue})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                padding: "0 16px",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "3px",
                  background: `linear-gradient(to right, ${luxuryPurple}, ${luxuryBlue})`,
                  borderRadius: "2px",
                },
              }}
            >
              {new Date(currentYear, currentMonth).toLocaleString("he-IL", {
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Grow>

          <Button
            variant="outlined"
            onClick={() => handleMonthChange("next")}
            endIcon={<ChevronLeftIcon />}
            sx={{
              borderColor: luxuryBlue,
              color: luxuryBlue,
              borderRadius: "8px",
              "&:hover": {
                borderColor: luxuryBlue,
                backgroundColor: alpha(luxuryBlue, 0.1),
                transform: "translateX(-3px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            חודש הבא
          </Button>
        </Box>

        {/* כותרות הימים */}
        <Box sx={{ padding: { xs: "16px 8px 0 8px", md: "16px 16px 0 16px" } }}>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((day, index) => (
              <Grid item xs={1.7} sm={1.7} md={1.7} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: { xs: 1, md: 1.5 },
                    textAlign: "center",
                    borderRadius: "8px",
                    backgroundColor: alpha(luxuryBlue, 0.1),
                    border: `1px solid ${alpha(luxuryBlue, 0.2)}`,
                  }}
                >
                  <Typography
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: luxuryBlue,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    {day}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* לוח השנה */}
        <Box sx={{ padding: { xs: "0 8px 16px 8px", md: "0 16px 16px 16px" } }}>
          <Grid container spacing={2}>
            {getCalendar()}
          </Grid>
        </Box>
      </Card>

      {/* רשימת אירועים לתאריך שנבחר */}
      {selectedDate && eventsForSelectedDate.length > 0 && (
        <Fade in={true} timeout={500}>
          <Card
            elevation={3}
            sx={{
              marginBottom: 4,
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${alpha(luxuryPurple, 0.2)}`,
              background: `linear-gradient(to bottom, #ffffff, ${alpha(luxuryGold, 0.05)})`,
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(luxuryPurple, 0.9)}, ${alpha(luxuryBlue, 0.9)})`,
                padding: { xs: 2, md: 3 },
                color: "#ffffff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* אלמנטים דקורטיביים */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha("#fff", 0.2)} 0%, rgba(255,255,255,0) 70%)`,
                  zIndex: 0,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <EventAvailableIcon /> אירועים בתאריך {selectedDate}
              </Typography>
            </Box>

            <List sx={{ padding: 0 }}>
              {eventsForSelectedDate.map((event: any, idx: number) => (
                <ListItem key={idx} disablePadding divider={idx < eventsForSelectedDate.length - 1}>
                  <ListItemButton
                    onClick={() => handleEventClick(event)}
                    sx={{
                      padding: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(luxuryPurple, 0.05),
                        transform: "translateX(-5px)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        marginLeft: 2,
                        backgroundColor: alpha(idx % 2 === 0 ? luxuryPurple : luxuryBlue, 0.2),
                        color: idx % 2 === 0 ? luxuryPurple : luxuryBlue,
                      }}
                    >
                      <ImageIcon />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: "medium", color: idx % 2 === 0 ? luxuryPurple : luxuryBlue }}>
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Fade>
      )}

      {/* דיאלוג המציג את התמונה הגדולה - בדיוק כמו בקוד המקורי */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
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
            background: `linear-gradient(135deg, ${luxuryPurple}, ${luxuryBlue})`,
            color: "#ffffff",
            fontWeight: "bold",
            padding: 3,
          }}
        >
          פרטי התמונה
        </DialogTitle>

        <DialogContent sx={{ padding: 0 }}>
          {selectedFile ? (
            <Box sx={{ textAlign: "center", padding: 3 }}>
              {/* הצגת התמונה בגודל גדול יותר - בדיוק כמו בקוד המקורי */}
              <img
                src={selectedFile.fileUrl || "/placeholder.svg"}
                alt={selectedFile.title}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                }}
              />

              {/* הצגת התיאור - בדיוק כמו בקוד המקורי */}
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  marginTop: 2,
                  fontWeight: "bold",
                  color: luxuryPurple,
                }}
              >
                {selectedFile.title}
              </Typography>

              {/* הצגת התאריך - בדיוק כמו בקוד המקורי */}
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                תאריך העלאה: {new Date(selectedFile.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ padding: 3 }}>אין פרטים זמינים.</Typography>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            padding: 2,
            borderTop: `1px solid ${alpha(luxuryPurple, 0.1)}`,
            backgroundColor: alpha(luxuryPurple, 0.02),
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: luxuryGold,
              color: "#ffffff",
              borderRadius: "8px",
              padding: "8px 24px",
              "&:hover": {
                backgroundColor: alpha(luxuryGold, 0.9),
                boxShadow: `0 8px 16px ${alpha(luxuryGold, 0.3)}`,
              },
              transition: "all 0.3s ease",
            }}
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CalendarPage
