import { Edit2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const RecruiterJobsTable = () => {
  const { companies = [] } = useSelector((store) => store.company);
  console.log(companies);
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  console.log(allAdminJobs);
  const { searchCompanyByText } = useSelector((store) => store.company);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      Array.isArray(companies) && allAdminJobs.length > 0
        ? allAdminJobs.filter((job) => {
            if (!searchCompanyByText) {
              return true;
            }
            return company?.name
              ?.toLowerCase()
              .includes(searchCompanyByText.toLowerCase());
          })
        : [];

    console.log("Filtered Company:", filteredCompany); // Log filtered companies
    setFilterJobs(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Companies not found or not registered
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/recruiter/companies/${job._id}`)
                        } // Update this line
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruiterJobsTable;
