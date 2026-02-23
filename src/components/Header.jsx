import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/analytics', label: 'Analytics' },
]

function Header() {
  return (
    <header className="site-header">
      <div className="logo-block">
        <span className="logo-dot" aria-hidden="true" />
        <div>
          <p className="logo-title">Web Tech Lab 3</p>
          <p className="logo-subtitle">Events dashboard</p>
        </div>
      </div>
      <nav className="site-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
