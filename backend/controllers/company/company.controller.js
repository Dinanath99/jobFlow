const { json } = require("express");
const Company = require("../../models/company.model");
const getDataUri = require("../../utils/datauri");
const cloudinary = require("../../utils/cloudinary");
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    console.log(companyName);

    if (!companyName) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter your company name",
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(409).json({
        status: "fail",
        message: "You can't register the same company twice",
      });
    }

    company = await Company.create({ name: companyName, userId: req.id });

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
    console.log("Error in registerCompany:", error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        status: false,
        message: "No company found",
      });
    }
    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        status: false,
        message: "Company not found",
      });
    }
    res.status(200).json({
      status: true,
      company,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //cloudinary upload
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;
    const updateData = {
      name,
      description,
      website,
      location,
      logo,
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        status: false,
        message: "Company not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Company information updated successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};


const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id; // Get the company ID from the request parameters

    // Find the company by ID and delete it
    const company = await Company.findByIdAndDelete(companyId);

    // If no company is found, return a 404 status
    if (!company) {
      return res.status(404).json({
        status: "fail",
        message: "Company not found",
      });
    }

    // Return a success response
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCompany:", error);
    // Return a 500 status for server errors
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = { registerCompany, getCompany, getCompanyById, updateCompany,deleteCompany };
