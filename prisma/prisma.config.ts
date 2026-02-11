export default {
  datasources: {
    db: {
      url: process.env.POSTGRES_URL, // DO NOT UNCOMMENT THIS! only use local DB! process.env.VERCEL_POSTGRES_URL || process.env.POSTGRES_URL!,
    },
  },
}
