import { useLocation, Link } from 'react-router-dom'
import { CheckCircle2, Ticket, Home } from 'lucide-react'

export default function BookingSuccessPage() {
  const { state } = useLocation()

  if (!state?.bookingCode) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
        <p style={{ color: '#64748b' }}>Không tìm thấy thông tin đặt vé.</p>
        <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Về trang chủ</Link>
      </div>
    )
  }

  const { bookingCode, ticket } = state

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', padding: '48px 40px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle2 size={36} style={{ color: '#16a34a' }} />
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Đặt vé thành công!</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px' }}>
          Mã vé của bạn đã được xác nhận. Vui lòng kiểm tra email để nhận vé.
        </p>

        <div style={{ background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>MÃ ĐẶT VÉ</div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '2px' }}>{bookingCode}</div>
        </div>

        {ticket && (
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', marginBottom: '28px', textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{ticket.name}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{ticket.location || 'Địa điểm đang cập nhật'}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            to="/tickets"
            style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#475569', textDecoration: 'none' }}
          >
            <Ticket size={15} /> Xem thêm vé
          </Link>
          <Link
            to="/"
            style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'white', textDecoration: 'none' }}
          >
            <Home size={15} /> Trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}