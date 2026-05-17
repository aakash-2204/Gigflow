import { Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../middleware/authMiddleware";

const validStatuses = ["New", "Contacted", "Qualified", "Lost"];
const validSources = ["Website", "Instagram", "Referral"];

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// CREATE LEAD
export const createLead = async (req: AuthRequest, res: Response) => {
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

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL LEADS WITH FILTER, SEARCH, SORT, PAGINATION
export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const { status, source, search, sort = "latest", page = 1 } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    const query: any = {};

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

    const sortOption: Record<string, 1 | -1> =
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit) || 1;

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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE LEAD DETAILS
export const getLeadById = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE LEAD
export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status",
      });
    }

    if (source && !validSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead source",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        status,
        source,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE LEAD
export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};