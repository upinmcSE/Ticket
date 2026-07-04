import { Phone } from 'lucide-react'

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container header-inner">
        <a href="/" className="logo">
          <div className="logo-icon">🎫</div>
          <div className="logo-text">
            <span className="logo-name">TICKET PRO</span>
            <span className="logo-tagline">Đặt Vé · Giá Trị Thực</span>
          </div>
        </a>

        <nav>
          <ul className="nav-list">
            <li><a href="#" className="nav-link active">Trang Chủ</a></li>
            <li><a href="#events" className="nav-link">Sự Kiện</a></li>
            <li><a href="#tickets" className="nav-link">Vé Hot</a></li>
            <li><a href="#about" className="nav-link">Về Chúng Tôi</a></li>
            <li><a href="#contact" className="nav-link">Liên Hệ</a></li>
          </ul>
        </nav>

        <a href="tel:0901234567" className="header-hotline" id="hotline-btn">
          <Phone size={16} />
          0901 234 567
        </a>
      </div>
    </header>
  )
}
