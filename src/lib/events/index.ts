import { EventEmitter } from "events";
import { SEND_EMAIL, SUCCESS, ERROR } from "./constants";
import { Mailer, Response } from "../../utils";
import { response } from "express";
import { Logger } from "../../config";

class AsyncEvents extends EventEmitter {
  execute = asyncFunc => (...args) => {
    const res = args[1];
      const next = args[2]
    asyncFunc(...args).then(data => {
      if (typeof data === 'string') {
        return Response.success(res, { message: data }, 201)
      } else { next(data) }
    })
    .catch(err => next(err))
  };
}

const emitter = new AsyncEvents();

// Mailing events
emitter.on(SEND_EMAIL, emitter.execute(Mailer.send));

export default emitter;
