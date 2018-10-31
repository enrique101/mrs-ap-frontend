import PleaseSignIn from '../components/PleaseSignIn';
import Order from '../components/Order';
import {AppPermissions} from '../lib/utils';
const OrderPage = props => (
    <PleaseSignIn permissions={[AppPermissions.admin,AppPermissions.user]}>
        <Order id={props.query.id} />
    </PleaseSignIn>
);

export default OrderPage;