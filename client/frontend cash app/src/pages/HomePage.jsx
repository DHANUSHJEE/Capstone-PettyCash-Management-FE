import React, { useState, useEffect } from 'react';
import { Input, Modal, Form, Select, message, Table, DatePicker } from 'antd';
import Layout from '../components/layout/Layout.jsx';
import axios from 'axios';
import { transactionURL } from '../components/config/Config.jsx';
import Spinner from '../components/Spinner.jsx';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from './Analytics.jsx';

const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransactions] = useState([]);
    const [frequency, setFrequency] = useState('all');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);

    //table data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => { setEditable(record); setShowModal(true); }} />
                    <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
                </div>
            )
        }
    ];

    // Fetch transaction data
    const fetchData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            const res = await axios.post(`${transactionURL.URL}/get-transaction`, {
                userid: user.user._id,
                frequency,
                selectedDate,
                type
            });
            setLoading(false);
            const transactions = res.data.transactions;
            setAllTransactions(transactions);
        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error('Failed to get transactions');
        }
    };

    // useEffect with auto-refresh
    useEffect(() => {
        fetchData(); // Fetch data initially
        const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [frequency, selectedDate, type]);

    //handle delete
    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post(`${transactionURL.URL}/delete-transaction`, { transactionId: record._id });
            setLoading(false);
            message.success('Transaction deleted successfully');
            fetchData(); // Refresh data after deletion
        } catch (error) {
            setLoading(false);
            console.log("handle delete", error);
            message.error('Failed to delete transaction');
        }
    };

    const submitHandler = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);

            if (editable) {
                await axios.post(`${transactionURL.URL}/edit-transaction`, {
                    payload: {
                        ...values,
                        userid: user.user._id,
                    },
                    transactionId: editable._id
                });
                message.success('Transaction updated successfully');
            } else {
                await axios.post(`${transactionURL.URL}/add-transaction`, {
                    ...values,
                    userid: user.user._id,
                });
                message.success('Transaction added successfully');
            }

            setLoading(false);
            setShowModal(false);
            setEditable(null);
            fetchData(); // Refresh data after submission
        } catch (error) {
            setLoading(false);
            message.error('Failed to add transaction');
        }
    };

    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <div className='select'>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(e) => { setFrequency(e) }}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='7'>Last 1 Week</Select.Option>
                        <Select.Option value='30'>Last 1 Month</Select.Option>
                        <Select.Option value='365'>Last 1 Year</Select.Option>
                        <Select.Option value='custom'>Custom</Select.Option>



                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(e) => { setSelectedDate(e) }} />}
                </div>
                <div className='selecttype'>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(e) => { setType(e) }}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(e) => { setSelectedDate(e) }} />}
                </div>
                <div className='swith-icon'>
                    Table<UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => { setViewData('table') }} />
                    Chart <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />

                </div>
                <div>
                    <button className="btn btn-primary" id='addbutton' onClick={() => { setShowModal(true) }}>Add New</button>
                </div>
            </div>
            <div className="contenttable">
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} /> : <Analytics allTransactions={allTransactions} />}


            </div>
            <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => { setShowModal(false) }} footer={false} >
                <Form layout="vertical" onFinish={submitHandler} initialValues={editable}>
                    <Form.Item label='amount' name="amount" required>
                        <Input type="tel" />
                    </Form.Item>
                    <Form.Item label='type' name="type" required>
                        <Select>
                            <Select.Option value='income'> Income</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='category' name="category" required>
                        <Select>
                            <Select.Option value='college'> College</Select.Option>
                            <Select.Option value='salary'>Salary</Select.Option>
                            <Select.Option value='mobile'> Mobile</Select.Option>
                            <Select.Option value='project'>Project</Select.Option>
                            <Select.Option value='food'> Food</Select.Option>
                            <Select.Option value='movie'>Movie</Select.Option>
                            <Select.Option value='medical'>Medical</Select.Option>
                            <Select.Option value='travel'>Travel</Select.Option>
                            <Select.Option value='family'> Family</Select.Option>
                            <Select.Option value='friends'>friends</Select.Option>
                            <Select.Option value='others'>others</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='description' name="description" required>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='date' name="date" required>
                        <Input type="date" />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>

                        <button type="submit" className="btn btn-primary">
                            {" "}
                            Save
                        </button>
                    </div>
                </Form>

            </Modal>
        </Layout>
    );
};

export default HomePage;


