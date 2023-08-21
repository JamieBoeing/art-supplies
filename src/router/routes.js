import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../../components/OrderDetail/OrderDetail";

const routes = [
    {
        Component: NewOrderPage,
        key: 'NewOrder',
        path: '/orders/new'
    },
    {
        Component: OrderHistoryPage,
        key: 'OrderHistory',
        path: '/orders'
    }
]

export default routes