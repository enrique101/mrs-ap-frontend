import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';
import {AppPermissions} from '../lib/utils';
const PermissionsPage = props => (
    <PleaseSignIn permissions={[AppPermissions.admin,AppPermissions.permissionUpdate]}>
        <Permissions />
    </PleaseSignIn>
);

export default PermissionsPage;