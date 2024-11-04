import express,{Request, Response} from 'express';
import mongoose from 'mongoose';
import {usersData} from '../model/userSchema'



export const getUsers = async (req: Request, res: Response) => {
    try{

        const users = await usersData.find({}).sort({createdAt:-1})

        if(!users){
            return res.status(200).json({Error: 'Database disconnected. Network Problem.'})
        }

        return res.status(200).json(users)

    }catch{
        ( error:any ) => {
            return res.status(400).json({Error: error.message})
        }
    }
}

export const getUser = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(200).json({Error: 'There is no such user Id. Please input a valid user Id.'})
        }

        const users = await usersData.findById({_id: id})

        if(!users){
            return res.status(400).json({Error: 'User not found. Please input valid user id.'})
        }

        return res.status(200).json(users)

    }catch{
        ( error:any ) => {
            return res.status(400).json({Error: error.message})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{

        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Error: 'There is no such user id. Please input a valid user id.'})
        }

        const users = await usersData.findByIdAndDelete({_id: id})

        if(!users){
            return res.status(400).json({Error: 'User id not found. Please input a valid user.'})
        }

        return res.status(200).json(users)

    }catch{
        ( error:any ) => {
            return res.status(400).json({Error: error.message})
        }
    }
}


export const createUser = async (req: Request, res: Response) => {
    try{

        const {username, password, email, isAdmin} = req.body;

        const usernames = await usersData.findOne({username: username});

        if(usernames){
            return res.status(400).json({Error: 'Username already in use.'})
        }

        const emails = await usersData.findOne({email: email});

        if(emails){
            return res.status(400).json({Error: 'Email already in use.'})
        }

        const users = await usersData.create({username: username, password: password, email: email, isAdmin: isAdmin })

        if(!users){
            return res.status(400).json({Error: 'User not created. Please input all credentials.'})
        }

        return res.status(200).json(users)

    }catch{
        ( error:any ) => {
            return res.status(400).json({Error: error.message})
        }
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try{

        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Error: 'There is no such user id. Please input a valid user id.'})
        }

        const {username, password, email, isAdmin} = req.body;

        const users = await usersData.findByIdAndUpdate({_id: id},{username: username, password: password, email: email, isAdmin: isAdmin})

        if(!users){
            return res.status(400).json({Error: 'User not updated. Please input all valid credentials.'})
        }

        return res.status(200).json(users)

    }catch{
        ( error:any ) => {
            return res.status(400).json({Error: error.message})
        }
    }
}

module.exports ={
    getUsers, getUser, deleteUser, createUser, updateUser
}