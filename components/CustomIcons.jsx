"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomIcons = ({ page, count, onChange }) => {
  if (count <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" className="mt-10 relative z-0">
      <Pagination
        page={page}
        count={count}
        onChange={(_, value) => onChange(value)}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
            }}
            sx={{
              color: "#6B7280", // gray-500
              borderRadius: "8px",

              "&:hover": {
                backgroundColor: "#d1fae5", // emerald-100
                color: "#047857", // emerald-700
              },

              "&.Mui-selected": {
                backgroundColor: "#059669", // emerald-600
                color: "#ffffff",
                fontWeight: 600,
              },

              "&.Mui-selected:hover": {
                backgroundColor: "#047857", // emerald-700
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CustomIcons;
