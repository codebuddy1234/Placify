import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import session from "express-session";
import dotenv from "dotenv";
import generateResumePDF from "./utils/pdfGenerator.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.use(
  session({
    name: "tracktalent.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Middleware for Student Routes
const protectStudent = (req, res, next) => {
  if (!req.session.student || !req.session.student.id) {
    return res
      .status(401)
      .json({ message: "Please Login as a Student first!" });
  }
  next();
};

// Middleware for Company Routes
const protectCompany = (req, res, next) => {
  if (!req.session.company || !req.session.company.id) {
    return res
      .status(401)
      .json({ message: "Please Login as a Company first!" });
  }
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB

const STUDENTS_COLLECTION = "Students_Registration";
const STUDENTS_PROFILE_COLLECTION = "Students_Collection";
const COMPANIES_COLLECTION = "Company_Registration";
const JOBS_COLLECTION = "Company_Job_Posting";
const INTERVIEWS_COLLECTION = "Interview_Schedules";
const STUDENT_APPLICATIONS = "Student_Applications";
const OFFERS_COLLECTION = "Job_Offers";
const COORDINATOR_COLLECTION = "Coordinator_Collection";
const ADMIN_LOGIN = "Admin_Login";
const ADMIN_COORDINATOR = "Admin_Coordinator";

const DATABASE = "TrackTalent";
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("❌ MONGO_URL not defined in .env");
}

const client = new MongoClient(MONGO_URL, {
  maxPoolSize: 10,
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DATABASE);
    console.log("✅ MongoDB Atlas Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
}

connectDB();

// LOGOUT (Company / Student / Coordinator)
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    res.clearCookie("tracktalent.sid");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
});

// COMPANY REGISTER
app.post("/company-register", async (req, res) => {
  try {
    const { companyName, email, password, confirmPassword } = req.body;

    if (!companyName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const companiesCollection = db.collection(COMPANIES_COLLECTION);
    const existingCompany = await companiesCollection.findOne({ email });

    if (existingCompany) {
      return res
        .status(409)
        .json({ success: false, message: "Company already registered" });
    }

    const result = await companiesCollection.insertOne({
      companyName,
      email,
      password,
      role: "company",
      createdAt: new Date(),
    });

    // Store company identity in session
    req.session.company = {
      id: result.insertedId,
      email,
      role: "company",
      companyName,
    };

    res
      .status(201)
      .json({ success: true, message: "Company registered successfully" });
  } catch (error) {
    console.error("Company register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// COMPANY LOGIN
app.post("/company/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    //  Find company
    const company = await db
      .collection(COMPANIES_COLLECTION)
      .findOne({ email });

    if (!company) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    if (company.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  CREATE SESSION (this is LOGIN)
    req.session.company = {
      id: company._id,
      role: "company",
      email: company.email,
      name: company.companyName,
    };

    //  Respond
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET LOGGED-IN COMPANY DETAILS
app.get("/company/me", async (req, res) => {
  try {
    const companySession = req.session.company;

    if (!companySession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const companiesCollection = db.collection(COMPANIES_COLLECTION);
    const company = await companiesCollection.findOne(
      { _id: new ObjectId(companySession.id) },
      { projection: { password: 0 } },
    );

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, company });
  } catch (error) {
    console.error("Get company error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// CREATE JOB
app.post("/jobs/create-job", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      title,
      type,
      location,
      salary,
      skills,
      experience,
      openings,
      description,
      deadline,
      cgpa,
      branches,
    } = req.body;

    const branchesArray = branches
      ? branches.split(",").map((b) => b.trim())
      : [];

    let skillsArray = [];

    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === "string") {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    const jobDetails = {
      title,
      type,
      location,
      salary,
      skills: skillsArray,
      experience,
      openings: Number(openings),
      description,
      deadline,
      cgpa: Number(cgpa),
      branches: branchesArray,
      companyId: new ObjectId(companySession.id),
      createdAt: new Date(),
    };

    await db.collection(JOBS_COLLECTION).insertOne(jobDetails);

    res
      .status(201)
      .json({ success: true, message: "Job Created Successfully" });
  } catch (err) {
    console.error("Error while creating job:", err);
    res
      .status(500)
      .json({ success: false, message: "Error while creating the job" });
  }
});

// GET COMPANY JOBS
app.get("/company/jobs", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const jobs = await db
      .collection(JOBS_COLLECTION)
      .find({ companyId: new ObjectId(companySession.id) })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error("Error fetching company jobs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
});

//  UPDATE JOB
app.put("/jobs/:id", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const {
      title,
      type, 
      location,
      salary,
      skills,
      experience,
      openings,
      description,
      deadline,
      cgpa,
      branches,
    } = req.body;

    let skillsArray = [];

    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === "string") {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    const branchesArray = branches
      ? branches.split(",").map((b) => b.trim())
      : [];

    const updatedJob = {
      title,
      type,
      location,
      salary,
      skills: skillsArray,
      experience,
      openings: Number(openings),
      description,
      deadline,
      cgpa: Number(cgpa),
      branches: branchesArray,
    };

    const result = await db
      .collection(JOBS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(id), companyId: new ObjectId(companySession.id) },
        { $set: updatedJob },
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job updated successfully" });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ success: false, message: "Error updating job" });
  }
});

// DELETE JOB
app.delete("/jobs/:id", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;

    const result = await db.collection(JOBS_COLLECTION).deleteOne({
      _id: new ObjectId(id),
      companyId: new ObjectId(companySession.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ success: false, message: "Error deleting job" });
  }
});

// Schedule Interview - Company
app.post("/company/interview", protectCompany, async (req, res) => {
  try {
    //  Check company session
    const companySession = req.session.company;
    if (!companySession || !companySession.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login as company." });
    }

    const companyId = new ObjectId(companySession.id);

    //  Destructure request body
    const { applicationId, round, date, time, mode, meetLink, interviewer } =
      req.body;

    if (!applicationId || !round || !date || !time) {
      return res.status(400).json({
        message:
          "Missing required fields: applicationId, round, date, or time.",
      });
    }

    //  Get the application
    const application = await db.collection(STUDENT_APPLICATIONS).findOne({
      _id: new ObjectId(applicationId),
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    const appCompanyId = application.companyId;
    const isCompanyMatch =
      (typeof appCompanyId === "string" &&
        appCompanyId === companyId.toString()) ||
      (appCompanyId instanceof ObjectId && appCompanyId.equals(companyId));

    if (!isCompanyMatch) {
      return res.status(403).json({
        message: "You are not authorized to schedule this interview.",
      });
    }

    //  Insert interview
    const interviewDoc = {
      applicationId: application._id,
      studentId: application.studentId,
      jobId: application.jobId,
      companyId,
      round,
      date,
      time,
      mode,
      meetLink: meetLink || "",
      interviewer: interviewer || "",
      status: "scheduled",
      createdAt: new Date(),
    };

    await db.collection(INTERVIEWS_COLLECTION).insertOne(interviewDoc);

    //  Update application status
    await db
      .collection(STUDENT_APPLICATIONS)
      .updateOne(
        { _id: application._id },
        { $set: { status: "interviewed", updatedAt: new Date() } },
      );

    res.status(201).json({ message: "Interview scheduled successfully" });
  } catch (err) {
    console.error("Schedule interview error:", err);
    res
      .status(500)
      .json({ message: "Server error while scheduling interview" });
  }
});

// Fetch interviews for company
app.get("/company/interview", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession || !companySession.id)
      return res.status(401).json({ message: "Unauthorized" });

    const companyId = new ObjectId(companySession.id);

    const interviews = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        { $match: { companyId } },
        {
          $lookup: {
            from: STUDENT_APPLICATIONS,
            localField: "applicationId",
            foreignField: "_id",
            as: "application",
          },
        },
        { $unwind: "$application" },
        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
        {
          $project: {
            _id: 1,
            applicationId: 1,
            studentId: 1,
            jobId: 1,
            round: 1,
            date: 1,
            time: 1,
            mode: 1,
            meetLink: 1,
            location: 1,
            interviewer: 1,
            status: 1,
            result: 1,
            feedback: 1,
            rating: 1,
            candidateName: "$student.name",
            position: "$application.role",
          },
        },
      ])
      .toArray();

    res.status(200).json({ interviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//  CANCEL INTERVIEW
app.patch("/company/interview/:id/cancel", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const result = await db.collection(INTERVIEWS_COLLECTION).updateOne(
      {
        _id: new ObjectId(id),
        companyId: new ObjectId(companySession.id),
      },
      {
        $set: {
          status: "cancelled",
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({ success: true, message: "Interview cancelled successfully" });
  } catch (error) {
    console.error("Cancel interview error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// RESCHEDULE INTERVIEW
app.patch(
  "/company/interview/:id/reschedule",
  protectCompany,
  async (req, res) => {
    try {
      const companySession = req.session.company;
      if (!companySession) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const { date, time } = req.body;

      if (!date || !time) {
        return res.status(400).json({ message: "Date and time are required" });
      }

      const result = await db.collection(INTERVIEWS_COLLECTION).updateOne(
        {
          _id: new ObjectId(id),
          companyId: new ObjectId(companySession.id),
        },
        {
          $set: {
            date,
            time,
            status: "scheduled",
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Interview not found" });
      }

      res.json({
        success: true,
        message: "Interview rescheduled successfully",
      });
    } catch (error) {
      console.error("Reschedule interview error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// STUDENT REGISTER
app.post("/student-register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      rollNumber,
      branch,
      year,
      cgpa,
      password,
      confirmPassword,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !rollNumber ||
      !branch ||
      !year ||
      !cgpa ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({ success: false, message: "Invalid CGPA" });
    }

    const studentsCollection = db.collection(STUDENTS_COLLECTION);
    const existingStudent = await studentsCollection.findOne({ email });

    if (existingStudent) {
      return res
        .status(409)
        .json({ success: false, message: "Student already registered" });
    }

    //  Insert student
    const result = await studentsCollection.insertOne({
      name,
      email,
      phone,
      rollNumber,
      branch,
      year: Number(year),
      cgpa: Number(cgpa),
      password,
      role: "student",
      createdAt: new Date(),
    });

    //  Create session
    req.session.student = {
      id: result.insertedId,
      name,
      email,
      role: "student",
    };

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
    });
  } catch (err) {
    console.error("Student register error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET LOGGED-IN STUDENT PROFILE
app.get("/student-profile", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;

    if (!studentSession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //  Fetch registration info
    const student = await db.collection(STUDENTS_COLLECTION).findOne(
      { _id: new ObjectId(studentSession.id) },
      { projection: { password: 0 } }, // exclude password
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Fetch profile info
    const profileDoc = await db
      .collection(STUDENTS_PROFILE_COLLECTION)
      .findOne({ studentId: new ObjectId(studentSession.id) });

    // Merge defaults
    const profile = {
      name: student.name,
      email: student.email,
      phone: student.phone || "",
      rollNumber: student.rollNumber || "",
      branch: student.branch || "",
      year: student.year || "",
      cgpa: student.cgpa || "",
      location: profileDoc?.profile?.location || "",
      linkedin: profileDoc?.profile?.linkedin || "",
      github: profileDoc?.profile?.github || "",
      portfolio: profileDoc?.profile?.portfolio || "",
      bio: profileDoc?.profile?.bio || "",
    };

    const skills = profileDoc?.skills || [];
    const projects = profileDoc?.projects || [];
    const experiences = profileDoc?.experiences || [];
    const certifications = profileDoc?.certifications || [];

    // calculate profile completion
    let score = 0;
    const personalFields = [
      profile.phone,
      profile.branch,
      profile.year,
      profile.cgpa,
      profile.location,
      profile.bio,
    ];
    score +=
      (personalFields.filter(Boolean).length / personalFields.length) * 30;
    score += skills.length >= 3 ? 20 : skills.length > 0 ? 10 : 0;
    score += projects.length >= 2 ? 20 : projects.length === 1 ? 10 : 0;
    score += experiences.length > 0 ? 20 : 0;
    score += certifications.length > 0 ? 10 : 0;

    res.json({
      success: true,
      profile,
      skills,
      projects,
      experiences,
      certifications,
      profileScore: Math.round(score),
    });
  } catch (err) {
    console.error("Student profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/student-profile", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;
    if (!studentSession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { profile, skills, projects, experiences, certifications } = req.body;

    await db.collection(STUDENTS_PROFILE_COLLECTION).updateOne(
      { studentId: new ObjectId(studentSession.id) },
      {
        $set: {
          studentId: new ObjectId(studentSession.id),
          profile,
          skills,
          projects,
          experiences,
          certifications,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Save profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// STUDENT LOGIN
app.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const student = await db
      .collection("Students_Registration")
      .findOne({ email });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.student = {
      id: student._id,
      role: "student",
      email: student.email,
      name: student.name,
    };

    res.json({ success: true });
  } catch (error) {
    console.error("Student login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/student/me", async (req, res) => {
  if (!req.session.student) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const student = await db
    .collection(STUDENTS_COLLECTION)
    .findOne(
      { _id: new ObjectId(req.session.student.id) },
      { projection: { password: 0 } },
    );

  res.json({ success: true, student });
});

// GET ALL PLACEMENT DRIVES (STUDENTS)
app.get("/placement-drives", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;

    if (!studentSession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //  Fetch student
    const student = await db
      .collection(STUDENTS_COLLECTION)
      .findOne(
        { _id: new ObjectId(studentSession.id) },
        { projection: { cgpa: 1, branch: 1 } },
      );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const studentCgpa = Number(student.cgpa);
    const studentBranch = student.branch;

    //  Fetch drives
    const drives = await db
      .collection(JOBS_COLLECTION)
      .aggregate([
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },
        {
          $project: {
            title: 1,
            type: 1,
            location: 1,
            salary: 1,
            skills: 1,
            experience: 1,
            openings: 1,
            deadline: 1,
            cgpa: 1,
            branches: 1,
            createdAt: 1,
            companyName: "$company.companyName",
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    const appliedJobs = await db
      .collection(STUDENT_APPLICATIONS)
      .find({ studentId: new ObjectId(studentSession.id) })
      .project({ jobId: 1 })
      .toArray();

    const appliedJobIds = appliedJobs.map((a) => a.jobId.toString());
    // later from applications collection

    // ENRICH DRIVES
    const enrichedDrives = drives.map((drive) => {
      const cgpaEligible = studentCgpa >= Number(drive.cgpa);

      const branchEligible =
        !drive.branches?.length || drive.branches.includes(studentBranch);

      const hasApplied = appliedJobIds.includes(drive._id?.toString());

      return {
        ...drive,
        isEligible: cgpaEligible && branchEligible,
        hasApplied,
      };
    });

    res.json({ success: true, drives: enrichedDrives });
  } catch (error) {
    console.error("Fetch placement drives error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// APPLY TO JOB
app.post("/student/apply/:jobId", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;
    if (!studentSession) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { jobId } = req.params;
    const studentId = new ObjectId(studentSession.id);

    //  Check job exists
    const job = await db.collection(JOBS_COLLECTION).findOne({
      _id: new ObjectId(jobId),
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //  Prevent duplicate application
    const existingApplication = await db
      .collection(STUDENT_APPLICATIONS)
      .findOne({
        studentId,
        jobId: new ObjectId(jobId),
      });

    if (existingApplication) {
      return res.status(409).json({
        message: "Already applied to this job",
      });
    }

    //  Get company name
    const company = await db
      .collection(COMPANIES_COLLECTION)
      .findOne({ _id: job.companyId }, { projection: { companyName: 1 } });

    //  Insert application
    await db.collection(STUDENT_APPLICATIONS).insertOne({
      studentId,
      jobId: new ObjectId(jobId),
      companyId: job.companyId,

      companyName: company?.companyName || "",
      jobTitle: job.title,

      status: "applied",
      appliedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET STUDENT APPLICATIONS
app.get("/student/applications", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;
    if (!studentSession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const studentId = new ObjectId(studentSession.id);

    //  Fetch all applications of the student
    const applications = await db
      .collection(STUDENT_APPLICATIONS)
      .aggregate([
        { $match: { studentId } },
        // Join with job details
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },
        // Join with company details
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            companyName: "$company.companyName",
            jobTitle: "$job.title",
            salary: "$job.salary",
            status: 1,
            appliedAt: 1,
            stage: 1,
            nextStep: 1,
            timeline: 1,
            offerId: 1,
          },
        },
        { $sort: { appliedAt: -1 } },
      ])
      .toArray();

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Fetch student applications error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/company/applications", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const companyId = new ObjectId(companySession.id);

    const applications = await db
      .collection(STUDENT_APPLICATIONS)
      .aggregate([
        { $match: { companyId } },

        // join student
        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },

        // join job
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },

        {
          $project: {
            _id: 1,
            studentId: "$student._id",
            name: "$student.name",
            email: "$student.email",
            branch: "$student.branch",
            cgpa: "$student.cgpa",
            role: "$job.title",
            status: 1,
            appliedAt: 1,
          },
        },

        { $sort: { appliedAt: -1 } },
      ])
      .toArray();

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// UPDATE APPLICATION STATUS
app.patch(
  "/company/applications/:id/status",
  protectCompany,
  async (req, res) => {
    try {
      const companySession = req.session.company;
      if (!companySession) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const { status } = req.body;

      const APPLICATION_STATUS = {
        APPLIED: "applied",
        SHORTLISTED: "shortlisted",
        INTERVIEWED: "interviewed",
        OFFERED: "offered",
        ACCEPTED: "accepted",
        DECLINED: "declined",
        REJECTED: "rejected",
      };

      if (!Object.values(APPLICATION_STATUS).includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const result = await db.collection(STUDENT_APPLICATIONS).updateOne(
        {
          _id: new ObjectId(id),
          companyId: new ObjectId(companySession.id),
        },
        {
          $set: {
            status,
            updatedAt: new Date(),
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json({
        success: true,
        message: `Application ${status} successfully`,
      });
    } catch (error) {
      console.error("Update application status error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Get a student's profile by ID (for company view)
app.get("/student-profile/:id", protectStudent, async (req, res) => {
  try {
    const { id } = req.params;

    const student = await db
      .collection(STUDENTS_COLLECTION)
      .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const profileDoc = await db
      .collection(STUDENTS_PROFILE_COLLECTION)
      .findOne({
        studentId: new ObjectId(id),
      });

    const profileData = {
      student,
      profile: profileDoc || {},
    };

    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// SEND OFFER (COMPANY)
app.post("/company/offers", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession || !companySession.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { interviewId, applicationId, offerDetails } = req.body;

    //  STRICT but CORRECT validation
    if (!interviewId || !applicationId) {
      return res
        .status(400)
        .json({ message: "interviewId and applicationId required" });
    }

    // BEFORE creating offer
    const application = await db.collection(STUDENT_APPLICATIONS).findOne({
      _id: new ObjectId(applicationId),
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    //  Create offer (minimal fields)
    const offerDoc = {
      interviewId: new ObjectId(interviewId),
      applicationId: new ObjectId(applicationId),
      studentId: new ObjectId(application.studentId),
      jobId: application.jobId,
      companyId: new ObjectId(companySession.id),
      offerDetails,
      status: "sent",
      createdAt: new Date(),
    };

    const offerResult = await db
      .collection(OFFERS_COLLECTION)
      .insertOne(offerDoc);

    //  Update interview → completed + selected
    await db.collection(INTERVIEWS_COLLECTION).updateOne(
      { _id: new ObjectId(interviewId) },
      {
        $set: {
          status: "completed",
          result: "selected",
        },
      },
    );

    //  Update application → offered
    await db.collection(STUDENT_APPLICATIONS).updateOne(
      { _id: new ObjectId(applicationId) },
      {
        $set: {
          status: "offered",
          offerId: offerResult.insertedId,
          updatedAt: new Date(),
        },
      },
    );

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
    });
  } catch (error) {
    console.error(" Offer error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// FETCH COMPANY OFFERS
app.get("/company/offers", protectCompany, async (req, res) => {
  try {
    const companySession = req.session.company;
    if (!companySession) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const companyId = new ObjectId(companySession.id);

    const offers = await db
      .collection(OFFERS_COLLECTION)
      .aggregate([
        { $match: { companyId } },

        //  Join student
        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },

        //  Join job
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },

        //  Final shape for frontend
        {
          $project: {
            _id: 1,
            status: 1,
            offerDetails: 1,
            createdAt: 1,

            candidateName: "$student.name",
            position: "$job.title",
            packageLPA: "$job.salary",
          },
        },

        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    res.json({ success: true, offers });
  } catch (err) {
    console.error("Fetch offers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  STUDENT RESPOND TO OFFER
app.patch(
  "/student/offers/:offerId/respond",
  protectStudent,
  async (req, res) => {
    try {
      const { offerId } = req.params;
      const { status } = req.body;

      if (!req.session.student) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!["accepted", "declined"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // update offer
      await db
        .collection(OFFERS_COLLECTION)
        .updateOne({ _id: new ObjectId(offerId) }, { $set: { status } });

      await db
        .collection(STUDENT_APPLICATIONS)
        .updateOne({ offerId: new ObjectId(offerId) }, { $set: { status } });

      // ✅ IMPORTANT RESPONSE (THIS WAS MISSING)
      return res.status(200).json({
        success: true,
        message: `Offer ${status} successfully`,
      });
    } catch (err) {
      console.error("Respond offer error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
);

// FETCH INTERVIEWS FOR LOGGED-IN STUDENT
app.get("/student/interviews", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;

    if (!studentSession || !studentSession.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const studentId = new ObjectId(studentSession.id);

    const interviews = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        { $match: { studentId } },

        // Join job
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },

        // Join company
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },

        {
          $project: {
            _id: 1,
            applicationId: 1,
            jobId: 1,
            companyId: 1,

            company: "$company.companyName",
            position: "$job.title",

            round: 1,
            date: 1,
            time: 1,
            duration: 1,
            mode: 1,
            meetLink: 1,
            interviewer: 1,
            instructions: 1,

            status: 1,
            feedback: 1,
            createdAt: 1,
          },
        },

        { $sort: { date: 1, time: 1 } },
      ])
      .toArray();

    res.status(200).json({ interviews });
  } catch (error) {
    console.error("Fetch student interviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/student/dashboard", protectStudent, async (req, res) => {
  try {
    const studentSession = req.session.student;
    if (!studentSession) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const studentId = new ObjectId(studentSession.id);

    //  Applications
    const applications = await db
      .collection(STUDENT_APPLICATIONS)
      .aggregate([
        { $match: { studentId } },
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            companyName: 1,
            jobTitle: "$job.title",
            status: 1,
            appliedAt: 1,
          },
        },
        { $sort: { appliedAt: -1 } },
      ])
      .toArray();

    //  Interviews
    const interviews = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        { $match: { studentId, status: { $in: ["scheduled", "completed"] } } },
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },
        {
          $project: {
            _id: 1,
            company: "$company.companyName",
            role: "$job.title",
            date: 1,
            time: 1,
            round: 1,
          },
        },
        { $sort: { date: 1 } },
      ])
      .toArray();

    res.json({
      success: true,
      stats: {
        totalApplications: applications.length,
        totalInterviews: interviews.length,
      },
      applications,
      interviews,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//COORDINATOR DASHBOARD
app.get("/coordinator/dashboard", async (req, res) => {
  try {
    // 1️⃣ Total students
    const totalStudents = await db
      .collection(STUDENTS_COLLECTION)
      .countDocuments();

    //  Total placement drives
    const totalDrives = await db.collection(JOBS_COLLECTION).countDocuments();

    //  Total applications
    const totalApplications = await db
      .collection(STUDENT_APPLICATIONS)
      .countDocuments();

    //  Total placed students (accepted offers)
    const placedStudents = await db
      .collection(OFFERS_COLLECTION)
      .countDocuments({ status: "accepted" });

    //  Placement rate
    const placementRate =
      totalApplications > 0
        ? ((placedStudents / totalApplications) * 100).toFixed(1)
        : 0;

    //  Upcoming interviews
    const upcomingInterviews = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        { $match: { status: "scheduled" } },
        { $sort: { date: 1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: STUDENT_APPLICATIONS,
            localField: "applicationId",
            foreignField: "_id",
            as: "application",
          },
        },
        { $unwind: "$application" },
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },
        {
          $project: {
            company: "$company.companyName",
            role: "$application.jobTitle",
            date: 1,
            time: 1,
          },
        },
        { $sort: { date: 1 } },
        { $limit: 5 },
      ])
      .toArray();

    //  Recent activity
    const recentActivity = await db
      .collection(STUDENT_APPLICATIONS)
      .find()
      .sort({ appliedAt: -1 })
      .limit(3)
      .project({
        companyName: 1,
        jobTitle: 1,
        appliedAt: 1,
      })
      .toArray();

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalDrives,
        placedStudents,
        upcomingInterviewCount: upcomingInterviews.length,
        placementRate,
      },
      upcomingInterviews,
      recentActivity,
    });
  } catch (error) {
    console.error("Coordinator dashboard error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//GET ALL STUDENTS FOR COORDINATOR
app.get("/coordinator/students", async (req, res) => {
  try {
    const students = await db
      .collection(STUDENTS_COLLECTION)
      .aggregate([
        {
          $lookup: {
            from: OFFERS_COLLECTION,
            let: { studentId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$studentId", "$$studentId"] },
                      { $eq: ["$status", "accepted"] },
                    ],
                  },
                },
              },
            ],
            as: "acceptedOffers",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            placed: { $gt: [{ $size: "$acceptedOffers" }, 0] },
          },
        },
      ])
      .toArray();

    res.json({ success: true, students });
  } catch (err) {
    console.error("Fetch students error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//GET ALL PLACEMENT DRIVES (COORDINATOR)
app.get("/coordinator/placement-drives", async (req, res) => {
  try {
    const drives = await db
      .collection(JOBS_COLLECTION)
      .aggregate([
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },

        // count applications
        {
          $lookup: {
            from: STUDENT_APPLICATIONS,
            localField: "_id",
            foreignField: "jobId",
            as: "applications",
          },
        },

        {
          $project: {
            title: 1,
            type: 1,
            location: 1,
            salary: 1,
            skills: 1,
            deadline: 1,
            cgpa: 1,
            branches: 1,
            createdAt: 1,
            companyName: "$company.companyName",
            applicants: { $size: "$applications" },
          },
        },

        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    res.json({ success: true, drives });
  } catch (err) {
    console.error("Coordinator drives error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/coordinator/interviews", async (req, res) => {
  try {
    // OPTIONAL: You could have a coordinator session check if needed
    // const coordinatorSession = req.session.coordinator;
    // if (!coordinatorSession) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const interviews = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        //  Join with applications
        {
          $lookup: {
            from: STUDENT_APPLICATIONS,
            localField: "applicationId",
            foreignField: "_id",
            as: "application",
          },
        },
        { $unwind: "$application" },

        //  Join with students
        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },

        //  Join with jobs
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },

        // Join with companies
        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },

        // 5 Project only the fields we want
        {
          $project: {
            _id: 1,
            round: 1,
            date: 1,
            time: 1,
            mode: 1,
            meetLink: 1,
            interviewer: 1,
            status: 1,
            result: 1,
            feedback: 1,
            candidateName: "$student.name",
            studentEmail: "$student.email",
            studentBranch: "$student.branch",
            studentCgpa: "$student.cgpa",
            position: "$job.title",
            companyName: "$company.companyName",
          },
        },

        // 6️⃣ Sort by date & time
        { $sort: { date: 1, time: 1 } },
      ])
      .toArray();

    res.status(200).json({ success: true, interviews });
  } catch (err) {
    console.error("Coordinator fetch interviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/results/dashboard", async (req, res) => {
  try {
    const totalOffers = await db.collection(OFFERS_COLLECTION).countDocuments();

    const acceptedOffers = await db
      .collection(OFFERS_COLLECTION)
      .countDocuments({ status: "accepted" });

    const pendingOffers = await db
      .collection(OFFERS_COLLECTION)
      .countDocuments({ status: "sent" });

    const avgPackageAgg = await db
      .collection(OFFERS_COLLECTION)
      .aggregate([
        { $match: { status: "accepted" } },
        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        {
          $group: {
            _id: null,
            avgPackage: { $avg: "$job.salary" },
          },
        },
      ])
      .toArray();

    const avgPackage =
      avgPackageAgg.length > 0
        ? `₹${avgPackageAgg[0].avgPackage} LPA`
        : "₹0 LPA";

    const stats = [
      {
        label: "Total Offers",
        value: totalOffers,
        change: "+12%",
        icon: "Award",
        color: "text-green-600",
      },
      {
        label: "Pending Offers",
        value: pendingOffers,
        change: "-5%",
        icon: "Clock",
        color: "text-yellow-600",
      },
      {
        label: "Accepted Offers",
        value: acceptedOffers,
        change: "+8%",
        icon: "CheckCircle2",
        color: "text-blue-600",
      },
      {
        label: "Avg Package",
        value: avgPackage,
        change: "+15%",
        icon: "TrendingUp",
        color: "text-indigo-600",
      },
    ];

    const recentOffers = await db
      .collection(OFFERS_COLLECTION)
      .aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 5 },

        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },

        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },

        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },

        {
          $project: {
            _id: 1,
            student: "$student.name",
            rollNo: "$student.rollNo",
            company: "$company.companyName",
            position: "$job.title",
            package: {
              $concat: ["₹", { $toString: "$job.salary" }, " LPA"],
            },
            type: "Full-time",
            status: 1,
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
        },
      ])
      .toArray();

    const interviewResults = await db
      .collection(INTERVIEWS_COLLECTION)
      .aggregate([
        { $match: { status: "completed" } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },

        {
          $lookup: {
            from: STUDENTS_COLLECTION,
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },

        {
          $lookup: {
            from: JOBS_COLLECTION,
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },

        {
          $lookup: {
            from: COMPANIES_COLLECTION,
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },

        {
          $project: {
            _id: 1,

            student: "$student.name",
            rollNo: "$student.rollNo",
            company: "$company.companyName",
            round: 1,
            status: {
              $cond: [{ $eq: ["$result", "selected"] }, "selected", "rejected"],
            },
            nextRound: 1,
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
        },
      ])
      .toArray();
    res.json({
      success: true,
      stats,
      recentOffers,
      interviewResults,
    });
  } catch (error) {
    console.error("Results dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load results dashboard",
    });
  }
});

app.post("/coordinator/profile", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, department, bio } = req.body;

    await db.collection(COORDINATOR_COLLECTION).updateOne(
      { type: "coordinator" }, // fixed identifier
      {
        $set: {
          firstName,
          lastName,
          email,
          phone,
          department,
          bio,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          type: "coordinator",
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (err) {
    console.error("Error in Saving Profile", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/coordinator/profile", async (req, res) => {
  try {
    const profile = await db
      .collection(COORDINATOR_COLLECTION)
      .findOne({ type: "coordinator" });

    res.status(200).json(profile || {});
  } catch (err) {
    console.error("Error fetching profile", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const admin = await db
      .collection("Admin_Login")
      .findOne({ email, password });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: admin,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/admin-coordinator", async (req, res) => {
  try {
    const { name, email, password, college, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await db.collection(ADMIN_COORDINATOR).findOne({ email });

    if (existing) {
      return res.status(409).json({
        message: "Coordinator already exists!",
      });
    }

    await db.collection(ADMIN_COORDINATOR).insertOne({
      name,
      email,
      password, // hash later
      college,
      role,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Coordinator set!",
    });
  } catch (err) {
    console.error("error in fetching coordinator data", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/coordinator-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const coordinator = await db.collection(ADMIN_COORDINATOR).findOne({ email });

    if (!coordinator) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 later replace with bcrypt.compare
    if (coordinator.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ SESSION CREATION (DYNAMIC)
    req.session.user = {
      id: coordinator._id,
      email: coordinator.email,
      role: coordinator.role, // "coordinator"
    };

    res.status(200).json({
      message: "Coordinator logged in",
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/generate-resume", async (req, res) => {
  try {
    if (!req.session.student) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // generate PDF buffer here
    const pdfBuffer = await generateResumePDF(req.session.student._id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Placify_Resume.pdf"
    );

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Resume generation failed" });
  }
});


//Server
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
