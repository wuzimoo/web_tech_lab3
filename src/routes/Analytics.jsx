import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import StatCard from '../components/StatCard.jsx'
import { fetchRegistrations } from '../api/analyticsApi.js'
import {
  aggregateByDate,
  applyMinCount,
  applyRange,
  calculateStats,
} from '../utils/aggregate.js'
import { debounce } from '../utils/debounce.js'
import { setDocumentTitle } from '../utils/title.js'

const RANGE_OPTIONS = [7, 14, 30]

function Analytics() {
  const [registrations, setRegistrations] = useState([])
  const [range, setRange] = useState(30)
  const [minCount, setMinCount] = useState(0)
  const [minCountInput, setMinCountInput] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setDocumentTitle('Analytics')
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadRegistrations() {
      setStatus('loading')
      setError('')
      try {
        const data = await fetchRegistrations()
        if (cancelled) return
        setRegistrations(data)
        setStatus('success')
      } catch (err) {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      }
    }

    loadRegistrations()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const aggregated = useMemo(
    () => aggregateByDate(registrations),
    [registrations],
  )

  const rangeData = useMemo(() => applyRange(aggregated, range), [aggregated, range])
  const filteredData = useMemo(
    () => applyMinCount(rangeData, minCount),
    [rangeData, minCount],
  )
  const stats = useMemo(() => calculateStats(filteredData), [filteredData])

  const debouncedMinUpdate = useMemo(
    () =>
      debounce((value) => {
        const safeValue = Number.isNaN(value) ? 0 : Math.max(0, value)
        setMinCount(safeValue)
      }, 250),
    [],
  )

  useEffect(() => () => debouncedMinUpdate.cancel(), [debouncedMinUpdate])

  const handleRangeChange = (event) => {
    setRange(Number(event.target.value))
  }

  const handleMinCountChange = (event) => {
    const value = Number(event.target.value)
    setMinCountInput(value)
    debouncedMinUpdate(value)
  }

  const handleRetry = () => {
    setReloadKey((key) => key + 1)
  }

  const averageValue = stats.average ? stats.average.toFixed(1) : '0.0'
  const maxDayLabel = stats.maxDay
    ? `${stats.maxDay.date} (${stats.maxDay.count})`
    : 'n/a'
  const minDayLabel = stats.minDay
    ? `${stats.minDay.date} (${stats.minDay.count})`
    : 'n/a'

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h1>Analytics</h1>
          <p className="muted">Кількість реєстрацій за останні 30 днів</p>
        </div>
      </div>

      <div className="filters-row">
        <label>
          Range
          <select value={range} onChange={handleRangeChange}>
            {RANGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} days
              </option>
            ))}
          </select>
        </label>
        <label>
          Min count
          <input
            type="number"
            min="0"
            value={minCountInput}
            onChange={handleMinCountChange}
          />
        </label>
      </div>

      {status === 'loading' ? <Loader label="Loading analytics" /> : null}

      {status === 'error' ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : null}

      {status === 'success' ? (
        <>
          {filteredData.length ? (
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={filteredData} margin={{ top: 16, right: 32, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Registrations"
                    stroke="#2563eb"
                    fill="#bfdbfe"
                    fillOpacity={0.8}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="muted center">
              Немає даних під обрані фільтри. Налаштуй range/min count.
            </p>
          )}

          <div className="stats-grid">
            <StatCard
              label="Total registrations"
              value={stats.total}
              hint={`за ${range} днів після фільтрування`}
            />
            <StatCard label="Average per day" value={averageValue} />
            <StatCard label="Max day" value={maxDayLabel} />
            <StatCard label="Min day" value={minDayLabel} />
          </div>
        </>
      ) : null}
    </section>
  )
}

export default Analytics
