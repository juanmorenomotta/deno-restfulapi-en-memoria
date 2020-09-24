export default async (context: any, next: any) => {
  const { request, response } = context;
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  response.headers.set("X-Response-Time", `${ms}ms`);
}