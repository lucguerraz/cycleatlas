import type { NitroApp } from 'nitropack'
import { QueueEvents } from 'bullmq'

const processActivityEvents = new QueueEvents('processActivity', { connection: resolveConnection('queueevents') })

export default defineNitroPlugin((nitroApp: NitroApp) => {
  processActivityEvents.on('active', async (job) => {
    const athlete = await AthleteSchema.findOne({ jobs: job.jobId })
    if (!athlete) return

    nitroApp.io.to(athlete.stravaid + '').emit('active', { id: `${job.jobId}`, total: athlete.jobs })
  })

  processActivityEvents.on('completed', async (job) => {
    const athletePre = await AthleteSchema.findOne({ jobs: job.jobId })
    if (!athletePre) return

    const athlete = await AthleteSchema.findOneAndUpdate(
      { stravaid: athletePre.stravaid },
      { $pull: { jobs: job.jobId } },
      { returnDocument: 'after' }
    )

    nitroApp.io.to(athlete!.stravaid + '').emit('completed', { id: `${job.jobId}`, total: athlete!.jobs })
  })

  processActivityEvents.on('waiting', async (job) => {
    const athlete = await AthleteSchema.findOne({ jobs: job.jobId })
    if (!athlete) return

    nitroApp.io.to(athlete.stravaid + '').emit('waiting', { id: `${job.jobId}`, total: athlete.jobs })
  })
})

function resolveConnection(type) {
  const { redis } = useRuntimeConfig()
  const connection = {}
  if (redis) {
    for (const [key, value] of Object.entries(redis)) {
      const normalized = normalizeRedisConnectionEntry(key, value)
      if (normalized === void 0) {
        continue
      }
      connection[key] = normalized
    }
  }
  if (type === 'worker') {
    connection.maxRetriesPerRequest = null
  }
  return connection
}

function normalizeRedisConnectionEntry(key, value) {
  if (value === '' || value === void 0 || value === null) {
    return void 0
  }
  if (key === 'lazyConnect') {
    if (value === true || value === 'true') {
      return true
    }
    if (value === false || value === 'false') {
      return false
    }
    return void 0
  }
  if (key === 'port' || key === 'db' || key === 'connectTimeout') {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return value
    }
    if (typeof value === 'string' && value !== '') {
      const n = Number(value)
      if (!Number.isNaN(n)) {
        return n
      }
    }
    return void 0
  }
  return value
}
