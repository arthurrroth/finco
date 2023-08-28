
import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>('loglevel');

const log = logger({

  transport: { target: 'pino-pretty' },

  level,

  base: { pid: true },

  timestamp: () => `, "time":"${dayjs().format('[💽] YYYY-MM-DDTHH:mm:ss')}"`,

});

export default log


