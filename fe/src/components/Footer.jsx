import { MessageCircle, Play, Send, MapPin, Phone, Mail, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <span style={{ fontSize: '1.5rem' }}>🎫</span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>TICKET PRO</span>
            </div>
            <p>
              Chuyên cung cấp vé sự kiện, concert, thể thao hàng đầu Việt Nam.
              Chúng tôi cam kết mang đến giá trị thực và trải nghiệm tuyệt vời nhất cho khách hàng.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><MessageCircle size={18} /></a>
              <a href="#" className="social-icon"><Play size={18} /></a>
              <a href="#" className="social-icon"><Send size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>LIÊN KẾT NHANH</h4>
            <ul>
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Sự kiện hot</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>DỊCH VỤ</h4>
            <ul>
              <li><a href="#">Vé Concert</a></li>
              <li><a href="#">Vé Bóng đá</a></li>
              <li><a href="#">Vé Xem kịch</a></li>
              <li><a href="#">Vé Festival</a></li>
              <li><a href="#">Hỗ trợ đổi trả</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>THÔNG TIN LIÊN HỆ</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>123 Đường Số 1, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>0901 234 567</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>support@ticketpro.vn</span>
            </div>
            <div className="footer-contact-item">
              <Globe size={16} />
              <span>www.ticketpro.vn</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 xxxx.com. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
