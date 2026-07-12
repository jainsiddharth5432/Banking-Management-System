import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";
import TransferModal from "../components/TransferModal";

import {
    getMyAccount,
    getMyTransactions,
    depositMoney,
    withdrawMoney,
    transferMoney
} from "../services/AccountService";

function UserDashboard() {

    const navigate = useNavigate();

    const [account, setAccount] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");

    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transferAmount, setTransferAmount] = useState("");
    const [receiverId, setReceiverId] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadMyAccount();

        loadTransactions();

    }, [navigate]);

        const handleDeposit = async () => {

            try {

                await depositMoney(account.id, depositAmount);

                alert("Money Deposited Successfully!");

                setShowDepositModal(false);
                setDepositAmount("");

                loadMyAccount();

            } catch (error) {

                console.log(error);
                alert("Deposit Failed!");

            }
        };

        const handleWithdraw = async () => {

            try {

                await withdrawMoney(account.id, withdrawAmount);

                alert("Money Withdrawn Successfully!");

                setShowWithdrawModal(false);
                setWithdrawAmount("");

                loadMyAccount();

            } catch (error) {

                console.log(error);
                alert("Withdraw Failed!");

            }
        };

        const handleTransfer = async () => {

            try {

                await transferMoney(
                    account.id,
                    receiverId,
                    transferAmount
                );

                alert("Money Transferred Successfully!");

                setShowTransferModal(false);

                setReceiverId("");
                setTransferAmount("");

                loadMyAccount();

            } catch (error) {

                console.log(error);
                alert("Transfer Failed!");

            }
        };


    const loadMyAccount = async () => {

        try {

            const response = await getMyAccount();

            setAccount(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load account.");

        }

    };

    const loadTransactions = async () => {

        try {

            const response = await getMyTransactions();

            setTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <Navbar />


            <div className="container mt-5">

                <div className="text-center mb-4">
                    <h2>👋 Welcome {account?.accountHolderName}</h2>
                    <p className="text-muted">
                        Manage your bank account securely
                    </p>
                </div>

                {
                    account && (

                        <div className="card shadow-lg border-0">

                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">🏦 My Account</h4>
                            </div>

                            <div className="card-body p-4">

                                <div className="row g-4">

                                    <div className="col-md-6 mb-3">
                                        <div className="card shadow h-100 text-center">
                                            <div className="card-body">
                                                <h6>👤 Account Holder</h6>
                                                <h4 className="fw-bold">{account.accountHolderName}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="card shadow h-100 text-center">
                                            <div className="card-body">
                                                <h6>💳 Account Number</h6>
                                                <h4 className="fw-bold">{account.accountNumber}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="card bg-success text-white shadow h-100 text-center">
                                            <div className="card-body">
                                                <h5>💰 Current Balance</h5>
                                                <h1>₹ {account.balance}</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="card bg-info text-white shadow h-100 text-center">
                                            <div className="card-body">
                                                <h6>🟢 Account Status</h6>
                                                <h3>ACTIVE</h3>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mt-4 g-3">

                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-success w-100 py-3"
                                            onClick={() => setShowDepositModal(true)}
                                        >
                                            💰 Deposit
                                        </button>
                                    </div>

                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-warning w-100 py-3"
                                            onClick={() => setShowWithdrawModal(true)}
                                        >
                                            💸 Withdraw
                                        </button>
                                    </div>

                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-primary w-100 py-3"
                                            onClick={() => setShowTransferModal(true)}
                                        >
                                            🔄 Transfer
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>


            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">
                        <h4 className="mb-0">📜 Transaction History</h4>
                    </div>

                    <div className="card-body">

                        <table className="table table-striped table-hover">

                            <thead>

                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                            </tr>

                            </thead>

                            <tbody>

                            {
                                transactions.length === 0 ?

                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No Transactions Found
                                            </td>
                                        </tr>
                                    )

                                    :

                                    transactions.map((transaction, index) => (

                                        <tr key={transaction.id}>

                                            <td>{index + 1}</td>

                                            <td>

                                                {
                                                    transaction.transactionType === "DEPOSIT" ?

                                                        <span className="badge bg-success">
                                                    Deposit
                                                </span>

                                                        :

                                                        transaction.transactionType === "WITHDRAW" ?

                                                            <span className="badge bg-danger">
                                                        Withdraw
                                                    </span>

                                                            :

                                                            <span className="badge bg-primary">
                                                        Transfer
                                                    </span>
                                                }

                                            </td>

                                            <td>
                                                ₹ {transaction.amount}
                                            </td>

                                            <td>{transaction.fromName}</td>

                                            <td>{transaction.toName}</td>

                                            <td>
                                                {
                                                    transaction.transactionDate
                                                        ?
                                                        new Date(transaction.transactionDate).toLocaleString()
                                                        :
                                                        "-"
                                                }
                                            </td>

                                        </tr>

                                    ))

                            }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            <DepositModal
                show={showDepositModal}
                onClose={() => setShowDepositModal(false)}
                amount={depositAmount}
                setAmount={setDepositAmount}
                onDeposit={handleDeposit}
            />
            <WithdrawModal
                show={showWithdrawModal}
                onClose={() => setShowWithdrawModal(false)}
                amount={withdrawAmount}
                setAmount={setWithdrawAmount}
                onWithdraw={handleWithdraw}
            />
            <TransferModal
                show={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                toId={receiverId}
                setToId={setReceiverId}
                amount={transferAmount}
                setAmount={setTransferAmount}
                onTransfer={handleTransfer}
            />
        </>
    );
}

export default UserDashboard;