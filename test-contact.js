const mongoose = require('mongoose');
const Contact = require('./server/models/Contact');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/akario-mart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test the contact message structure
async function testContactStructure() {
  try {
    console.log('Testing contact message structure...');
    
    // Find all contact messages
    const contacts = await Contact.find().populate('user', 'name email').populate('response');
    
    console.log(`Found ${contacts.length} contact messages:`);
    
    contacts.forEach((contact, index) => {
      console.log(`\n--- Contact ${index + 1} ---`);
      console.log(`ID: ${contact._id}`);
      console.log(`Name: ${contact.name}`);
      console.log(`Email: ${contact.email}`);
      console.log(`Subject: ${contact.subject}`);
      console.log(`Message: ${contact.message}`);
      console.log(`User: ${contact.user ? contact.user.name + ' (' + contact.user.email + ')' : 'None'}`);
      console.log(`Response: ${contact.response ? 'Yes' : 'No'}`);
      if (contact.response) {
        console.log(`  Response ID: ${contact.response._id}`);
        console.log(`  Response Message: ${contact.response.message}`);
        console.log(`  Response From: ${contact.response.name}`);
      }
      console.log(`Created At: ${contact.createdAt}`);
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

testContactStructure();