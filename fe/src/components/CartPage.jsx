import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Ticket, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react'
import { ticketService } from '../services/api'

function formatPrice(price) {
  if (!price) return 'Liên hệ'
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function CartPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!state?.ticket) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
        <p style={{ color: '#64748b' }}>Không có vé nào trong giỏ hàng.</p>
        <Link to="/tickets" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Xem sự kiện</Link>
      </div>
    )
  }

  const { ticket, quantity } = state
  const priceToUse = ticket.priceFlash || ticket.priceOriginal || 0
  const total = priceToUse * quantity

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await ticketService.createBooking({ ticketId: ticket.id, quantity })
      if (!result.success) {
        setError(result.message || 'Đặt vé thất bại. Vui lòng thử lại.')
        setLoading(false)
        return
      }
      navigate('/booking-success', { state: { bookingCode: result.placeOrderTaskId, ticket } })
    } catch {
      setError('Đặt vé thất bại. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trang chủ</Link>
          <ChevronRight size={10} />
          <Link to="/tickets" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sự kiện</Link>
          <ChevronRight size={10} />
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Giỏ hàng</span>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '680px', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>Xác nhận đặt vé</h1>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 15px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
            <img
              src={ticket.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=120&fit=crop'}
              alt={ticket.name}
              style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>{ticket.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>{ticket.location || 'Địa điểm đang cập nhật'}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{ticket.startTime ? new Date(ticket.startTime).toLocaleDateString('vi-VN') : ''}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
              <span>Đơn giá</span>
              <span>{formatPrice(priceToUse)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
              <span>Số lượng</span>
              <span>{quantity} vé</span>
            </div>
            <div style={{ borderTop: '2px dashed #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '17px' }}>
              <span>Tổng cộng</span>
              <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', fontSize: '12px', color: '#64748b' }}>
          <ShieldCheck size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span>Thanh toán an toàn, mã vé được gửi qua email ngay sau khi xác nhận.</span>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <button
          className="submit-btn"
          style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Ticket size={18} />}
          {loading ? 'Đang xử lý...' : 'XÁC NHẬN THANH TOÁN'}
        </button>
      </div>
    </div>
  )
}