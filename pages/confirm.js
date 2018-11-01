import ConfirmUser from '../components/ConfirmUser';
import {AppPermissions} from '../lib/utils';
const ConfirmUserPage = props => (
        <ConfirmUser id={props.query.id} />
);

export default ConfirmUserPage;