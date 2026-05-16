"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const validStatuses = ["New", "Contacted", "Qualified", "Lost"];
const validSources = ["Website", "Instagram", "Referral"];
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// CREATE LEAD
const createLead = async (req, res) => {
    var _a;
    try {
        const { name, email, status = "New", source } = req.body;
        if (!name || !email || !source) {
            return res.status(400).json({
                message: "Name, email, and source are required",
            });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid lead status",
            });
        }
        if (!validSources.includes(source)) {
            return res.status(400).json({
                message: "Invalid lead source",
            });
        }
        const lead = await Lead_1.default.create({
            name,
            email,
            status,
            source,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        return res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.createLead = createLead;
// GET LEADS WITH FILTER, SEARCH, SORT, PAGINATION
const getLeads = async (req, res) => {
    var _a;
    try {
        const { status, source, search, sort = "latest", page = 1 } = req.query;
        const currentPage = Math.max(Number(page) || 1, 1);
        const limit = 10;
        const skip = (currentPage - 1) * limit;
        const query = {
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        };
        if (status && validStatuses.includes(String(status))) {
            query.status = status;
        }
        if (source && validSources.includes(String(source))) {
            query.source = source;
        }
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: String(search),
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: String(search),
                        $options: "i",
                    },
                },
            ];
        }
        const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };
        const total = await Lead_1.default.countDocuments(query);
        const leads = await Lead_1.default.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            total,
            page: currentPage,
            limit,
            pages: totalPages,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            leads,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getLeads = getLeads;
// GET SINGLE LEAD DETAILS
const getLeadById = async (req, res) => {
    var _a;
    try {
        const lead = await Lead_1.default.findOne({
            _id: req.params.id,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        return res.status(200).json(lead);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getLeadById = getLeadById;
// UPDATE LEAD
const updateLead = async (req, res) => {
    var _a;
    try {
        const { name, email, status, source } = req.body;
        if (email && !isValidEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid lead status",
            });
        }
        if (source && !validSources.includes(source)) {
            return res.status(400).json({
                message: "Invalid lead source",
            });
        }
        const lead = await Lead_1.default.findOneAndUpdate({
            _id: req.params.id,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        }, {
            name,
            email,
            status,
            source,
        }, {
            new: true,
            runValidators: true,
        });
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        return res.status(200).json({
            message: "Lead updated successfully",
            lead,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateLead = updateLead;
// DELETE LEAD
const deleteLead = async (req, res) => {
    var _a;
    try {
        const lead = await Lead_1.default.findOneAndDelete({
            _id: req.params.id,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        return res.status(200).json({
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteLead = deleteLead;
