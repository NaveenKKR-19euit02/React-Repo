import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

export function Detailpage() {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/'+id)
            .then((response) => response.json())
            .then((data) => setProduct(data));
    }, [id]);

    const csvData = [
        {
            ID: product.id,
            Image: product.image,
            Category: product.category,
            Title: product.title,
            Description: product.description,
            Rating: product.rating ? product.rating.rate : '',
        },
    ];

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <img src={product.image} className="card-img-top" alt={product.title} />
                </div>
                <div className="col-lg-6">
                    <h1 className="card-title">{product.title}</h1>
                    <h2 className="card-body">{product.description}</h2>
                    <p className="card-content">${product.price}</p>
                    <p className="card-content">Rating: {product.rating ? product.rating.rate : ''}</p>
                    <CSVLink data={csvData} filename={`product_${id}.csv`} className="btn btn-primary btn-lg">Download CSV</CSVLink>
                </div>
            </div>
        </div>
    );
}

