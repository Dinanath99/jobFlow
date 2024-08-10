const { json } = require("express");
const Company = require("../../models/company.model");
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter your company name",
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        status: "fail",
        message: "Company already exists",
      });
    }
    company = await Company.create({ name: companyName, userId: req.id });
    res.status(201),
      json({
        sucess: true,
        message: "Company registerd successfully",
        company,
      });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
    console.log(error);
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
    const updateData = {
      name,
      description,
      website,
      location,
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
      status: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
module.exports = { registerCompany, getCompany, getCompanyById };
