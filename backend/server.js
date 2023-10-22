const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const data = require('./EventData');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());

// Sample data to store user information (in-memory)
let users = [];

// API to create a user
app.post('/api/users', (req, res) => {
  const { userId, name, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.userId === userId);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { userId, name, password, registered_events: [] };
  users.push(newUser);
  res.json({ message: 'User created successfully', user: newUser });
});

// API to login a user
app.post('/api/login', async(req, res) => {
  const { userId, password } = req.body;

  const user = await users.find(user => user.userId === userId);

  if (!user) {
    return res.status(400).json({ error:"user id is incorrect"});
  }
  if (user.password !== password) return res.status(400).send("Invalid Password");

  res.json({ user: user, message: "Logged in Successfully" });
});
//get all users
app.get('/api/users', async(req,res)=>{
  res.json(users)
})
// 3. Get All Events
app.get('/api/events', (req, res) => {
  res.json(data);
});
// ... (previous code remains the same)

// 4. Get All Registered Events List
app.get('/api/events/registered/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find(user => user.userId === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const registeredEvents = user.registered_events.map(eventId => data.find(event => event.id === eventId));

  res.json(registeredEvents);
});

// 5. Register Event
app.post('/api/register-event', (req, res) => {
  const { userId, eventId } = req.body;

  const user = users.find(user => user.userId === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const isEventRegistered = user.registered_events.some(event => event.id === eventId);
  if (isEventRegistered) {
    return res.status(400).json({ error: 'User is already registered for this event' });
  }
  const registeredData = data.filter((event)=>event.id === eventId)
  user.registered_events.push(...registeredData);
  res.json({ message: 'Event registered successfully', user });
});

// 6. Unregister Event
app.delete('/api/unregister-event', (req, res) => {
  const { userId, eventId } = req.body;

  const user = users.find(user => user.userId === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isEventRegistered = user.registered_events.some(event => event.id === eventId);
  if (!isEventRegistered) {
    return res.status(400).json({ error: 'User is not registered for this event' });
  }

  user.registered_events = user.registered_events.filter(event => event.id !== eventId);

  res.json({ message: 'Event unregistered successfully', user });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
