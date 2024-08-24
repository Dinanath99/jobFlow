import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React from "react";

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registerd companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
