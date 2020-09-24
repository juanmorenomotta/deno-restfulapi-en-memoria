import { 
  Application, 
  parse,
} from "./deps.ts";

import logger from './Middlewares/logger.ts';
import header from './Middlewares/header.ts';
import notFound from './Middlewares/notFound.ts';
import errorHandler from './Middlewares/errorHandler.ts';
import { userRouter } from './Routes/UserRouter.ts';

const app = new Application();
const { args } = Deno;
const PUERTO_DEFAULT = 8000;
const puerto = parse(args).port ? Number(parse(args).port ) : PUERTO_DEFAULT;

app.use( logger );
app.use( header );
app.use( errorHandler );

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log(`Deno se esta ejecutando en http://localhost:${puerto}`);
app.use( notFound );
await app.listen({ port: puerto });