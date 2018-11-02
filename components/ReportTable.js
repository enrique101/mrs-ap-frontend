import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
const ReportData = styled.div`
    display:grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .total{
        grid-column: -3;
    }
    .costo-total{
        grid-column: -2;
    }
`;

class ReportTable extends React.Component {
    state = { 
        report: {},
    }
    render(){
        const {orders} =  this.props;
        const perPerson = {};
        const report ={
            totalCost : 0,
            total : 0,
        };
        const result = orders.reduce((acum, order)=>{
            acum.totalCost += order.totalCost;
            acum.total += order.total;
            const quantity = order.items.reduce((qty,item)=> qty + item.quantity ,0);
            if(!perPerson[order.user.email]){
                perPerson[order.user.email] = { email: order.user.email, quantity: quantity, totalCost : order.totalCost, total: order.total }
            }
            else{
                perPerson[order.user.email].quantity += quantity;
                perPerson[order.user.email].totalCost += order.totalCost;
                perPerson[order.user.email].total += order.total;
            }
            return acum;
        }, report);
        result.perPerson = Object.values(perPerson) || [];
        if(!result) return <p></p>
        return (
            <ReportData>
                <p><strong>Vendedor</strong></p>
                <p><strong>Cantidad Vendida</strong></p>
                <p><strong>SubTotal</strong></p>
                <p><strong>Costo SubTotal</strong></p>
                
                {result.perPerson.map(p => (<>
                    <p>{p.email}</p><p>{p.quantity}</p><p>{formatMoney(p.total)}</p><p>{formatMoney(p.totalCost)}</p>
                </>))}
                <p className="total"><strong>Venta total: </strong>{formatMoney(result.total)}</p>
                <p className="costo-total"><strong>Costo total: </strong>{formatMoney(result.totalCost)}</p>
            </ReportData>
    )}
};

export default ReportTable;