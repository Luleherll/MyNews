const success = (res: any, data: Object, status = 200): any => res.status(status).json(data)
const failure = (res: any, reason = 'An error occurred, please try again.', status = 500): any => res.status(status).json({ error: reason })

export { success, failure }
