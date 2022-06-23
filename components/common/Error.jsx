const Error = ({ error: { code, message } }) => (
  <div className="error-container">
    <div className="error-msg">
      <img src="images/not-found.svg" alt="" />

      <div>
        <p className="error-code">{code === 'ECONNABORTED' ? 'Connection timeout' : 'Something went wrong'}</p>

        <p className="error-description">{message}</p>
      </div>
    </div>
  </div>
)

export default Error
