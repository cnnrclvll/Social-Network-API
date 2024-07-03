function formatDate(timestamp) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    hour12: true 
  };
  return new Date(timestamp).toLocaleString('en-US', options);
};

module.exports = formatDate