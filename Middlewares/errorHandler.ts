export default async (context: any, next: any) => {
  try {
    await next();
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      msg: error.message,
    }
  }

}