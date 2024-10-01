import axios from "axios";
import { Loader2 } from "lucide-react"; // Import loader icon for loading state
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button"; // Make sure you import your Button component
import { Input } from "../ui/input"; // Import your Input component
import { Label } from "../ui/label"; // Import your Label component

const JobEdit = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/v1/jobs/getbyid/${id}`
        );
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/v1/jobs/update/${id}`, job, {
        withCredentials: true,
      });
      navigate("/recruiter/recruiterJobs"); // Redirect to the job listing page after update
      toast.success("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-24">
        <h1 className="font-bold text-xl text-center">Edit Job</h1>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Job Description</Label>
              <Input
                type="text"
                name="description"
                value={job.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Required skills</Label>
              <Input
                type="text"
                name="requirements"
                value={job.requirements}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={job.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="text"
                name="position"
                value={job.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobEdit;
