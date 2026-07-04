import axios from 'axios';

const API_BASE_URL = 'http://localhost:1122/ticket';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketService = {
  getActiveTickets: async () => {
    try {
      const response = await api.get('/active');
      return response.data.result; // Backend uses 'result' field
    } catch (error) {
      console.error('Error fetching active tickets:', error);
      throw error;
    }
  },
  getTicketById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data.result;
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      throw error;
    }
  },
  createBooking: async ({ ticketId, quantity }) => {
    try {
      const response = await axios.post('http://localhost:1122/order/cas', { ticketId, quantity }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.result; // { success, placeOrderTaskId, code, message }
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
};

const orderApi = axios.create({
  baseURL: 'http://localhost:1122/order',
  headers: { 'Content-Type': 'application/json' },
});

export const managerService = {
  // --- Ticket ---
  createEvent: async (payload) => {
    const response = await api.post('/create', payload);
    return response.data.result;
  },
  getAllTickets: async () => {
    const response = await api.get('/active');
    return response.data.result;
  },
  activateTicket: async (id) => {
    const response = await api.put(`/${id}/active`);
    return response.data.result;
  },
  deactivateTicket: async (id) => {
    const response = await api.put(`/${id}/inactive`);
    return response.data.result;
  },
  deleteTicket: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data.result;
  },

  // --- Orders ---
  // V1: load toàn bộ, không phân trang (SELECT * FROM table — có thể chậm với 10M rows)
  getOrdersAll: async (yearMonth) => {
    const response = await orderApi.get(`/1/list?ntable=${yearMonth}`);
    return response.data.result; // List<TicketOrderDTO>
  },
  // V2: cursor-based pagination (WHERE id < cursor ORDER BY id DESC LIMIT 50 — O(1))
  getOrders: async (yearMonth, cursor = 0, limit = 50) => {
    const response = await orderApi.get(`/1/list/page?ntable=${yearMonth}&cursor=${cursor}&limit=${limit}`);
    return response.data.result; // { items, nextCursor, hasMore }
  },
  cancelOrder: async ({ userId, orderNumber }) => {
    const response = await orderApi.put(`/${userId}/${orderNumber}/cancel`);
    return response.data.result;
  },
};

export default api;
