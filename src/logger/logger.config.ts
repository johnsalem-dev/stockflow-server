import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { ENV_KEYS, NODE_ENV } from '../constants';
import pino from 'pino';

const PRETTY_OPTS = { target: 'pino-pretty', options: { colorize: true } };


export const SERIALIZERS = {
  req: (req: any) => ({
    id: req.id,
    method: req.method,
    url: req.url,
    query: req.query,
    params: req.params,
    ip: req.ip,
  }),

  res: (res: any) => ({
    statusCode: res.statusCode,
  }),

  err: pino.stdSerializers.err,
};
const isDevelopment = (nodeEnv?: string) =>
  !nodeEnv || nodeEnv === NODE_ENV.DEVELOPMENT;

const buildSuccessMessage = (req: any, res: any) =>
  `${req.method} ${req.url} ${res.statusCode}`;

const buildErrorMessage = (req: any, res: any, err?: Error) =>
  `${req.method} ${req.url} ${res.statusCode} - ${err?.message ?? 'error'}`;

export const getLoggerConfig = (config: ConfigService): Params => {
  const level = config.get<string>(ENV_KEYS.LOG_LEVEL, 'info');
  const nodeEnv = config.get<string>(ENV_KEYS.NODE_ENV);
  const dev = isDevelopment(nodeEnv);

  return {
    pinoHttp: {
      level,
      transport: dev ? PRETTY_OPTS : undefined,
      serializers: SERIALIZERS,
      customSuccessMessage: buildSuccessMessage,
      customErrorMessage: buildErrorMessage,
    },
  };
};