import { Button, Card, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addClient, editClient, getAllClient, setClient, setClientModal, setModalType } from '../../config/slice/DashboardSlice'
import ClientTable from './ClientTable'

const Client = () => {
    let dispatch = useDispatch()
    dispatch(getAllClient())
    const [form] = Form.useForm()
    let clientModal = useSelector((state) => state.dashboard.clientModal)
    let clientData = useSelector((state) => state.dashboard.client)
    let modalType = useSelector((state) => state.dashboard.modalType)
    let handleOk = (value) => {
        if (modalType === "Add") {
            dispatch(addClient(value))
        } else {
            dispatch(editClient(value, clientData._id))
        }
    }
    useEffect(() => {
        if (clientData != null) {
            form.setFieldsValue(clientData)
        } else {
            form.setFieldsValue({
                name: "",
                paymentCycle: "",
                totalPendingPayment: "",
                totalPaymentGot: ""
            })
        }
    }, [form, clientData, modalType, clientModal])
    const handleCancel = () => {
        dispatch(setClient(null))
        dispatch(setClientModal(false))
    }
    return (

        <Card>
            <div className="head-client">
                <h1>Client management</h1>
                <Button
                    onClick={() => {
                        dispatch(setModalType("Add"))
                        dispatch(setClientModal(true))
                    }}
                    className='add-client-btn'
                >
                    Add new client
                </Button>
            </div>
            <Modal
                title={modalType === "Add" ? "Add Client" : "Edit Client"}
                open={clientModal}
                onOk={""}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleOk}
                    onFinishFailed={""}
                >
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Payment Cycle" name="paymentCycle">
                        <Input placeholder="Payment cycle" />
                    </Form.Item>
                    <Form.Item label="Total Pending Payment" name="totalPendingPayment">
                        <Input placeholder="Total Pending Payment" />
                    </Form.Item>
                    <Form.Item label="Total payment got" name="totalPaymentGot">
                        <Input placeholder="Total payment got" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <ClientTable />
        </Card>
    )
}

export default Client