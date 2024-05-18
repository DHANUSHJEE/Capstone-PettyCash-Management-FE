import React from 'react';

import { Progress } from 'antd';

const Analytics = ({ allTransactions }) => {
    //category
    const categories = ['college','salary','mobile','project','food','movie','medical','travel','family','friends','others']
    //total transactions
    const totalTransaction = allTransactions.length
    const totalIncometransactions = allTransactions.filter(transaction => transaction.type === 'income').length
    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === 'expense').length
    const totalIncomePercent = (totalIncometransactions / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransactions / totalTransaction) * 100

    //total turnover
    const totalTurnover = allTransactions.reduce((acc, curr) => acc + curr.amount, 0)
    const totalIncomeTurnover = allTransactions.filter(transaction => transaction.type === 'income').reduce((acc, curr) => acc + curr.amount, 0)
    const totalexpenseTurnover = allTransactions.filter(transaction => transaction.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalexpenseTurnover / totalTurnover) * 100
    return (
        <>
            <div className="row m-3">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Total Transactions : {totalTransaction}
                        </div>
                        <div className="card-body">
                            <h5 className='text-success'>Total Income : {totalIncometransactions}</h5>
                            <h5 className='text-danger'>Total Expense : {totalExpenseTransactions}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2'
                                    percent={totalIncomePercent.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2'
                                    percent={totalExpensePercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Total TurnOver : {totalTurnover}
                        </div>
                        <div className="card-body">
                            <h5 className='text-success'>Total Income Turnover : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Total Expense TurnOver: {totalexpenseTurnover}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2'
                                    percent={totalIncomeTurnoverPercent.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2'
                                    percent={totalExpenseTurnoverPercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <h4 style={{ textAlign: 'center' }}>CategoryWise Income</h4>
                    {categories.map(category => {
                        const amount = allTransactions.filter((transaction) =>
                            transaction.category === category && transaction.type === 'income')
                            .reduce((acc, curr) => acc + curr.amount, 0)
                        return (
                            amount > 0 &&
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category} </h5>
                                    <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-4">
                    <h4 style={{ textAlign: 'center' }}>CategoryWise Expense</h4>
                    {categories.map(category => {
                        const amount = allTransactions.filter((transaction) =>
                            transaction.category === category && transaction.type === 'income')
                            .reduce((acc, curr) => acc + curr.amount, 0)
                        return (
                            amount > 0 &&
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category} </h5>
                                    <Progress percent={((amount / totalexpenseTurnover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Analytics;