import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addGoods,
  editGoods,
  getAllClient,
  getAllGoods,
  setGoodModal,
  setGoods,
  setModalType,
} from "../../config/slice/DashboardSlice";
import GoodsTable from "./GoodsTable";

const Goods = () => {
  const [form] = Form.useForm();
  const [URL, setURL] = useState("");
  const [BillUrl, setBillUrl] = useState("");
  const [GoodImage, setGoodImage] = useState();
  const [billImage, setBillImage] = useState();
  const [takenDate, setTakenDate] = useState();
  const [dueDate, setDueDate] = useState();
  let modalType = useSelector((state) => state.dashboard.modalType);
  let goodModal = useSelector((state) => state.dashboard.goodModal);
  let goods = useSelector((state) => state.dashboard.goods);
  let allClient = useSelector((state) => state.dashboard.allClient);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGoods());
  }, [goods, goodModal]);
  useEffect(() => {
    dispatch(getAllClient());
  }, []);
  useEffect(() => {
    console.log(goods);
    if (goods != null) {
      form.setFieldsValue(goods);
    } else {
      form.setFieldsValue({
        name: "",
        status: "",
        quantity: "",
        price: "",
        cost: "",
      });
    }
  }, [form, goods, modalType, goodModal]);
  let handleOk = (value) => {
    value.goodImg = undefined;
    value.billImg = undefined;
    if (GoodImage) value.goodImg = GoodImage;
    if (billImage) value.billImg = billImage;
    if (takenDate) value.takenDate = takenDate;
    if (dueDate) value.deadLine = dueDate;
    if (modalType === "Add") {
      setBillUrl(null);
      setURL(null);
      dispatch(addGoods(value));
      setBillUrl(null);
      setURL(null);
    } else {
      dispatch(editGoods(value, goods._id));
      setBillUrl(null);
      setURL(null);
    }
  };
  const handleCancel = () => {
    dispatch(setGoodModal(false));
  };

  return (
    <Card>
      <div className="head-client">
        <h1>Goods management</h1>
        <Button
          onClick={() => {
            dispatch(setGoods(null));
            dispatch(setModalType("Add"));
            dispatch(setGoodModal(true));
          }}
          className="add-client-btn"
        >
          Add new Goods
        </Button>
      </div>
      <Modal
        title={modalType === "Add" ? "Add Good" : "Edit Good"}
        open={goodModal}
        onOk={""}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOk}
          onFinishFailed={() => {
            toast.error("Please enter a require fields!");
          }}
        >
          <div className="img-div">
            <Form.Item name="goodImg" label="Good Image" rules={[{}]}>
              <input
                type="file"
                name="goodImg"
                id="file"
                onChange={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  var file = event.target.files[0];
                  setGoodImage(file);
                  let urlLink = window.URL.createObjectURL(file);
                  setURL(urlLink);
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <Avatar
                  size={100}
                  shape="square"
                  icon={<UserOutlined />}
                  htmlFor="file"
                  src={
                    URL
                      ? URL
                      : `${process.env.REACT_APP_BACKEND_API}${goods?.goodImg}`
                  }
                  className="profile-avatar"
                />
              </label>
            </Form.Item>
            <Form.Item name="billImg" label="Bill Image" rules={[{}]}>
              <input
                type="file"
                name="billImg"
                id="billFile"
                onChange={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  var file = event.target.files[0];
                  setBillImage(file);
                  let urlLink = window.URL.createObjectURL(file);
                  setBillUrl(urlLink);
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="billFile">
                <Avatar
                  size={100}
                  shape="square"
                  icon={<UserOutlined />}
                  htmlFor="billFile"
                  src={
                    BillUrl
                      ? BillUrl
                      : `${process.env.REACT_APP_BACKEND_API}${goods?.billImg}`
                  }
                  className="profile-avatar"
                />
              </label>
            </Form.Item>
          </div>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Client" name="clientId">
            <Select placeholder="Please select a client">
              {allClient?.map((data) => (
                <>
                  <Option value={data?._id}>{data?.name}</Option>
                </>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="status" name="status">
            <Input placeholder="status" />
          </Form.Item>
          <Form.Item
            label="Bill Number"
            name="billNumber"
            rules={[{ type: Number, message: "Should be a number" }]}
          >
            <Input placeholder="Bill Number or Challan Number" />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please enter quantity!",
              },
              {
                type: Number,
                message: "Quantity is only a number!",
              },
            ]}
          >
            <Input placeholder="quantity" />
          </Form.Item>
          <div className="date-pic">
            <label htmlFor="taken-date">Taken date :</label>
            <DatePicker
              id="taken-date"
              onChange={(e) => setTakenDate(e.format())}
            />
            <label htmlFor="due-date" id="due-date-label">
              Due date :
            </label>
            <DatePicker
              id="due-date"
              onChange={(e) => setDueDate(e.format())}
            />
          </div>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                type: Number,
                message: "Price is only a number!",
              },
            ]}
          >
            <Input placeholder="price" />
          </Form.Item>
          <Form.Item
            label="cost"
            name="cost"
            rules={[
              {
                type: Number,
                message: "Cost is only a number!",
              },
            ]}
          >
            <Input placeholder="cost" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <GoodsTable />
    </Card>
  );
};

export default Goods;
