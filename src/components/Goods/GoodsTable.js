import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { Card, Image, Input, Table } from "antd";
import confirm from "antd/es/modal/confirm";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGoodModal,
  setGoods,
  setModalType,
} from "../../config/slice/DashboardSlice";

const GoodsTable = () => {
  const [page, setPage] = React.useState(1);
  let allGoods = useSelector((state) => state.dashboard.allGoods);
  const [value, setValue] = useState("");
  const [SearchData, setSearchData] = useState(allGoods);
  let dispatch = useDispatch();
  useEffect(() => {
    setSearchData(allGoods);
  }, [allGoods]);

  let columns = [
    {
      title: "SR No.",
      dataIndex: "_id",
      key: "_id",
      render: (value, item, index) => <p>{(page - 1) * 10 + index + 1}</p>,
    },
    {
      title: "Bill No.",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "Image",
      dataIndex: "goodImg",
      key: "goodImg",
      render: (text) => (
        <div className="table-img">
          <Image src={`${process.env.REACT_APP_BACKEND_API}${text}`} />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: (text) => <>{text ? text : "-"}</>,
    },
    {
      title: "client name",
      dataIndex: "clientId",
      key: "clientId",
      render: (text) => <>{text ? text.name : "-"}</>,
    },
    {
      title: "Taken date",
      dataIndex: "takenDate",
      key: "takenDate",
      render: (text) => <>{moment(text).format("DD/MM/YYYY")}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <>{text ? text : "-"}</>,
    },
    {
      title: "Payment Got",
      dataIndex: "paymentGot",
      key: "paymentGot",
      render: (text) => <>{text ? "Done" : "Pending"}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="action-div">
          <EditFilled
            className="edit"
            onClick={() => {
              dispatch(setModalType("Edit"));
              dispatch(setGoods(record));
              dispatch(setGoodModal(true));
            }}
          />
          <EyeFilled
            className="view"
            onClick={() => {
              "";
            }}
          />
          <DeleteFilled
            className="delete"
            onClick={() => {
              confirm({
                icon: <ExclamationCircleOutlined />,
                title: "Delete client",
                content: (
                  <>
                    <p>Are you sure you want to delete</p>
                    <p>
                      Client name : <strong>{record.name}</strong>
                    </p>
                  </>
                ),
                onOk() {
                  // dispatch(deleteClient(record._id))
                },
              });
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Card>
        <Input.Search
          placeholder="Input search text"
          value={value}
          className="search-input"
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = allGoods.filter((entry) => {
              return (
                entry.name
                  .toString()
                  .toLowerCase()
                  .includes(currValue.toString().toLowerCase()) ||
                // entry?.billNumber
                //   .toString()
                //   .toLowerCase()
                //   .includes(currValue.toString().toLowerCase()) ||
                entry?.quantity
                  .toString()
                  .toLowerCase()
                  .includes(currValue.toString().toLowerCase()) ||
                entry?.price
                  .toString()
                  .toLowerCase()
                  .includes(currValue.toString().toLowerCase()) ||
                entry.status
                  .toString()
                  .toLowerCase()
                  .includes(currValue.toString().toLowerCase())
              );
            });
            setSearchData(filteredData);
          }}
        />
        <Table
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
          rowClassName="table-row"
          dataSource={SearchData}
          columns={columns}
          className="list-table"
          scroll={{ x: 400 }}
        ></Table>
      </Card>
    </>
  );
};

export default GoodsTable;
