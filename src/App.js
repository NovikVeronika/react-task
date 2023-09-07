import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import axios from "axios";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/"  element={ <ItemList /> } />
                    <Route path="/item/:name" element={ <ItemDetail /> } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
