import * as React from 'react';
import Back from '../global/Back'
import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { tokens } from '../../theme';


function Profile() {
    const navigate = useNavigate();
    //Theming
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //Reducers
    const { userDetails: userProfile} = useSelector((state) => state.profileReducer);
    
    return(
        <Grid container>
            <Box sx={{height:'25vh', minWidth:'100%', backgroundColor:colors.primary[300]}}>
                <Box sx={{minWidth:'100%', display:'flex', justifyContent:'space-between'}}>
                    <Box sx={{maxWidth:'fit-content'}}><Back /></Box>
                    <Tooltip title="Edit Feature - To be published soon!" placement="left-start">
                        <div>
                    <IconButton aria-label="edit user" disabled={true} color="primary" sx={{mr:'15px'}} onClick={() => {
                      navigate(`/Profile-Edit/${userProfile.id}`);
                      //console.log(userProfile.id);
                    }}>
                      <EditIcon sx={{fontSize:'2.4rem'}}/>
                    </IconButton></div>
                    </Tooltip>
                </Box>
                <Avatar src={userProfile.avatar} sx={{ m:'auto', mt:'-5vh', minHeight:'150px', minWidth:'150px', backgroundColor:colors.primary[200], fontSize:'xxx-large'}} >
                        {Object.getOwnPropertyNames(userProfile).length>0 ? userProfile.userName.charAt(0) : 'No Image'}
                </Avatar>
                <Box sx={{minWidth:'100%', display:'flex', textAlign:'center', flexDirection:'column', justifyContent:'center', mt:1}}>
                <Typography gutterBottom variant="h5" component="div" >
                    {userProfile.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                          Money Manager - User Profile
                </Typography>
                </Box>
            </Box>
            <Grid container sx={{mt:'16vh', p:'0px 20px'}} spacing={2}>
                <Grid item xs={10} md={6} >
                    <Paper elevation={5} sx={{minHeight:'45vh', backgroundColor:colors.primary[400]}}>
                        <center><b>Readable Data</b></center>
                        <List >
                            <ListItem>
                                <ListItemIcon>
                                  <TagIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`ID: ${userProfile.id}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <InfoIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Profile created at: ${new Date(userProfile.registered_at).toString()}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <LoginIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Logged In at: ${new Date(userProfile.iat).toString()}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <RunningWithErrorsIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Session will expire at: ${new Date(userProfile.eat).toString()}`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={5} sx={{minHeight:'45vh',backgroundColor:colors.primary[400]}}>
                    <center><b>Editable Data</b></center>
                        <List>
                            <ListItem>
                            <ListItemIcon>
                                  <PersonIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`User Name: ${userProfile.userName}`} />
                            </ListItem>
                            <ListItem>
                            <ListItemIcon>
                                  <EmailIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Email Address: ${userProfile.emailId}`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid> 
            
        </Grid>
         
    );
}

export default Profile;