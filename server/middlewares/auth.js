const express = require("express");
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token) res.status(401).json({msg: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Unauthorized'});
    }
}

module.exports = authMiddleware