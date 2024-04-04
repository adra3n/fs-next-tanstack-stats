import { InfluencerCard } from '@/components/influencer-card'
import styles from '@/styles/home.module.css'
import RootLayout from './layout'

export default function Home() {
  return (
    <RootLayout>
      <main className={styles.container}>
        <InfluencerCard />
      </main>
    </RootLayout>
  )
}
