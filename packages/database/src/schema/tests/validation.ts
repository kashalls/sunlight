import { z } from 'zod'
import { testTypes } from './constants'

export const testTypeScheam  = z.enum(testTypes)