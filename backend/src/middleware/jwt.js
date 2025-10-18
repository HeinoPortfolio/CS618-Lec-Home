// Require authentication middleware ==========================================
import { expressjwt } from 'express-jwt'

// Function to that will use JWT for authntication ============================
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

// Adding optional authentication =============================================
export const optionalAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
})
