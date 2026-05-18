import type { NitroApp } from 'nitropack'
import { QueueEvents } from 'bullmq'

const processActivityEvents = new QueueEvents('processActivity')

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
