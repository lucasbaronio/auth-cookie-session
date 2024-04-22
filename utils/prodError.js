export default (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Unidentified Not Operational ERROR Ocurred: ===>', err);

    return res.status(500).json({
      status: 'error',
      message: '¡Algo salió mal! Inténtalo de nuevo o vuelve más tarde.',
    });
  }
};
