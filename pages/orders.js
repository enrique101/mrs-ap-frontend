import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';
import {AppPermissions} from '../lib/utils';
const OrdersPage = props => (
    <PleaseSignIn permissions={[AppPermissions.admin,AppPermissions.user]}>
        <OrderList/>
    </PleaseSignIn>
);

export default OrdersPage;