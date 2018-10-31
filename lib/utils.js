const AppPermissions = {
    admin: 'ADMIN',
    user: 'USER',
    itemCreate:'ITEMCREATE',
    itemUpdate:'ITEMUPDATE',
    itemDelete:'ITEMDELETE',
    permissionUpdate:'PERMISSIONUPDATE',
}
Object.freeze(AppPermissions);

const hasPermissions = (userPermissions, permissions)=>{
    if(!permissions){
        return false;
    }
    return userPermissions.some(permission => permissions.includes(permission));
}

export {hasPermissions, AppPermissions};