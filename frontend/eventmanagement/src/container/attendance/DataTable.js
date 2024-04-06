import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Api from "../../helpers/Api";

export default function DataTable({ id }) {
  const [participants, setParticipants] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "contactDetails", headerName: "Phone Number", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await Api.fetchAttendees(id);
      setAttendees(fetchedAttendees);
    };
    fetchAttendees();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const fetchedParticipants = await Api.fetchParticipants(id);
      setParticipants(fetchedParticipants);
    };
    fetchParticipants();
  }, [id]);
  return (
    <div style={{ height: "100%", width: "100%", marginBottom: "2rem" }}>
      <DataGrid
        rows={participants}
        columns={columns}
        localeText={{ noRowsLabel: 'No participants' }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        checkboxSelection
      />
    </div>
  );
}
