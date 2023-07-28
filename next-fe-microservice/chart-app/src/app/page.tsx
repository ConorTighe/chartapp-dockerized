"use client"
import styles from './page.module.css'
import { MultiSelect } from '@mantine/core';
import useChart from './hooks/chart/chart';

export default function Home() {

  const { compoundOptions, selectedCompounts, handleUpdateSelected, chartInfo } = useChart();

  return (
    <main className={styles.main}>
      <div className={styles.controlRow}>
        <div className={styles.info}>
          <span>
            Total participants: {chartInfo?.totalPaticpants}
          </span>
          <span>
            Age range of pool: {chartInfo?.ageRange.toString().replace(",", " - ")}
          </span>
        </div>
        <MultiSelect
          className={styles.dropdown}
          data={compoundOptions}
          value={selectedCompounts}
          onChange={handleUpdateSelected}
          label="Compounds"
          placeholder="Select results to display"
        />
      </div>
      <canvas id='myChart' />
    </main>
  )
}
