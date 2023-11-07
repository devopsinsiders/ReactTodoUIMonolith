import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/material';

const API_BASE_URL = 'http://52.146.33.135:8000';

const backgroundImage = process.env.PUBLIC_URL + '/background.jpg';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const createTask = async () => {
        try {
            await axios.post(`${API_BASE_URL}/tasks`, newTask);
            fetchTasks();
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported variable
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', // Optional, for a fixed background
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h3"
                    gutterBottom
                    style={{
                        textAlign: 'center', // Center align text
                        color: 'white', // Set text color to white
                        margin: '8px',
                    }}
                >
                    <img src="/devopsinsiderslogo.png" alt="My Logo" />
                    ToDo App
                </Typography>
                <div>
                    <TextField
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={newTask.title}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        InputProps={{
                            style: {
                                color: 'white',       // Set text color to white
                                borderColor: 'white',  // Set border color to white
                                '&:hover': {
                                    borderColor: 'white', // Set border color to white on hover
                                },
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white',       // Set label text color to white
                            },
                        }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTask.description}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        InputProps={{
                            style: {
                                color: 'white',           // Set text color to white
                                borderColor: 'white',      // Set border color to white
                                '&:hover': {
                                    borderColor: 'white',    // Set border color to white on hover
                                },
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white',           // Set label text color to white
                            },
                        }}
                    />

                    <Button variant="contained" color="primary" onClick={createTask} style={{ margin: '8px' }}>
                        Add Task
                    </Button>
                </div>

                <div>
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            textAlign: 'center', // Center align text
                            color: 'white', // Set text color to white
                            margin: '15px',
                        }}
                    >
                        Existing Tasks
                    </Typography>

                    {tasks.map((task) => (
                        <Box key={task.ID} mb={2}>
                            <Card key={task.ID} variant="elevation">
                                <CardContent>
                                    <Typography variant="h6">{task.Title}</Typography>
                                    <Typography variant="body2">{task.Description}</Typography>
                                    <IconButton onClick={() => deleteTask(task.ID)} color="secondary">
                                        <Delete />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </div>
            </Container>
        </Box>
    );
}

export default TodoApp;
