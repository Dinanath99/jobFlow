import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCompany, fetchCompanies } from "../../redux/companyActions"; // Ensure this path is correct
import { Avatar, AvatarImage } from "../ui/avatar";
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

const CompaniesTable = () => {
  const dispatch = useDispatch();
  const { companies = [] } = useSelector((store) => store.company);
  const { searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  // Fetch companies on mount
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Filter companies based on search text
  useEffect(() => {
    const filteredCompany =
      Array.isArray(companies) && companies.length > 0
        ? companies.filter((company) => {
            if (!searchCompanyByText) {
              return true;
            }
            return company?.name
              ?.toLowerCase()
              .includes(searchCompanyByText.toLowerCase());
          })
        : [];

    console.log("Filtered Company:", filteredCompany);
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // Handle delete action
  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmDelete) {
      try {
        await dispatch(deleteCompany(companyId)); // Dispatch the delete action
        await dispatch(fetchCompanies()); // Fetch updated companies list
      } catch (error) {
        console.error("Error deleting company:", error); // Log any errors
      }
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Companies not found or not registered
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/recruiter/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDelete(company._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer text-red-600"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
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

export default CompaniesTable;
