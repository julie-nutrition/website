import { NUTRITION_ENABLED } from '@/config/release'
import type { FieldAccess, PayloadRequest } from 'payload'

export const canReadNutrition = (({ req }: { req: Pick<PayloadRequest, 'user'> }) =>
  NUTRITION_ENABLED || Boolean(req.user)) satisfies FieldAccess
