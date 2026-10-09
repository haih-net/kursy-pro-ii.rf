import { GraphQLError } from 'graphql'
import { builder } from './builder'
import type {
  ApplicationChallenge,
  ApplicationReceipt,
} from '../Custom/courseApplications'

const Challenge = builder
  .objectRef<ApplicationChallenge>('CourseApplicationChallenge')
  .implement({
    fields: (t) => ({
      token: t.exposeString('token', { nullable: false }),
      waitMs: t.exposeInt('waitMs', { nullable: false }),
    }),
  })
const Receipt = builder
  .objectRef<ApplicationReceipt>('CourseApplicationReceipt')
  .implement({
    fields: (t) => ({
      id: t.exposeString('id', { nullable: false }),
      message: t.exposeString('message', { nullable: false }),
    }),
  })
const Input = builder.inputType('CourseApplicationInput', {
  fields: (t) => ({
    token: t.string({ required: true }),
    message: t.string({ required: true }),
    topicIds: t.stringList({ required: true }),
    formatId: t.string({ required: true }),
    audienceId: t.string(),
    website: t.string(),
  }),
})
builder.mutationFields((t) => ({
  prepareCourseApplication: t.field({
    type: Challenge,
    nullable: false,
    resolve: (_root, _args, ctx) => {
      if (!ctx.courseApplications) {
        throw new GraphQLError('Приём заявок временно недоступен.')
      }
      return ctx.courseApplications.challenge(ctx.req)
    },
  }),
  submitCourseApplication: t.field({
    type: Receipt,
    nullable: false,
    args: { input: t.arg({ type: Input, required: true }) },
    resolve: (_root, { input }, ctx) => {
      if (!ctx.courseApplications) {
        throw new GraphQLError('Приём заявок временно недоступен.')
      }
      return ctx.courseApplications.submit(input, ctx.req)
    },
  }),
}))
