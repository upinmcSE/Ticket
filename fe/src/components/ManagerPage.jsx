import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ListOrdered, Ticket, CheckCircle2, XCircle, Trash2, RefreshCw, ChevronLeft, AlertCircle } from 'lucide-react'
import { managerService } from '../services/api'

// ─── helpers ────────────────────────────────────────────────────────────────

function formatPrice(p) {
  if (!p) return '—'
  return new Intl.NumberFormat('vi-VN').format(p) + 'đ'
}

function formatDT(s) {
  if (!s) return '—'
  return new Date(s).toLocaleString('vi-VN')
}

function toApiDateTime(htmlVal) {
  // "2026-05-05T20:00" → "2026-05-05 20:00:00"
  return htmlVal ? htmlVal.replace('T', ' ') + ':00' : null
}

const STATUS_MAP = {
  0: { label: 'Chờ xử lý', color: '#f59e0b' },
  1: { label: 'Thành công', color: '#10b981' },
  2: { label: 'Đã hủy',    color: '#94a3b8' },
  3: { label: 'Hết hạn',   color: '#64748b' },
  4: { label: 'Hoàn tiền', color: '#8b5cf6' },
}

const CURRENT_MONTH = new Date().toISOString().slice(0, 7).replace('-', '')

// ─── sub-components ──────────────────────────────────────────────────────────

function Toast({ msg, type }) {
  if (!msg) return null
  const bg = type === 'success' ? '#dcfce7' : '#fef2f2'
  const color = type === 'success' ? '#16a34a' : '#dc2626'
  const border = type === 'success' ? '#bbf7d0' : '#fecaca'
  return (
    <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '12px 20px', color, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      {msg}
    </div>
  )
}

// ─── Tab 1: Tạo sự kiện ──────────────────────────────────────────────────────

function CreateEventTab({ onToast }) {
  const [form, setForm] = useState({
    name: '', description: '', startTime: '', endTime: '',
    detailName: 'Standard', stock: '', priceOriginal: '', priceFlash: '',
    saleStartTime: '', saleEndTime: '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await managerService.createEvent({
        ticket: {
          name: form.name,
          description: form.description,
          startTime: toApiDateTime(form.startTime),
          endTime: toApiDateTime(form.endTime),
        },
        detail: {
          name: form.detailName,
          stockInitial: Number(form.stock),
          stockAvailable: Number(form.stock),
          priceOriginal: Number(form.priceOriginal),
          priceFlash: form.priceFlash ? Number(form.priceFlash) : null,
          saleStartTime: toApiDateTime(form.saleStartTime) || null,
          saleEndTime: toApiDateTime(form.saleEndTime) || null,
        },
      })
      onToast('Tạo sự kiện thành công!', 'success')
      setForm({ name: '', description: '', startTime: '', endTime: '', detailName: 'Standard', stock: '', priceOriginal: '', priceFlash: '', saleStartTime: '', saleEndTime: '' })
    } catch (err) {
      onToast('Tạo sự kiện thất bại: ' + (err.response?.data?.message || err.message), 'error')
    } finally {
      setLoading(false)
    }
  }

  const field = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }
  const label = { fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }
  const section = { background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', padding: 24, marginBottom: 16 }

  return (
    <form onSubmit={handleSubmit}>
      <div style={section}>
        <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: 'var(--color-primary)' }}>Thông tin sự kiện</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
          <div>
            <label style={label}>TÊN SỰ KIỆN *</label>
            <input style={field} value={form.name} onChange={set('name')} required placeholder="VD: Show Anh Trai Say Hi 2026" />
          </div>
          <div>
            <label style={label}>MÔ TẢ</label>
            <textarea style={{ ...field, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={set('description')} placeholder="Mô tả sự kiện..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={label}>THỜI GIAN BẮT ĐẦU *</label>
              <input style={field} type="datetime-local" value={form.startTime} onChange={set('startTime')} required />
            </div>
            <div>
              <label style={label}>THỜI GIAN KẾT THÚC *</label>
              <input style={field} type="datetime-local" value={form.endTime} onChange={set('endTime')} required />
            </div>
          </div>
        </div>
      </div>

      <div style={section}>
        <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: 'var(--color-primary)' }}>Thông tin vé</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={label}>TÊN LOẠI VÉ *</label>
            <input style={field} value={form.detailName} onChange={set('detailName')} required placeholder="Standard / VIP..." />
          </div>
          <div>
            <label style={label}>SỐ LƯỢNG VÉ *</label>
            <input style={field} type="number" min={1} value={form.stock} onChange={set('stock')} required placeholder="100" />
          </div>
          <div>
            <label style={label}>GIÁ GỐC (đ) *</label>
            <input style={field} type="number" min={1} value={form.priceOriginal} onChange={set('priceOriginal')} required placeholder="1000000" />
          </div>
          <div>
            <label style={label}>GIÁ FLASH SALE (đ)</label>
            <input style={field} type="number" min={0} value={form.priceFlash} onChange={set('priceFlash')} placeholder="700000 (để trống nếu không có)" />
          </div>
          <div>
            <label style={label}>FLASH SALE BẮT ĐẦU</label>
            <input style={field} type="datetime-local" value={form.saleStartTime} onChange={set('saleStartTime')} />
          </div>
          <div>
            <label style={label}>FLASH SALE KẾT THÚC</label>
            <input style={field} type="datetime-local" value={form.saleEndTime} onChange={set('saleEndTime')} />
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn" style={{ padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Plus size={18} /> {loading ? 'Đang tạo...' : 'Tạo sự kiện'}
      </button>
    </form>
  )
}

// ─── Tab 2a: Đơn hàng V1 (load toàn bộ — không phân trang) ──────────────────

function OrdersTabV1({ onToast }) {
  const [yearMonth, setYearMonth] = useState(CURRENT_MONTH)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [cancelling, setCancelling] = useState(null)
  const [elapsed, setElapsed] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setElapsed(null)
    const t0 = performance.now()
    try {
      const data = await managerService.getOrdersAll(yearMonth)
      setOrders(data || [])
      setElapsed(Math.round(performance.now() - t0))
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [yearMonth])

  useEffect(() => { load() }, [load])

  const handleCancel = async (order) => {
    setCancelling(order.orderNumber)
    try {
      await managerService.cancelOrder({ userId: order.userId, orderNumber: order.orderNumber })
      onToast('Hủy đơn thành công: ' + order.orderNumber, 'success')
      load()
    } catch {
      onToast('Hủy đơn thất bại', 'error')
    } finally {
      setCancelling(null)
    }
  }

  return (
    <div>


      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }}>THÁNG (yyyyMM)</label>
          <input
            value={yearMonth}
            onChange={e => setYearMonth(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, width: 120 }}
            placeholder="202605"
          />
        </div>
        <button onClick={load} style={{ marginTop: 20, padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, color: '#475569' }}>
          <RefreshCw size={14} /> Tải lại
        </button>
        <span style={{ marginTop: 20, fontSize: 13, color: '#94a3b8' }}>
          {orders.length} đơn {elapsed != null && <span style={{ color: '#f59e0b', fontWeight: 700 }}>({elapsed}ms)</span>}
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải toàn bộ...</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không có đơn hàng nào</div>
      ) : (
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['#', 'Mã đơn hàng', 'Ticket ID', 'User ID', 'SL', 'Tổng tiền', 'Trạng thái', 'Thời gian', ''].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => {
                const st = STATUS_MAP[o.orderStatus] || STATUS_MAP[0]
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{i + 1}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: 'monospace', fontSize: 12 }}>{o.orderNumber}</td>
                    <td style={{ padding: '12px 14px' }}>{o.ticketId}</td>
                    <td style={{ padding: '12px 14px' }}>{o.userId}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>{o.quantity}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-primary)' }}>{formatPrice(o.totalAmount)}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: st.color + '20', color: st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#64748b', fontSize: 12 }}>{formatDT(o.orderDate)}</td>
                    <td style={{ padding: '12px 14px' }}>
                      {o.orderStatus === 0 && (
                        <button
                          onClick={() => handleCancel(o)}
                          disabled={cancelling === o.orderNumber}
                          style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <XCircle size={12} /> {cancelling === o.orderNumber ? '...' : 'Hủy'}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Tab 2b: Đơn hàng V2 (cursor-based pagination) ───────────────────────────

function OrdersTab({ onToast }) {
  const [yearMonth, setYearMonth] = useState(CURRENT_MONTH)
  const [orders, setOrders] = useState([])
  const [cursor, setCursor] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [cancelling, setCancelling] = useState(null)

  const loadFirst = useCallback(async () => {
    setLoading(true)
    setOrders([])
    setCursor(0)
    setHasMore(false)
    try {
      const data = await managerService.getOrders(yearMonth, 0)
      setOrders(data?.items || [])
      setCursor(data?.nextCursor || 0)
      setHasMore(data?.hasMore || false)
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [yearMonth])

  useEffect(() => { loadFirst() }, [loadFirst])

  const loadMore = async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)
    try {
      const data = await managerService.getOrders(yearMonth, cursor)
      setOrders(prev => [...prev, ...(data?.items || [])])
      setCursor(data?.nextCursor || 0)
      setHasMore(data?.hasMore || false)
    } catch {
      onToast('Tải thêm thất bại', 'error')
    } finally {
      setLoadingMore(false)
    }
  }

  const handleCancel = async (order) => {
    setCancelling(order.orderNumber)
    try {
      await managerService.cancelOrder({ userId: order.userId, orderNumber: order.orderNumber })
      onToast('Hủy đơn thành công: ' + order.orderNumber, 'success')
      loadFirst()
    } catch (err) {
      onToast('Hủy đơn thất bại', 'error')
    } finally {
      setCancelling(null)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }}>THÁNG (yyyyMM)</label>
          <input
            value={yearMonth}
            onChange={e => setYearMonth(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, width: 120 }}
            placeholder="202605"
          />
        </div>
        <button onClick={loadFirst} style={{ marginTop: 20, padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, color: '#475569' }}>
          <RefreshCw size={14} /> Tải lại
        </button>
        <span style={{ marginTop: 20, fontSize: 13, color: '#94a3b8' }}>
          {orders.length}{hasMore ? '+' : ''} đơn hàng (tháng {yearMonth})
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải...</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không có đơn hàng nào</div>
      ) : (
        <>
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                  {['#', 'Mã đơn hàng', 'Ticket ID', 'User ID', 'SL', 'Tổng tiền', 'Trạng thái', 'Thời gian', ''].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => {
                  const st = STATUS_MAP[o.orderStatus] || STATUS_MAP[0]
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{i + 1}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: 'monospace', fontSize: 12 }}>{o.orderNumber}</td>
                      <td style={{ padding: '12px 14px' }}>{o.ticketId}</td>
                      <td style={{ padding: '12px 14px' }}>{o.userId}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>{o.quantity}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-primary)' }}>{formatPrice(o.totalAmount)}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: st.color + '20', color: st.color }}>
                          {st.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b', fontSize: 12 }}>{formatDT(o.orderDate)}</td>
                      <td style={{ padding: '12px 14px' }}>
                        {o.orderStatus === 0 && (
                          <button
                            onClick={() => handleCancel(o)}
                            disabled={cancelling === o.orderNumber}
                            style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                          >
                            <XCircle size={12} /> {cancelling === o.orderNumber ? '...' : 'Hủy'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {hasMore ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <button
                onClick={loadMore}
                disabled={loadingMore}
                style={{ padding: '10px 32px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: loadingMore ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 13, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <RefreshCw size={13} style={{ animation: loadingMore ? 'spin 1s linear infinite' : 'none' }} />
                {loadingMore ? 'Đang tải...' : 'Tải thêm 50 đơn'}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 16, color: '#94a3b8', fontSize: 12 }}>
              Đã hiển thị tất cả {orders.length} đơn hàng
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── Tab 3: Danh sách vé ─────────────────────────────────────────────────────

function TicketsTab({ onToast }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [acting, setActing] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      setTickets(await managerService.getAllTickets() || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const act = async (fn, id, msg) => {
    setActing(id)
    try {
      await fn(id)
      onToast(msg, 'success')
      load()
    } catch {
      onToast('Thao tác thất bại', 'error')
    } finally {
      setActing(null)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={load} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, color: '#475569' }}>
          <RefreshCw size={14} /> Tải lại
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['ID', 'Tên sự kiện', 'Còn vé / Tổng', 'Giá', 'Trạng thái', 'Thao tác'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 14px', color: '#94a3b8', fontWeight: 700 }}>{t.id}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.startTime?.slice(0, 10)}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontWeight: 800, color: t.stockAvailable === 0 ? '#ef4444' : 'var(--color-primary)' }}>
                      {t.stockAvailable}
                    </span>
                    <span style={{ color: '#94a3b8' }}> / {t.stockInitial}</span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700 }}>{formatPrice(t.priceFlash || t.priceOriginal)}</div>
                    {t.priceFlash && <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(t.priceOriginal)}</div>}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: t.status === 1 ? '#dcfce7' : '#f1f5f9', color: t.status === 1 ? '#16a34a' : '#64748b' }}>
                      {t.status === 1 ? 'Đang bán' : 'Tạm ngừng'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {t.status === 1 ? (
                        <button onClick={() => act(managerService.deactivateTicket, t.id, `Đã tạm ngừng: ${t.name}`)} disabled={acting === t.id}
                          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #fde68a', background: '#fefce8', color: '#92400e', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                          Ngừng
                        </button>
                      ) : (
                        <button onClick={() => act(managerService.activateTicket, t.id, `Đã kích hoạt: ${t.name}`)} disabled={acting === t.id}
                          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #bbf7d0', background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                          Kích hoạt
                        </button>
                      )}
                      <button onClick={() => act(managerService.deleteTicket, t.id, `Đã xóa: ${t.name}`)} disabled={acting === t.id}
                        style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Trash2 size={11} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Main ManagerPage ─────────────────────────────────────────────────────────

const TABS = [
  { key: 'create',    label: 'Tạo sự kiện',   icon: <Plus size={15} /> },
  { key: 'orders_v1', label: 'Đơn hàng V1',   icon: <ListOrdered size={15} /> },
  { key: 'orders_v2', label: 'Đơn hàng V2',   icon: <CheckCircle2 size={15} /> },
  { key: 'tickets',   label: 'Danh sách vé',  icon: <Ticket size={15} /> },
]

export default function ManagerPage() {
  const [tab, setTab] = useState('create')
  const [toast, setToast] = useState({ msg: '', type: '' })

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Header */}
      <div style={{ background: 'var(--color-primary)', padding: '16px 0', marginBottom: 0 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Hệ thống quản lý</div>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 900, margin: 0 }}>TicketPro Manager</h1>
          </div>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            <ChevronLeft size={14} /> Về trang chủ
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700,
                color: tab === t.key ? 'var(--color-primary)' : '#64748b',
                borderBottom: tab === t.key ? '2px solid var(--color-primary)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        {tab === 'create'    && <CreateEventTab onToast={showToast} />}
        {tab === 'orders_v1' && <OrdersTabV1   onToast={showToast} />}
        {tab === 'orders_v2' && <OrdersTab     onToast={showToast} />}
        {tab === 'tickets'   && <TicketsTab    onToast={showToast} />}
      </div>
    </div>
  )
}