import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn'
import {AppPermissions} from '../lib/utils';
const Sell = props => (
    <PleaseSignIn permissions={[AppPermissions.admin,AppPermissions.itemCreate]}>
        <CreateItem />
    </PleaseSignIn>
);

export default Sell;