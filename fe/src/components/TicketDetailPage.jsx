import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowLeft, Clock, Share2, Heart, ShieldCheck, Ticket, Info, Map as MapIcon, Star, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react'
import { ticketService } from '../services/api'

function formatPrice(price) {
  if (!price) return 'Liên hệ'
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

function formatDate(dateStr) {
  if (!dateStr) return 'Đang cập nhật'
  try {
    const d = new Date(dateStr)
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`
  } catch (e) {
    return dateStr
  }
}

export default function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('Standard')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Since getTicketById might return basic info, we reuse getActiveTickets and find the item
        // or call the specific endpoint if implemented correctly.
        // For now, let's try specific endpoint.
        const data = await ticketService.getTicketById(id)
        setTicket(data)
      } catch (error) {
        console.error('Failed to fetch ticket detail:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTicket()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
        <Loader2 className="animate-spin" size={48} color="var(--color-primary)" />
      </div>
    )
  }

  if (!ticket) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
        <h2>Không tìm thấy sự kiện</h2>
        <Link to="/tickets" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Quay lại danh sách</Link>
      </div>
    )
  }

  const priceToUse = ticket.priceFlash || ticket.priceOriginal || 0

  return (
    <div className="ticket-detail-page" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Super Compact Breadcrumbs */}
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trang chủ</Link>
          <ChevronRight size={10} />
          <Link to="/tickets" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sự kiện</Link>
          <ChevronRight size={10} />
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{ticket.name}</span>
        </div>
      </div>

      {/* Ultra Compact Hero Section */}
      <div style={{ position: 'relative', height: '240px', background: '#0f172a' }}>
        <img 
          src={ticket.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop'} 
          alt={ticket.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f8fafc 0%, transparent 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', transform: 'translateY(-20px)' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span className={`ticket-badge ${ticket.priceFlash ? 'sale' : 'new'}`} style={{ position: 'static', padding: '2px 8px', fontSize: '10px' }}>
                {ticket.priceFlash ? 'Sale' : 'Mới'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', color: 'white', fontSize: '10px', fontWeight: 700, backdropFilter: 'blur(4px)', textTransform: 'uppercase' }}>Sự kiện</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '12px', lineHeight: '1.1', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{ticket.name}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                <Calendar size={13} className="text-accent" /> {formatDate(ticket.startTime)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                <Clock size={13} className="text-accent" /> {ticket.startTime ? new Date(ticket.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '19:00'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                <MapPin size={13} className="text-accent" /> {ticket.location || 'Địa điểm đang cập nhật'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10, paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'start' }}>
          
          {/* Content Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <section style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 15px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Info size={16} />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Giới thiệu sự kiện</h2>
              </div>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14.5px', marginBottom: '20px' }}>{ticket.description}</p>
              
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '13px', color: '#64748b' }}>Đơn vị tổ chức</h3>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '14px' }}>TicketPro Partner</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {['Event', 'Concert', 'Live'].map(tag => (
                    <span key={tag} style={{ background: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', color: '#64748b', border: '1px solid #e2e8f0', fontWeight: 600 }}>#{tag}</span>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 15px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-hover)' }}>
                  <MapIcon size={16} />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Sơ đồ chỗ ngồi</h2>
              </div>
              <div style={{ width: '100%', height: '280px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #e2e8f0' }}>
                <div style={{ textAlign: 'center' }}>
                  <MapIcon size={32} style={{ marginBottom: '8px', color: '#cbd5e1' }} />
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>Sơ đồ chỗ ngồi đang được cập nhật...</p>
                </div>
              </div>
            </section>

            <section style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 15px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Lợi ích khi đặt tại TicketPro</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[
                  { title: 'Chính hãng', icon: <CheckCircle2 size={16} className="text-success" /> },
                  { title: 'Bảo mật', icon: <ShieldCheck size={16} className="text-primary" /> },
                  { title: 'Hỗ trợ 24/7', icon: <Users size={16} className="text-accent" /> },
                  { title: 'Nhận vé ngay', icon: <Ticket size={16} className="text-hot" /> }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 8px', background: '#f8fafc', borderRadius: '10px', textAlign: 'center' }}>
                    <div>{item.icon}</div>
                    <h4 style={{ fontWeight: 700, fontSize: '11px', color: '#475569' }}>{item.title}</h4>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar - Sticky */}
          <aside style={{ position: 'sticky', top: '80px' }}>
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
              <div style={{ background: 'var(--color-primary)', padding: '20px', color: 'white' }}>
                <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '2px' }}>Giá vé từ</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900 }}>{formatPrice(priceToUse)}</span>
                  {ticket.priceFlash && <span style={{ fontSize: '13px', opacity: 0.6, textDecoration: 'line-through' }}>{formatPrice(ticket.priceOriginal)}</span>}
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '10px', display: 'block' }}>CHỌN HẠNG VÉ</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Standard', 'VIP', 'Super VIP'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setSelectedType(type)}
                        style={{ 
                          padding: '10px 14px', 
                          borderRadius: '8px', 
                          border: '1px solid',
                          borderColor: selectedType === type ? 'var(--color-primary)' : '#e2e8f0',
                          background: selectedType === type ? '#f0f9ff' : 'white',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '12.5px', color: selectedType === type ? 'var(--color-primary)' : '#1e293b' }}>{type}</div>
                          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Còn vé</div>
                        </div>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: selectedType === type ? 'var(--color-primary)' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {selectedType === type && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', marginBottom: '10px', display: 'block' }}>SỐ LƯỢNG</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '8px 14px', borderRadius: '8px', justifyContent: 'space-between', border: '1px solid #f1f5f9' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 900, cursor: 'pointer' }}>-</button>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 900, cursor: 'pointer' }}>+</button>
                  </div>
                </div>

                <div style={{ borderTop: '2px dashed #f8fafc', paddingTop: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', color: '#64748b' }}>
                    <span>Tạm tính</span>
                    <span>{formatPrice(priceToUse * quantity)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 900 }}>
                    <span>Tổng cộng</span>
                    <span style={{ color: 'var(--color-primary)' }}>{formatPrice(priceToUse * quantity)}</span>
                  </div>
                </div>

                <button
                  className="submit-btn"
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}
                  onClick={() => navigate('/cart', { state: { ticket, quantity } })}
                >
                  ĐẶT VÉ NGAY
                </button>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #f1f5f9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>
                    <Share2 size={12} /> Chia sẻ
                  </button>
                  <button style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #f1f5f9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>
                    <Heart size={12} /> Lưu lại
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
