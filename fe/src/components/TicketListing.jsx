import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from 'lucide-react'
import { ticketService } from '../services/api'

function formatPrice(price) {
  if (!price) return 'Liên hệ'
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

function formatDate(dateStr) {
  if (!dateStr) return 'Đang cập nhật'
  // Handle ISO string from backend
  try {
    const d = new Date(dateStr)
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`
  } catch (e) {
    return dateStr
  }
}

function TicketCard({ ticket }) {
  const stockAvailable = ticket.stockAvailable || 0
  const stockTotal = ticket.stockInitial || 100
  const stockPercent = (stockAvailable / stockTotal) * 100
  const isLow = stockPercent < 20

  return (
    <div className="ticket-card" id={`ticket-${ticket.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <span className={`ticket-badge ${ticket.priceFlash ? 'sale' : 'new'}`}>
        {ticket.priceFlash ? 'Giảm giá' : 'Mới'}
      </span>
      <div className="ticket-image-wrapper" style={{ height: '200px', flexShrink: 0 }}>
        <img 
          src={ticket.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop'} 
          alt={ticket.name} 
          className="ticket-image" 
          loading="lazy" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div className="ticket-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <h3 className="ticket-name" style={{ height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '12px', fontSize: '15px', fontWeight: 700 }}>{ticket.name}</h3>
        
        <div className="ticket-meta" style={{ marginBottom: '12px', minHeight: '18px' }}>
          <span className="ticket-meta-item" style={{ fontSize: '12px' }}>
            <Calendar size={12} /> {formatDate(ticket.startTime)}
          </span>
          <span className="ticket-meta-item" style={{ fontSize: '12px', marginLeft: '10px' }}>
            <MapPin size={12} /> {ticket.location || 'Địa điểm đang cập nhật'}
          </span>
        </div>

        <div className={`ticket-stock ${isLow ? 'low' : ''}`} style={{ marginBottom: '16px', fontSize: '12px' }}>
          <Users size={12} /> Còn {stockAvailable.toLocaleString()} vé
        </div>

        <div className="ticket-prices" style={{ height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '16px' }}>
          {ticket.priceFlash ? (
            <>
              <span className="ticket-price-original" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(ticket.priceOriginal)}</span>
              <span className="ticket-price-flash" style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-hot)' }}>{formatPrice(ticket.priceFlash)}</span>
            </>
          ) : (
            <span className="ticket-price-only" style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-primary)' }}>{formatPrice(ticket.priceOriginal)}</span>
          )}
        </div>

        <Link to={`/ticket/${ticket.id}`} className="ticket-cta" style={{ marginTop: 'auto', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
          Xem Chi Tiết <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default function TicketListing() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getActiveTickets()
        setTickets(data || [])
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
      </div>
    )
  }

  return (
    <section className="ticket-listing" id="tickets">
      <div className="container">
        <div className="ticket-listing-header">
          <h2 className="section-title">SỰ KIỆN NỔI BẬT</h2>
          <Link to="/tickets" className="view-all-link">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        
        {tickets.length > 0 ? (
          <div className="ticket-grid">
            {tickets.map(t => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <p style={{ color: '#64748b' }}>Hiện chưa có sự kiện nào đang diễn ra.</p>
          </div>
        )}
      </div>
    </section>
  )
}
