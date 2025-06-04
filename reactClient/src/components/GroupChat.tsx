// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Box, TextField, Button, List, ListItem, Typography, IconButton, Avatar, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useAuth } from '../context/AuthContext';

// const GroupChat = ({ groupId, userId }: { groupId: number; userId: number }) => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const { user } = useAuth();
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);

//   useEffect(() => {
//     fetchMessages();
//   }, [groupId]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7287/api/messages/group/${groupId}`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error('שגיאה בהבאת הודעות:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;
//     try {
//       await axios.post(`https://localhost:7287/api/messages`, {
//         userId,
//         name:user?.firstName+" "+user?.lastName,
//         groupId,
//         content: newMessage,
//       });
//       console.log(messages+";;;")
//       setNewMessage('');
//       fetchMessages();
//     } catch (error) {
//       console.error('שגיאה בשליחת הודעה:', error);
//     }
//   };

//   const handleDeleteMessage = async (messageId: number) => {
//     try {
//       await axios.delete(`https://localhost:7287/api/messages/${messageId}?userId=${userId}`);
//       fetchMessages();
//     } catch (error) {
//       console.error('שגיאה במחיקת הודעה:', error);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2, position: 'relative', height: '100vh' }}>
//       {/* List of messages with scrollable container */}
//       <Box
//         sx={{
//           overflowY: 'auto',
//           maxHeight: 'calc(100% - 140px)', // Make space for the fixed input box at the bottom
//           paddingBottom: '56px', // Add padding at the bottom to prevent overlapping with the input
//         }}
//       >
//         <List>
//           {messages.map((msg) => {
//             const isOwnMessage = Number(msg.userId) === Number(userId);
//            // const align = isOwnMessage ? 'right' : 'left';
//             const flexDirection = isOwnMessage ? 'row-reverse' : 'row';
           
//             return (
//               <ListItem key={msg.id} sx={{ display: 'flex', flexDirection, alignItems: 'flex-start' }}>
//                 <Avatar sx={{ bgcolor: 'primary.main', ml: isOwnMessage ? 0 : 1, mr: isOwnMessage ? 1 : 0 }}>                
//                   {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
//                 </Avatar>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 1,
//                     bgcolor: isOwnMessage ? '#DCF8C6' : '#FFFFFF',
//                     maxWidth: '70%',
//                     wordBreak: 'break-word',
//                   }}
//                 >
//                   <Typography variant="subtitle2">{msg.userName}</Typography>
//                   <Typography variant="body1">{msg.content}</Typography>
//                 </Paper>
//                 {isOwnMessage && (
//                   <IconButton onClick={() => handleDeleteMessage(msg.id)} size="small" sx={{ ml: 1 }}>
//                     <DeleteIcon color="error" />
//                   </IconButton>
//                 )}
//               </ListItem>
//             );
//           })}
//         </List>
//         <div ref={messagesEndRef} />
//       </Box>

//       {/* Fixed input at the bottom */}
//       <Box sx={{ position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)', width: 'auto', padding: '8px', backgroundColor: '#fff', boxShadow: 3 }}>
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <TextField
//             variant="outlined"
//             placeholder="הקלד הודעה..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             sx={{ width: '500px' }} // Making the input box narrower
//           />
//           <Button variant="contained" onClick={handleSendMessage}>
//             שלח
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default GroupChat;
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, List, ListItem, Typography, IconButton, Avatar, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';

const GroupChat = ({ groupId, userId }: { groupId: number; userId: number }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [groupId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://shareyourjoy-server.onrender.com/api/messages/group/${groupId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('שגיאה בהבאת הודעות:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`https://shareyourjoy-server.onrender.com/api/messages`, {
        userId,
        name: user?.firstName+" "+user?.lastName,
        groupId,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('שגיאה בשליחת הודעה:', error);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await axios.delete(`https://shareyourjoy-server.onrender.com/api/messages/${messageId}?userId=${userId}`);
      fetchMessages();
    } catch (error) {
      console.error('שגיאה במחיקת הודעה:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2, position: 'relative', height: '100vh' }}>
      {/* List of messages with scrollable container */}
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100% - 140px)', // Make space for the fixed input box at the bottom
          paddingBottom: '56px', // Add padding at the bottom to prevent overlapping with the input
        }}
      >
        <List>
          {messages.map((msg) => {
            const isOwnMessage = Number(msg.userId) === Number(userId);
            const flexDirection = isOwnMessage ? 'row-reverse' : 'row';

            return (
              <ListItem key={msg.id} sx={{ display: 'flex', flexDirection, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', ml: isOwnMessage ? 0 : 1, mr: isOwnMessage ? 1 : 0 }}>
                    {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                    {msg.name} {/* תוכל לשים את השם המלא כאן */}
                  </Typography>
                </Box>
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    bgcolor: isOwnMessage ? '#DCF8C6' : '#FFFFFF',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                  }}
                >
                  <Typography variant="subtitle2">{msg.userName}</Typography>
                  <Typography variant="body1">{msg.content}</Typography>
                </Paper>
                {isOwnMessage && (
                  <IconButton onClick={() => handleDeleteMessage(msg.id)} size="small" sx={{ ml: 1 }}>
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Fixed input at the bottom */}
      <Box sx={{ position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)', width: 'auto', padding: '8px', backgroundColor: '#fff', boxShadow: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            placeholder="הקלד הודעה..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ width: '500px' }} // Making the input box narrower
          />
          <Button variant="contained" onClick={handleSendMessage}>
            שלח
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupChat;
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { 
//   Box, 
//   TextField, 
//   Button, 
//   List, 
//   ListItem, 
//   Typography, 
//   IconButton, 
//   Avatar, 
//   Paper,
//   Chip,
//   Fade,
//   Grow
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import { useAuth } from '../context/AuthContext';

// const GroupChat = ({ groupId, userId }: { groupId: number; userId: number }) => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const { user } = useAuth();
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);

//   useEffect(() => {
//     fetchMessages();
//   }, [groupId]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7287/api/messages/group/${groupId}`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error('שגיאה בהבאת הודעות:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;
    
//     setIsTyping(true);
//     try {
//       await axios.post(`https://localhost:7287/api/messages`, {
//         userId,
//         name: user?.firstName + " " + user?.lastName,
//         groupId,
//         content: newMessage,
//       });
//       setNewMessage('');
//       fetchMessages();
//     } catch (error) {
//       console.error('שגיאה בשליחת הודעה:', error);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleDeleteMessage = async (messageId: number) => {
//     try {
//       await axios.delete(`https://localhost:7287/api/messages/${messageId}?userId=${userId}`);
//       fetchMessages();
//     } catch (error) {
//       console.error('שגיאה במחיקת הודעה:', error);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString('he-IL', { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   const getAvatarColor = (name: string) => {
//     const colors = [
//       '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
//       '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
//     ];
//     const hash = name.split('').reduce((a, b) => {
//       a = ((a << 5) - a) + b.charCodeAt(0);
//       return a & a;
//     }, 0);
//     return colors[Math.abs(hash) % colors.length];
//   };

//   return (
//     <Box 
//       sx={{ 
//         width: '100%', 
//         maxWidth: 800, 
//         mx: 'auto', 
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         bgcolor: '#f5f7fa',
//         position: 'relative'
//       }}
//     >
//       {/* Header */}
//       <Paper 
//         elevation={2}
//         sx={{ 
//           p: 2, 
//           bgcolor: '#ffffff',
//           borderRadius: 0,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//         }}
//       >
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontWeight: 600,
//             color: '#2c3e50',
//             textAlign: 'center'
//           }}
//         >
//           קבוצת צ'אט
//         </Typography>
//       </Paper>

//       {/* Messages container */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: 'auto',
//           px: 2,
//           py: 1,
//           '&::-webkit-scrollbar': {
//             width: '6px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: 'transparent',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#bdc3c7',
//             borderRadius: '3px',
//           },
//         }}
//       >
//         <List sx={{ py: 0 }}>
//           {messages.map((msg, index) => {
//             const isOwnMessage = Number(msg.userId) === Number(userId);
//             const showAvatar = index === 0 || 
//               messages[index - 1]?.userId !== msg.userId;

//             return (
//               <Grow 
//                 in={true} 
//                 timeout={300 + (index * 50)}
//                 key={msg.id}
//               >
//                 <ListItem 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: isOwnMessage ? 'row-reverse' : 'row',
//                     alignItems: 'flex-end',
//                     mb: 1,
//                     px: 0
//                   }}
//                 >
//                   {/* Avatar */}
//                   {showAvatar ? (
//                     <Avatar 
//                       sx={{ 
//                         bgcolor: getAvatarColor(msg.name || ''),
//                         width: 40,
//                         height: 40,
//                         fontSize: '0.9rem',
//                         fontWeight: 600,
//                         mx: 1,
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
//                       }}
//                     >
//                       {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
//                     </Avatar>
//                   ) : (
//                     <Box sx={{ width: 40, mx: 1 }} />
//                   )}

//                   {/* Message bubble */}
//                   <Box
//                     sx={{
//                       maxWidth: '70%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: isOwnMessage ? 'flex-end' : 'flex-start'
//                     }}
//                   >
//                     <Typography 
//                       variant="caption" 
//                       sx={{ 
//                         color: '#7f8c8d',
//                         mb: 0.5,
//                         px: 1,
//                         fontWeight: 500
//                       }}
//                     >
//                       {msg.name}
//                     </Typography>
                    
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 1.5,
//                         bgcolor: isOwnMessage ? '#25D366' : '#ffffff',
//                         color: isOwnMessage ? '#ffffff' : '#2c3e50',
//                         borderRadius: isOwnMessage 
//                           ? '18px 18px 4px 18px' 
//                           : '18px 18px 18px 4px',
//                         wordBreak: 'break-word',
//                         position: 'relative',
//                         boxShadow: isOwnMessage 
//                           ? '0 2px 12px rgba(37, 211, 102, 0.3)'
//                           : '0 2px 8px rgba(0,0,0,0.1)',
//                         border: isOwnMessage ? 'none' : '1px solid #e9ecef',
//                         transition: 'all 0.2s ease',
//                         '&:hover': {
//                           transform: 'translateY(-1px)',
//                           boxShadow: isOwnMessage 
//                             ? '0 4px 16px rgba(37, 211, 102, 0.4)'
//                             : '0 4px 12px rgba(0,0,0,0.15)',
//                         }
//                       }}
//                     >
//                       <Typography 
//                         variant="body1" 
//                         sx={{ 
//                           fontSize: '0.95rem',
//                           lineHeight: 1.4,
//                           mb: 0.5
//                         }}
//                       >
//                         {msg.content}
//                       </Typography>
                      
//                       <Box sx={{ 
//                         display: 'flex', 
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         mt: 0.5
//                       }}>
//                         <Typography 
//                           variant="caption" 
//                           sx={{ 
//                             opacity: 0.7,
//                             fontSize: '0.75rem'
//                           }}
//                         >
//                           {msg.timestamp && formatTimestamp(msg.timestamp)}
//                         </Typography>
                        
//                         {isOwnMessage && (
//                           <Fade in={true}>
//                             <IconButton 
//                               onClick={() => handleDeleteMessage(msg.id)} 
//                               size="small"
//                               sx={{ 
//                                 ml: 1,
//                                 opacity: 0.7,
//                                 '&:hover': {
//                                   opacity: 1,
//                                   bgcolor: 'rgba(255,255,255,0.1)'
//                                 }
//                               }}
//                             >
//                               <DeleteIcon sx={{ fontSize: '1rem', color: 'inherit' }} />
//                             </IconButton>
//                           </Fade>
//                         )}
//                       </Box>
//                     </Paper>
//                   </Box>
//                 </ListItem>
//               </Grow>
//             );
//           })}
//         </List>
        
//         {isTyping && (
//           <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 2 }}>
//             <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#bdc3c7' }}>
//               <Typography sx={{ fontSize: '0.7rem' }}>...</Typography>
//             </Avatar>
//             <Chip 
//               label="מקליד..." 
//               size="small" 
//               sx={{ 
//                 bgcolor: '#ecf0f1',
//                 color: '#7f8c8d',
//                 fontSize: '0.75rem'
//               }}
//             />
//           </Box>
//         )}
        
//         <div ref={messagesEndRef} />
//       </Box>

//       {/* Input area */}
//       <Paper 
//         elevation={8}
//         sx={{ 
//           p: 2,
//           bgcolor: '#ffffff',
//           borderRadius: 0,
//           boxShadow: '0 -2px 12px rgba(0,0,0,0.1)'
//         }}
//       >
//         <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
//           <TextField
//             variant="outlined"
//             placeholder="הקלד הודעה..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             multiline
//             maxRows={4}
//             sx={{ 
//               flex: 1,
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '20px',
//                 bgcolor: '#f8f9fa',
//                 '&:hover': {
//                   bgcolor: '#e9ecef'
//                 },
//                 '&.Mui-focused': {
//                   bgcolor: '#ffffff'
//                 }
//               }
//             }}
//           />
//           <IconButton 
//             onClick={handleSendMessage}
//             disabled={!newMessage.trim()}
//             sx={{ 
//               bgcolor: '#25D366',
//               color: '#ffffff',
//               width: 48,
//               height: 48,
//               '&:hover': {
//                 bgcolor: '#128C7E',
//                 transform: 'scale(1.05)'
//               },
//               '&:disabled': {
//                 bgcolor: '#bdc3c7',
//                 color: '#ffffff'
//               },
//               transition: 'all 0.2s ease'
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default GroupChat;