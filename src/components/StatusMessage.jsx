const StatusMessage = ({ status }) => {
  if (status === 'success') {
    return null;
  }

  if (status === 'loading') {
    return (
      <section className="text-center pt-5 fst-italic">
        <div
          className="spinner-border mb-3"
          role="status"
        />
        <p>Loading today's brief...</p>
      </section>
    )
  }

  if (status === 'empty') {
    return <p className="text-center pt-5 fst-italic">No brief is available yet for today. Check back later!</p>
  }

  if (status === 'network-error') {
    return <p className="error-message text-center pt-5 fst-italic">We couldn’t load the brief. Please try again later.</p>
  }

  if (status === 'invalid-data') {
    return <p className="error-message text-center pt-5 fst-italic">Today’s brief is unavailable.</p>
  }

  return <p className="error-message text-center pt-5 fst-italic">An unexpected error happened. Please try again later.</p>
}

export default StatusMessage;