import { Component } from "react";
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerID: null
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/customers')
        .then(response => {
            this.setState({ customers: response.data });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }


}


export default CustomerList;