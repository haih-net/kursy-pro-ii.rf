import type { Request } from 'express'
import type { CourseApplications } from '../Custom/courseApplications'
import SchemaBuilder from '@pothos/core'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'

export interface Context {
  req: Request
  courseApplications?: CourseApplications
}

export const builder = new SchemaBuilder<{
  Context: Context
  Scalars: {
    DateTime: {
      Input: Date
      Output: Date
    }
    Json: {
      Input: unknown
      Output: unknown
    }
  }
}>({})

builder.addScalarType('DateTime', DateTimeResolver)
builder.addScalarType('Json', JSONResolver)

builder.queryType({
  fields: (t) => ({
    health: t.string({
      resolve: () => 'ok',
    }),
  }),
})
