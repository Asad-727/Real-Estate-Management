const Property = require("../models/propertyM.js");
const ApiError = require("../apiError.js")


const getProperties = async (req, res, next) =>{
    try{

    const properties = await Property.find();
    res.json({
        
        success: true,
        data: properties
    })

    }catch(error){

        next(new ApiError(500, error.message))
    }
}

const createProperty = async (req, res, next) =>{
    try{
    const {name, location} = req.body;
    if(!name || !location){
        return res.status(400).json({
        success: false,
        message: "Name and localtion are requied"
        })
    };

    const property = await Property.create({
        name,
        location
    })

    res.status(201).json({
        success: true,
        message: "Property created successfully",
        data: property
        })
    }catch(error){
        next(error);
    }
}

module.exports = {
    getProperties,
    createProperty
};


    
