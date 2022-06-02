import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const sessionOptions = {
  password: require('crypto').randomBytes(48).toString('hex'),
  cookieName: 'openfoam_token',
  cookieOptions: {
    secure: false //process.env.NODE_ENV === "production"
  }
}

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions)
}
