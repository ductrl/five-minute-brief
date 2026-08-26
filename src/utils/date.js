const formatEditionDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);

  const monthConvert = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return `${monthConvert[month]} ${day}, ${year}`;
}

const formatPublishedTime = (isoDateTime) => {
  const date = new Date(isoDateTime);

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }).format(date)

  return `${time} ET`;
}

export { formatEditionDate, formatPublishedTime };