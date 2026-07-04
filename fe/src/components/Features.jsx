import { ShieldCheck, Wallet, Truck, Headphones } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'VÉ CHÍNH HÃNG',
    desc: 'Cam kết 100% vé chính hãng, không qua trung gian, không bán vé giả.',
  },
  {
    icon: <Wallet size={24} />,
    title: 'THANH TOÁN AN TOÀN',
    desc: 'Hỗ trợ đa dạng phương thức thanh toán: Momo, ZaloPay, thẻ ngân hàng.',
  },
  {
    icon: <Truck size={24} />,
    title: 'GIAO VÉ NHANH',
    desc: 'Nhận vé điện tử ngay sau thanh toán hoặc giao vé tận nơi trong 24h.',
  },
  {
    icon: <Headphones size={24} />,
    title: 'HỖ TRỢ 24/7',
    desc: 'Đội ngũ CSKH tận tâm, sẵn sàng giải đáp mọi thắc mắc bất kỳ lúc nào.',
  },
]

export default function Features() {
  return (
    <section className="features-strip" id="features">
      <div className="container">
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
