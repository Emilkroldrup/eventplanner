// Render the "Create Event" page
exports.renderCreateEventPage = (req, res) => {
  res.render('createEvent', {
    pageTitle: 'Create Event',
  });
};

// Handle form submission
exports.createEvent = (req, res) => {
  const { title, city, address, eventType, startDate, duration, description, ageRestriction } = req.body;
  console.log('Event Data:', { title, city, address, eventType, startDate, duration, description, ageRestriction });
  res.send('Event created successfully!');
};
