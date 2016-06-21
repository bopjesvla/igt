import {Router} from 'express'

let api = new Router
let a = (req, res, next) => {
	res.end('bad')
}

api.get('/a', a)

export default api;
