import PleaseSignIn from '../components/PleaseSignIn';
import AccountInfo from '../components/AccountInfo';
import {AppPermissions} from '../lib/utils';
const Account = props => (
    <PleaseSignIn permissions={[AppPermissions.admin,AppPermissions.user]}>
        <AccountInfo id={props.query.id}></AccountInfo>
    </PleaseSignIn>
);

export default Account;