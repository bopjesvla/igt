import {Router} from 'express'

let api = new Router
let a = (req, res, next) => {
	res.end('man')
}

api.get('/a', a)

export default api
