import { Search } from 'lucide-react'

export default function SearchBox() {
  return (
    <section className="search-section">
      <div className="container">
        <div className="search-box" id="search-box">
          <div className="search-box-header">
            <Search size={20} />
            Tìm kiếm sự kiện
          </div>
          <div className="search-filters">
            <div className="filter-group">
              <label>Loại sự kiện</label>
              <select defaultValue="">
                <option value="" disabled>Chọn loại</option>
                <option>Concert / Âm nhạc</option>
                <option>Thể thao</option>
                <option>Sân khấu / Kịch</option>
                <option>Festival</option>
                <option>Hội nghị</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Khu vực</label>
              <select defaultValue="">
                <option value="" disabled>Chọn khu vực</option>
                <option>TP. Hồ Chí Minh</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>Toàn quốc</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Thời gian</label>
              <select defaultValue="">
                <option value="" disabled>Chọn thời gian</option>
                <option>Tuần này</option>
                <option>Tháng này</option>
                <option>Tháng sau</option>
                <option>Quý này</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Khoảng giá</label>
              <select defaultValue="">
                <option value="" disabled>Chọn giá</option>
                <option>Dưới 500.000đ</option>
                <option>500.000 - 1.000.000đ</option>
                <option>1.000.000 - 3.000.000đ</option>
                <option>Trên 3.000.000đ</option>
              </select>
            </div>
            <button className="search-btn" id="search-btn">
              <Search size={16} />
              Tìm Kiếm
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
