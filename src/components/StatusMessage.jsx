const StatusMessage = ({ status }) => {
  if (status === 'success') {
    return null;
  }

  if (status === 'loading') {
    return (
      <section>
        <div
          className="spinner-border"
          role="status"
        />
        <p>Loading today's brief...</p>
      </section>
    )
  }

  if (status === 'empty') {
    return <p>No brief is available yet for today. Check back later!</p>
  }

  if (status === 'network-error') {
    return <p>We couldn’t load the brief. Please try again later.</p>
  }

  if (status === 'invalid-data') {
    return <p>Today’s brief is unavailable.</p>
  }

  return <p>An unexpected error happened. Please try again later.</p>
}

export default StatusMessage;