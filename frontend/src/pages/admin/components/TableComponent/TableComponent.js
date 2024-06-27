import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, MenuItem, Modal, Popover, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import classNames from 'classnames/bind';
import styles from './TableComponent.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

function TableComponent({
    columns,
    rows,
    type,
    attributes,
    deleteButton,
    contactButton,
    updateButton,
    actionButton,
    handleDelete,
    handleUpdate,
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openProductUpdateBox, setOpenProductUpdateBox] = useState([]);

    const [orderStatusArray, setOrderStatusArray] = useState(rows.map((row) => row.status));

    // useEffect(() => {
    //     const statusArray = rows.map((row) => row.status);
    //     setOrderStatusArray(statusArray);
    // }, []);

    const typeName = {
        customer: 'khách hàng',
        product: 'sản phẩm',
        order: 'đơn hàng',
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // delete ----------------------------------------------------
    const handleOpenDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };



    // update product
    const handleOpenProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // voucher action

    const handleStatusChange = (index, event) => {
        const newStatus = event.target.value;
        setOrderStatusArray((prevStatuses) => {
            const newState = [...prevStatuses];
            newState[index] = newStatus;
            return newState;
        });
        handleUpdateStatus(newStatus, index);
        // Gọi hàm xử lý cập nhật trạng thái đơn hàng ở đây (ví dụ: handleUpdateStatus(newStatus))
    };

    const handleUpdateStatus = (newStatus, index) => {
        console.log(`Đơn hàng thứ ${index + 1} đã được cập nhật thành ${newStatus}`);
    }

    console.log('orderStatusArray', orderStatusArray);

    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ fontSize: '1.6rem', minWidth: `${column.minWidth}` }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    {attributes.map((attribute, attrIndex) => (
                                        <StyledTableCell key={attrIndex} align="left">
                                            {attribute === 'image' ? (
                                                <Avatar src={row[attribute]} alt="" />
                                            ) : attribute === 'status' ? (
                                                orderStatusArray[row.index - 1]
                                            ) : (
                                                row[attribute]
                                            )}
                                        </StyledTableCell>
                                    ))}

                                    {deleteButton && (
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenDeleteBox(row.index - 1)}
                                                variant="contained"
                                                color="error"
                                            >
                                                XÓA
                                            </Button>
                                            <Modal
                                                open={openDeleteBox[row.index - 1]}
                                                onClose={() => handleCloseDeleteBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('delete-confirm-box')}>
                                                    <p>
                                                        Xóa {typeName[type]} {row.name} ?
                                                    </p>
                                                    <div className={cx('delete-box-row')}>
                                                        <Button
                                                            size="large"
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleDelete(row.index)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                        <Button
                                                            size="large"
                                                            variant="outlined"
                                                            onClick={() => handleCloseDeleteBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}

                                    

                                    {updateButton && type === 'product' && (
                                        // Cập nhật voucher
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenProductUpdateBox(row.index - 1)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                CẬP NHẬT
                                            </Button>

                                            <Modal
                                                open={openProductUpdateBox[row.index - 1]}
                                                onClose={() => handleCloseProductUpdateBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('update-modal-box')}>
                                                    <p className={cx('update-modal-title')}>Cập nhật sản phẩm</p>

                                                    <div className={cx('update-input-wrapper')}>
                                                        <div className={cx('update-input-row')}>
                                                            <p>Tên sản phẩm</p>
                                                            <input
                                                                id={`product-name-${row.index - 1}`}
                                                                type="text"
                                                                defaultValue={row.name}
                                                                onChange={null}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={cx('update-modal-buttons')}>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            onClick={() => {
                                                                let data = {
                                                                    // name: document.getElementById(
                                                                    //     `voucher-name-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // code: document.getElementById(
                                                                    //     `voucher-code-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // value: document.getElementById(
                                                                    //     `voucher-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // condition: document.getElementById(
                                                                    //     `voucher-condition-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // maximum_value: document.getElementById(
                                                                    //     `voucher-maximum-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                };

                                                                handleUpdate(data); // Hàm gọi API để cập nhật voucher bên Vouchers.js
                                                                handleCloseProductUpdateBox(row.index - 1);
                                                            }}
                                                        >
                                                            Cập nhật
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => handleCloseProductUpdateBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}

                                    {actionButton && type === 'order' && (
                                        <TableCell align="left">
                                            <Select style={{height: '36px'}} value={orderStatusArray[row.index - 1]} onChange={(event) => handleStatusChange(row.index - 1, event)}>
                                                <MenuItem value="Đang giao">Đang giao</MenuItem>
                                                <MenuItem value="Đã giao">Đã giao</MenuItem>
                                                <MenuItem value="Hủy">Hủy</MenuItem>
                                            </Select>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '50px',
                    fontSize: '1.4rem',
                    '.MuiTablePagination-selectLabel': {
                        color: 'rgb(41, 39, 39)',
                        fontSize: '1.4rem',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.4rem',
                    },
                }}
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
}

export default TableComponent;
