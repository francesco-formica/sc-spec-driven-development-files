import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const ailments = sqliteTable('ailments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
})

export const therapies = sqliteTable('therapies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
})

export const agents = sqliteTable('agents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  model: text('model').notNull(),
  currentAilmentId: integer('current_ailment_id').references(() => ailments.id),
})

export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentId: integer('agent_id').notNull().references(() => agents.id),
  therapyId: integer('therapy_id').notNull().references(() => therapies.id),
  scheduledAt: text('scheduled_at').notNull(),
  notes: text('notes'),
})
