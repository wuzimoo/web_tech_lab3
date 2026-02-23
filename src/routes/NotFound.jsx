import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setDocumentTitle } from '../utils/title.js'

function NotFound() {
  useEffect(() => {
    setDocumentTitle('Not found')
  }, [])

  return (
    <section className="panel center">
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <Link className="btn" to="/">
        На головну
      </Link>
    </section>
  )
}

export default NotFound
