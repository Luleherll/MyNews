import { EventEmitter } from "events";
import { EVENTS } from '../constants';
import { Mailer, Response, JwtUtil } from "../../utils";

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

  emitValue(event, val = null) {
    this.emit(event, val);
    return val;
}
}

const emitter = new AsyncEvents();

// Mailing events
emitter.on(EVENTS.SEND_EMAIL, emitter.execute(Mailer.send));


// JWT events
emitter.on(EVENTS.GET_AUTH_TOKEN, JwtUtil.getAuthToken)
emitter.on(EVENTS.GET_REFRESH_TOKEN, JwtUtil.getRefreshToken)

export default emitter;
