const express = require('express');
const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gmail.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gmail.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gmail.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  // extract email parameter from the request URL
  const email = req.params.email;
  // Filter the user array to find users whose email matches the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);
  // Send the filtered_user array as the response to the client
  res.send(filtered_users);
});

// GET by specific ID request: Retrieve a single user with first name
router.get("/:firstName", (req, res) => {
  // extract first name parameter from the request URL
  const firstName = req.params.firstName;
  // Filter the user array to find users whose first name matches the extracted first name parameter
  let filtered_users = users.filter((user) => user.firstName === firstName);
  // Send the filtered_user array as the response to the client
  res.send(filtered_users);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  // Push a new user object to the users array based on query parameters from the request
  users.push({
    'firstName': req.query.firstName,
    'lastName': req.query.lastName,
    'email': req.query.email,
    'DOB': req.query.DOB
  });
  // send a success message to the client
  res.send('The user ' + req.query.firstName + ' has been added successfully');
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    if (req.query.DOB) {
      filtered_user.DOB = req.query.DOB;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email !== email);
    users.push(filtered_user);

    // send a success message to the client
    res.send(`User with email ${email} has been updated successfully`);
  } else {
    // send error message if no user found
    res.send(`No user found with email ${email}`);
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // extract email parameter from the request URL 
  const email = req.params.email;
  // filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email !== email);
  // send a success message as the response, indicating the user has been deleted
  res.send(`User with email ${email} has been deleted successfully`);
});

module.exports = router;
