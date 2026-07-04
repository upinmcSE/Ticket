import { CheckCircle2, Users, Trophy, HeartHandshake } from 'lucide-react'

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="about">
      <div className="container">
        <div className="why-grid">
          <div className="why-image-wrapper">
            {/* Using a placeholder-like styled div for the image content from reference */}
            <div style={{ 
              position: 'relative', 
              borderRadius: 'var(--radius-xl)', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              height: '400px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop" 
                alt="Concert Support" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: 'var(--space-8)',
                textAlign: 'center'
              }}>
                <div className="stat-number">10+</div>
                <div className="stat-label">NĂM KINH NGHIỆM</div>
              </div>
            </div>
          </div>

          <div className="why-content">
            <h2>VÌ SAO CHỌN <span>CHÚNG TÔI?</span></h2>
            <div className="why-list">
              <div className="why-item">
                <div className="why-item-icon"><CheckCircle2 size={20} /></div>
                <div>
                  <p><strong>Kinh nghiệm dày dặn:</strong> Hơn 10 năm trong lĩnh vực cung cấp vé sự kiện, concert lớn tại Việt Nam.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon"><Users size={20} /></div>
                <div>
                  <p><strong>Nguồn vé đa dạng:</strong> Đối tác chính thức của hàng trăm đơn vị tổ chức, đảm bảo nguồn vé phong phú.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon"><Trophy size={20} /></div>
                <div>
                  <p><strong>Giá cả cạnh tranh:</strong> Luôn có mức giá tốt nhất thị trường kèm nhiều ưu đãi flash sale hấp dẫn.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon"><HeartHandshake size={20} /></div>
                <div>
                  <p><strong>Đội ngũ chuyên nghiệp:</strong> Tư vấn tận tâm, hỗ trợ khách hàng xử lý mọi tình huống 24/7.</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper" id="contact" style={{ marginTop: 'var(--space-10)' }}>
              <h3>NHẬN BÁO GIÁ NHANH</h3>
              <p className="subtitle">Vui lòng để lại thông tin, chúng tôi sẽ liên hệ ngay!</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Họ và tên" />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Số điện thoại" />
                  </div>
                </div>
                <div className="form-group">
                  <textarea placeholder="Nhu cầu / Sự kiện quan tâm"></textarea>
                </div>
                <button type="submit" className="submit-btn">GỬI THÔNG TIN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
