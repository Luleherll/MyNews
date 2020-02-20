import { EventEmitter } from "events";
import { EVENTS } from '../constants';
import { Mailer, Response } from "../../utils";

class AsyncEvents extends EventEmitter {
  execute = asyncFunc => (...args) => {
    const res = args[1];
      const next = args[2]
    asyncFunc(...args).then(data => {
      if (typeof data === 'string') {
        return Response.success(res, { message: data }, 200)
      } else { next(data) }
    })
    .catch(err => next(err))
  };
}

const emitter = new AsyncEvents();

// Mailing events
emitter.on(EVENTS.SEND_EMAIL, emitter.execute(Mailer.send));

export default emitter;
