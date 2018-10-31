import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import {hasPermissions, AppPermissions} from '../lib/utils';

class Item extends Component {
    render() {
        const { item, buttons } = this.props;
        return (
            <ItemStyles>
                 <Link href={{
                        pathname: '/item',
                        query: {id: item.id},
                    }}>
                    <a className="item-card">
                    <p>{ item.title }</p>
                    {item.image && <img src={ item.image } alt={item.title} />}
                    <PriceTag>{formatMoney(item.price)}</PriceTag>
                    </a>
                </Link>
                <div className="buttonList">
                    { 
                        buttons.canUpdate && (
                            <Link
                                href={{
                                pathname: 'update',
                                query: { id: item.id },
                                }}
                            >
                                <a>Editar ✏️</a>
                            </Link>
                        )
                    }
                    { 
                        buttons.canBuy && (<AddToCart id={item.id} />)
                    }
                    { 
                        buttons.canDelete && (<DeleteItem id={item.id}>Eliminar</DeleteItem>)
                    }
                </div>
            </ItemStyles>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    buttons : PropTypes.object.isRequired,
};

export default Item;