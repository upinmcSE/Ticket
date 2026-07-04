import { ShieldCheck, CreditCard, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="hero-badge">
          🔥 Nền tảng đặt vé #1 Việt Nam
        </div>
        <h1>
          ĐẶT VÉ SỰ KIỆN<br />
          <span>NHANH CHÓNG · AN TOÀN</span>
        </h1>
        <div className="hero-features">
          <div className="hero-feature">
            <ShieldCheck size={18} />
            Vé chính hãng 100%
          </div>
          <div className="hero-feature">
            <CreditCard size={18} />
            Thanh toán bảo mật
          </div>
          <div className="hero-feature">
            <Zap size={18} />
            Nhận vé tức thì
          </div>
        </div>
      </div>
    </section>
  )
}
