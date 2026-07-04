import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, SlidersHorizontal, ArrowLeft, Calendar, MapPin, Users, ArrowRight, Clock, ChevronDown, Loader2 } from 'lucide-react'
import { ticketService } from '../services/api'

// Countdown Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(targetDate).getTime() - now
      if (distance < 0) {
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="countdown-mini" style={{ 
      display: 'flex', gap: '4px', fontSize: '11px', fontWeight: '700',
      color: 'white', background: 'rgba(239, 68, 68, 0.95)', padding: '5px 10px',
      borderRadius: '6px', alignItems: 'center', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)',
      fontVariantNumeric: 'tabular-nums',
      width: '135px',
      justifyContent: 'center',
      whiteSpace: 'nowrap'
    }}>
      <Clock size={12} style={{ flexShrink: 0 }} />
      <span style={{ letterSpacing: '0.5px' }}>{timeLeft.days}d {timeLeft.hours.toString().padStart(2, '0')}h {timeLeft.minutes.toString().padStart(2, '0')}m {timeLeft.seconds.toString().padStart(2, '0')}s</span>
    </div>
  )
}

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

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Mới nhất')
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

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.name?.toLowerCase().includes(searchTerm.toLowerCase())
    // For now category might be missing in real DTO, so we handle null
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="tickets-page" style={{ background: '#f8fafc', paddingBottom: '80px' }}>
      {/* Premium Header */}
      <div style={{ background: 'var(--color-primary)', padding: '40px 0 100px', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px', transition: 'color 0.2s', textDecoration: 'none' }} className="hover-white">
                <ArrowLeft size={16} /> Quay lại trang chủ
              </Link>
              <h1 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-1px' }}>Khám phá sự kiện</h1>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>Tổng sự kiện</div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>{tickets.length}</div>
            </div>
          </div>
          
          <div style={{ position: 'relative', maxWidth: '700px' }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm concert, sự kiện, nghệ sĩ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '18px 24px 18px 56px', 
                borderRadius: '16px', 
                border: 'none',
                fontSize: '16px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                outline: 'none'
              }}
            />
            <Search size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px' }}>
        <div className="tickets-page-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          
          {/* Sidebar Filters */}
          <aside>
            <div style={{ 
              background: 'white', 
              padding: '32px', 
              borderRadius: '20px', 
              boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
              border: '1px solid #f1f5f9',
              position: 'sticky',
              top: '100px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '18px' }}>
                <Filter size={20} /> BỘ LỌC
              </div>

              <div style={{ marginBottom: '36px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1.5px', marginBottom: '16px', display: 'block', textTransform: 'uppercase' }}>DANH MỤC</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['All', 'Music', 'Sports', 'Theater', 'Festival'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px', 
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textAlign: 'left',
                        background: selectedCategory === cat ? 'var(--color-accent-light)' : 'transparent',
                        color: selectedCategory === cat ? 'var(--color-accent-hover)' : '#475569',
                        transition: 'all 0.2s',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {cat === 'All' ? 'Tất cả sự kiện' : cat}
                      {selectedCategory === cat && <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1.5px', marginBottom: '16px', display: 'block', textTransform: 'uppercase' }}>KHOẢNG GIÁ</label>
                <div style={{ padding: '0 10px' }}>
                  <input type="range" style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '12px', color: '#64748b', fontWeight: 600 }}>
                    <span>0đ</span>
                    <span>10.000.000đ</span>
                  </div>
                </div>
              </div>

              <button className="submit-btn" style={{ marginTop: '32px', padding: '14px', borderRadius: '12px', width: '100%' }}>
                ÁP DỤNG BỘ LỌC
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main>
            {/* Sorting Bar */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: 'white', 
              padding: '16px 24px', 
              borderRadius: '16px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              marginBottom: '24px',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ fontSize: '15px', color: '#64748b' }}>
                Hiển thị <strong>{filteredTickets.length}</strong> sự kiện phù hợp
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.8 }}>
                  <SlidersHorizontal size={16} /> Sắp xếp:
                </div>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ 
                      appearance: 'none',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      padding: '8px 36px 8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option>Mới nhất</option>
                    <option>Giá tăng dần</option>
                    <option>Giá giảm dần</option>
                    <option>Bán chạy nhất</option>
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-primary)' }} />
                </div>
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
              </div>
            ) : filteredTickets.length > 0 ? (
              <div className="ticket-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {filteredTickets.map(ticket => {
                  const stockAvailable = ticket.stockAvailable || 0
                  const stockTotal = ticket.stockInitial || 100
                  const soldPercent = Math.round(((stockTotal - stockAvailable) / stockTotal) * 100)
                  
                  return (
                    <div className="ticket-card" key={ticket.id} style={{ border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span className={`ticket-badge ${ticket.priceFlash ? 'sale' : 'new'}`} style={{ position: 'static', padding: '4px 10px', fontSize: '11px' }}>
                          {ticket.priceFlash ? 'Hot Sale' : 'Mới'}
                        </span>
                        {/* {ticket.priceFlash && <CountdownTimer targetDate={new Date().getTime() + 86400000} />} Mock countdown */}
                      </div>
                      
                      <div className="ticket-image-wrapper" style={{ height: '220px', flexShrink: 0 }}>
                        <img 
                          src={ticket.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop'} 
                          alt={ticket.name} 
                          className="ticket-image" 
                          style={{ transition: 'transform 0.5s ease', width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>

                      <div className="ticket-info" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 className="ticket-name" style={{ fontSize: '16px', fontWeight: 800, height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '16px', lineHeight: '1.5' }}>{ticket.name}</h3>
                        <div className="ticket-meta" style={{ marginBottom: '20px', gap: '16px', minHeight: '20px' }}>
                          <span className="ticket-meta-item" style={{ fontSize: '13px' }}><Calendar size={14} /> {formatDate(ticket.startTime)}</span>
                          <span className="ticket-meta-item" style={{ fontSize: '13px' }}><MapPin size={14} /> {ticket.location || 'Địa điểm đang cập nhật'}</span>
                        </div>

                        {/* Stock Bar */}
                        <div style={{ marginBottom: '24px', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                            <span style={{ color: '#64748b' }}>Đã bán {stockTotal - stockAvailable} vé</span>
                            <span style={{ color: 'var(--color-primary)' }}>{soldPercent}%</span>
                          </div>
                          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${soldPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))', borderRadius: '3px' }} />
                          </div>
                        </div>

                        <div className="ticket-prices" style={{ height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '24px' }}>
                          {ticket.priceFlash ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span className="ticket-price-original" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(ticket.priceOriginal)}</span>
                              <span className="ticket-price-flash" style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-hot)' }}>{formatPrice(ticket.priceFlash)}</span>
                            </div>
                          ) : (
                            <span className="ticket-price-only" style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)' }}>{formatPrice(ticket.priceOriginal)}</span>
                          )}
                        </div>

                        <Link to={`/ticket/${ticket.id}`} className="ticket-cta" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto', textDecoration: 'none' }}>
                          MUA VÉ NGAY <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0', background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Search size={32} style={{ color: '#94a3b8' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>Không tìm thấy sự kiện</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Anh vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm nhé!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
