import React, { useState } from 'react';
import { Table } from 'react-bootstrap';


interface TableProps {
  data: { id: number; business: string; offer: string; detail: string; optLink: string; createdTime: string; likes: number; downloads: number; }[];
}




const TableComponent: React.FC<TableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const formattedDate = (item: string) => {
    const date = new Date(item);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Date</th>
          <th>BUSINESS</th>
          <th>OFFER</th>
          <th>DETAILS</th>
          <th>OPT</th>
          <th>Likes</th>
          <th>Used</th>

          {/* Add more table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td></td>
            <td>{item.id}</td>
            <td>{formattedDate(item.createdTime)}</td>
            <td>{item.business}</td>
            <td>{item.offer}</td>
            <td>{item.detail}</td>
            <td>{item.optLink}</td>
            <td>{item.likes}</td>
            <td>{item.downloads}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
};

export default TableComponent;
