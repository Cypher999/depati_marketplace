"use client"
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, InputGroup, Container, Spinner } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default () => {
  return (
    <>
        <section style={{
            'background': 'linear-gradient(135deg, #004aad, #007bff)',
            'color': 'white',
            'padding': '80px 0'
        }} className="text-center text-md-start">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h1>Depati Marketplace</h1>
                    <p>
                        Tempat Belanja Favorit Dengan Barang Yang Lengkap dan Harga Terjangkau
                    </p>
                    <div className="container">
                        <input type="text" className="form-control mt-3" placeholder="Cari buku..."/>
                    </div>
                    <button style={{
            backgroundColor: '#002855',
            color: 'white',
            borderRadius: '50px',
            padding: '10px 20px'
        }} className="btn mt-3">Get Started</button>
                </div>
                <div className="col-md-6 text-center">
                    <img src="#" alt="Img here"/>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
