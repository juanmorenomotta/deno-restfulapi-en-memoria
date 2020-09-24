export default (context: any) => {
  const { response } = context;
  response.status = 404;
  response.body = {
    success: false,
    msg: "No existe el recurso requerido",
  }
}