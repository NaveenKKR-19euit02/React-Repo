import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export function Mainpage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    });

    const csvData = products.map((product) => ({
        id: product.id,
        image: product.image,
        category: product.category,
        title: product.title,
        description: product.description,
        rating: product.rating.rate,
        price: product.price,
        view: product.button,
    }));

    const quantity = (productId, change) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                product.quantity = (product.quantity || 0) + change;
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Fake Store Products</h1>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Description</th> 
                        <th className="px-5">Rating</th>
                        <th>Price</th>
                        <th className='px-5'>Count</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <td>{product.id}</td>
                            <td>
                                <img src={product.image} alt={product.title} className="img-fluid" />
                            </td>
                            <td>{product.category}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                                <StarRatings rating={product.rating.rate} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
                            </td>
                            <td>${product.price}</td>
                            <td>
                                <div className="quantity">
                                    <button className="quantity-button rounded bg-danger text-light" onClick={() => quantity(product.id, -1)}> - </button>
                                    <span className="quantity-value">{product.quantity || 0}</span>
                                    <button className="quantity-button rounded bg-success text-light" onClick={() => quantity(product.id, 1)}> + </button>
                                </div>
                            </td>
                            <td>
                                <Link to={`/Detailpage/${product.id}`}>
                                    <button className='btn btn-primary btn btn-lg'>View</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CSVLink data={csvData} filename="products.csv" className="btn btn-primary btn btn-lg text-center">
                Download CSV
            </CSVLink>
        </div>
    );
}
