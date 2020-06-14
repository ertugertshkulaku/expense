import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, FormGroup, Button,  Label, Form , Input, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';


class Expenses extends Component {

    emptyItem = {
        
        expensedate : new Date(),
        description : '',
        id: 104,
        location : '',
        categories : [1, 'Travel']

    }

    constructor(props){
        super(props)

        this.state = {
           
            isLoading : false,
            Expenses : [],
            Categories : [],
            date : new Date(),
            item : this.emptyItem

        }
    }


    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
          this.setState({Expenses : updatedExpenses});
        });

    }

    
      async  componentDidMount(){
          const response = await fetch('/api/categories');
          const body = await response.json();
          this.setState({Categories : body , isLoading : false});


          const responseExp = await fetch('/api/expenses');
          const bodyExp = await responseExp.json();
          this.setState({Expenses : bodyExp , isLoading : false});
      }



    render() { 

        const title = <h3>Add Expense</h3>
        const  {Categories} = this.state;
        const {Expenses, isLoading} = this.state;

        if(isLoading)
        return(<div>Loading..../</div>)

       let optionList =
            Categories.map(category =>
            <option id ={category.id}>
                {category.name}
                 </option>
            )

            let rows=
            Expenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>

              </tr>


            )

        
        return ( <div><AppNav/>

            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <select>
                        {optionList}
                        </select>
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="city"> Date</Label>
                        < DatePicker selected={this.state.date} onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="row">
                    <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                    </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit" >Save</Button>
                        <Button color="secondary" tag={Link} to="/" >Cancel</Button>
                    </FormGroup>
                </Form>




            </Container>
            {''}
            <Container>
                <h3>Expense List</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Description</th>
                            <th width="10%">Location</th>
                            <th>Date</th>
                            <th >Category</th>
                            <th width="10%">Action</th>

                        </tr>


                    </thead>
                    <tbody>
                        {rows}
                    </tbody>




                </Table>

            </Container>



       </div> 
       );
    }
}
 
export default Expenses;