import { Pagination } from '@mui/material';
import React from 'react';

export const MyPagination = ({ count, page, onChange }) => {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            color='warning'
            shape='rounded'
            sx={{ mt: 2 }}
        />
    );
};
