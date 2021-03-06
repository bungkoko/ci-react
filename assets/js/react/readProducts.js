// component that contains all the logic and other smaller components
// that form the Read Products view
import React from 'react';
import TopActionsComponent from "./topActionsComponent.js";
import ProductsTable from "./productTable.js";
class ReadProductsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.serverRequest = $.get("product/readAll", function (products) {
            this.setState({
                products: products
            });
        }.bind(this));
    }
 
    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }
 
    render() {
        // list of products
        var filteredProducts = this.state.products;
        $('.page__header h1').text('Read Products');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
 
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
}

export default ReadProductsComponent;