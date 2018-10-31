import Link from "next/link";
import { Mutation } from "react-apollo";
import User from "./User";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";
import Signout from "./Signout";
import NavStyles from "./styles/NavStyles";
import { hasPermissions, AppPermissions } from '../lib/utils';
const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles data-test="nav">
          <Link href="/items">
            <a>Tienda</a>
          </Link>
          {
            me && hasPermissions(me.permissions,[AppPermissions.admin, AppPermissions.permissionUpdate]) && (
              <Link href="/permissions">
                <a>Permisos</a>
              </Link>
            )
          }
          {
            me && hasPermissions(me.permissions,[AppPermissions.admin,AppPermissions.itemCreate]) && (
              <Link href="/sell">
                <a>Vender</a>
              </Link>
            )
          }
          {me && (
            <>
              <Link href="/orders">
                <a>Ordenes</a>
              </Link>
              <Link href="/account">
                <a>Tu Cuenta</a>
              </Link>
              <Signout />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button onClick={toggleCart}>
                    Carrito
                    <CartCount
                      count={me.cart.reduce(
                        (total, cartItem) => total + cartItem.quantity,
                        0
                      )}
                    />
                  </button>
                )}
              </Mutation>
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>Iniciar Sesión</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
