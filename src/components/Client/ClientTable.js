import { DeleteFilled, EditFilled, ExclamationCircleOutlined, EyeFilled } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, setClient, setClientModal, setModalType } from '../../config/slice/DashboardSlice';
const { confirm } = Modal
const ClientTable = () => {
  const [page, setPage] = React.useState(1);
  // const [SearchData, setSearchData] = useState([])
  let allClient = useSelector((state) => state.dashboard.allClient)
  let dispatch = useDispatch()
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "_id",
      key: "_id",
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Payment cycle",
      dataIndex: "paymentCycle",
      key: "paymentCycle",
    },
    {
      title: "Pending payment",
      dataIndex: "totalPendingPayment",
      key: "totalPendingPayment",
      render: (text) => (
        <>
          {text ? text : "-"}
        </>
      )
    },
    {
      title: "Payment got",
      dataIndex: "totalPaymentGot",
      key: "totalPaymentGot",
      render: (text) => (
        <>
          {text ? text : "-"}
        </>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className='action-div'>
          <EditFilled
            className='edit'
            onClick={() => {
              dispatch(setClient(record))
              dispatch(setModalType("Edit"))
              dispatch(setClientModal(true))
            }}
          />
          <EyeFilled
            className='view'
            onClick={() => { dispatch(setClient(record)) }}
          />
          <DeleteFilled
            className='delete'
            onClick={() => {
              confirm({
                icon: <ExclamationCircleOutlined />,
                title: 'Delete client',
                content: <>
                  <p>Are you sure you want to delete</p>
                  <p>Client name : <strong>{record.name}</strong></p>
                </>,
                onOk() {
                  dispatch(deleteClient(record._id))
                },
              });
            }}
          />
        </div>
      )
    }
  ];
  return (
    <Table
      pagination={{
        onChange(current) {
          setPage(current);
        },
      }}
      rowClassName="table-row"
      dataSource={allClient}
      columns={columns}
      className="list-table"
      scroll={{ x: 400 }}
    ></Table>
  )
}

export default ClientTable