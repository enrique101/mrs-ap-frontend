import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { format } from 'date-fns';
import styled from 'styled-components';
import gql from 'graphql-tag';
import SickButton from "./styles/SickButton";
import ReportTable from './ReportTable';

const REPORT = gql`
  query REPORT($startDate: DateTime!, $endDate: DateTime!){
    orders(orderBy: createdAt_DESC, where: {
        AND: [
                {createdAt_gte: $startDate},
                {createdAt_lte: $endDate},
              ],
    }) {
    	createdAt
    	totalCost
    	total
      user{
        name,
        email
      }
      items {
        quantity
      }
    }
  }
`;

class Report extends React.Component {
    handleDateHours = (date, isStart) => {
      if(isStart){
        date.setHours( 0,0,0,0);
      }else{
        date.setHours(23,59,59,999)
      }
      return date;
    };
    state = {
        startDate: this.handleDateHours(new Date(), true),
        endDate:  this.handleDateHours(new Date(), false),
        orders:[],
    }
    handleChange = e => {e.preventDefault();this.setState({ [e.target.name]: new Date(e.target.value + "T06:00:00Z")});};
    generateReport = async (e, client) => {
        const res = await client.query({
            query: REPORT,
            variables: { startDate: this.handleDateHours(this.state.startDate,true), endDate: this.handleDateHours(this.state.endDate,false) },
          });
        this.setState({orders : res.data.orders});
    };
    render() {
        return (
                <ApolloConsumer>
                      {(client)=>(
                        <>
                            <input className="no-print" max={format(new Date(),'yyyy-MM-dd')} value={format(this.state.startDate,'yyyy-MM-dd')} onChange={this.handleChange} name="startDate" type="date"/>
                            <input className="no-print" max={format(new Date(),'yyyy-MM-dd')} value={format(this.state.endDate,'yyyy-MM-dd')} onChange={this.handleChange} name="endDate" type="date"/>
                            <SickButton className="no-print" onClick={ e => this.generateReport(e,client)}>Crear Reporte</SickButton>
                            {this.state.orders.length > 0 && <ReportTable orders={this.state.orders}></ReportTable>}
                        </>
                      )}
                </ApolloConsumer>
        );
    }
}

export default Report;