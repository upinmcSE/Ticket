# Ticket System

Project thực hành xây dựng hệ thống đặt vé flash sale chịu tải cao theo DDD. Bài toán chính là bán vé sự kiện — stock giới hạn, nhiều người đặt cùng lúc, không được oversell, server không được sập.

---

## Architecture Diagrams

### 1. System Architecture
![System Architecture](https://res.cloudinary.com/shopdev/image/upload/v1781839037/sa_dmxsou.png)

---

### 2. DDD Module Layers

![DDD Module Layers](https://res.cloudinary.com/shopdev/image/upload/v1781839099/Screenshot_2026-06-19_at_10.18.13_smtu6l.png)

> `domain` không phụ thuộc layer nào khác — infrastructure implement interface của domain.

---