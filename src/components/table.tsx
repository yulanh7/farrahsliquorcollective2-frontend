import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';


interface TableData {
  id: number; business: string; offer: string; detail: string; optLink: string; createdTime: string; likes: number; downloads: number;
}


interface TableComponentProps {
  data: TableData[];
  itemsPerPage: number;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const formattedDate = (item: string) => {
    const date = new Date(item);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  }
  return (
    <div>

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
          {paginatedData.map((item) => (
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
      <div className="pagination-container">

        <Pagination>
          <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

    </div>

  );
};

export default TableComponent;
