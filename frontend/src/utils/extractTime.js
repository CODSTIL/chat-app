export function extractTime(dateString) {
	try {
	  const date = new Date(dateString);
	  if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	  }
	  const hours = padZero(date.getHours());
	  const minutes = padZero(date.getMinutes());
	  return `${hours}:${minutes}`;
	} catch (error) {
	  console.error('Error extracting time:', error);
	  return 'Invalid time';
	}
  }
// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}