import Navbar from "./components/Navbar";
import DepositModal from "./components/DepositModal.jsx";
import WithdrawModal from "./components/WithdrawModal";
import TransferModal from "./components/TransferModal";
import {
    getAllAccounts as getAllAccountsAPI,
    createAccount as createAccountAPI,
    updateAccount as updateAccountAPI,
    deleteAccount as deleteAccountAPI,
    depositMoney as depositMoneyAPI,
    withdrawMoney as withdrawMoneyAPI,
    transferMoney as transferMoneyAPI,
} from "./services/AccountService";
import { useEffect, useState } from "react";
import "./App.css";
import AccountForm from "./components/AccountForm.jsx";
import AccountTable from "./components/AccountTable.jsx";



function App() {
    const [name, setName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [balance, setBalance] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [search, setSearch] = useState("");
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [selectedWithdrawId, setSelectedWithdrawId] = useState(null);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transferAmount, setTransferAmount] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [selectedTransferId, setSelectedTransferId] = useState(null);

    const createAccount = async () => {
        try {
            await createAccountAPI({
                accountHolderName: name,
                accountNumber: accountNumber,
                balance: Number(balance),
            });

            alert("Account Created Successfully!");
            getAllAccounts();


            setName("");
            setAccountNumber("");
            setBalance("");
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const getAllAccounts = async () => {
        try {
            const response = await getAllAccountsAPI();

            setAccounts(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteAccount = async (id) => {
        try {

            await deleteAccountAPI(id);

            alert("Account Deleted Successfully");

            getAllAccounts();

        } catch (error) {
            console.log(error);
        }
    };

    const editAccount = (account) => {
        setSelectedAccount(account);

        setName(account.accountHolderName);
        setAccountNumber(account.accountNumber);
        setBalance(account.balance);
    };

    const updateAccount = async () => {
        try {
            await updateAccountAPI(selectedAccount.id, {
                accountHolderName: name,
                accountNumber: accountNumber,
                balance: Number(balance),
            });

            alert("Account Updated Successfully!");

            getAllAccounts();

            setSelectedAccount(null);
            setName("");
            setAccountNumber("");
            setBalance("");

        } catch (error) {
            console.log(error);
            alert("Update Failed!");
        }
    };

    const depositMoney = (id) => {
        setSelectedAccountId(id);
        setDepositAmount("");
        setShowDepositModal(true);
    };

    const handleDeposit = async () => {
        try {

            await depositMoneyAPI(selectedId, depositAmount);

            alert("Money Deposited Successfully!");

            getAllAccounts();

            setShowDepositModal(false);
            setDepositAmount("");

        } catch (error) {

            console.log(error);
            alert("Deposit Failed!");

        }
    };

    const withdrawMoney = (id) => {
        setSelectedWithdrawId(id);
        setWithdrawAmount("");
        setShowWithdrawModal(true);
    };

    const handleWithdraw = async () => {
        try {

            await withdrawMoneyAPI(selectedWithdrawId, withdrawAmount);

            alert("Money Withdrawn Successfully!");

            setShowWithdrawModal(false);
            setWithdrawAmount("");

            getAllAccounts();

        } catch (error) {

            console.log(error);
            alert("Withdraw Failed!");

        }
    };

    const transferMoney = (id) => {
        setSelectedTransferId(id);
        setReceiverId("");
        setTransferAmount("");
        setShowTransferModal(true);
    };

    const handleTransfer = async () => {
        try {

            await transferMoneyAPI(
                selectedTransferId,
                receiverId,
                transferAmount
            );

            alert("Money Transferred Successfully!");

            setShowTransferModal(false);
            setReceiverId("");
            setTransferAmount("");

            getAllAccounts();

        } catch (error) {

            console.log(error);
            alert("Transfer Failed!");

        }
    };

    useEffect(() => {
        getAllAccounts();
    }, []);

    const filteredAccounts = accounts.filter((account) =>
        account.accountHolderName
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        account.accountNumber
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalAccounts = accounts.length;

    const totalBalance = accounts.reduce(
        (sum, account) => sum + account.balance,
        0
    );

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h1 className="text-center mb-4">🏦 Bank Management System</h1>

                {/* Dashboard */}
                <div className="row mb-4">

                    <div className="col-md-6">
                        <div className="card bg-success text-white shadow">
                            <div className="card-body text-center">
                                <h5>Total Accounts</h5>
                                <h2>{totalAccounts}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card bg-primary text-white shadow">
                            <div className="card-body text-center">
                                <h5>Total Balance</h5>
                                <h2>₹ {totalBalance}</h2>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by Name or Account Number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Form */}
                <AccountForm
                    name={name}
                    setName={setName}
                    accountNumber={accountNumber}
                    setAccountNumber={setAccountNumber}
                    balance={balance}
                    setBalance={setBalance}
                    selectedAccount={selectedAccount}
                    createAccount={createAccount}
                    updateAccount={updateAccount}
                />

                {/* Table */}
                <AccountTable
                    accounts={filteredAccounts}
                    editAccount={editAccount}
                    deleteAccount={deleteAccount}
                    depositMoney={depositMoney}
                    withdrawMoney={withdrawMoney}
                    transferMoney={transferMoney}
                />

                <DepositModal
                    show={showDepositModal}
                    onClose={() => setShowDepositModal(false)}
                    amount={depositAmount}
                    setAmount={setDepositAmount}
                    onDeposit={async () => {
                        try {
                            await depositMoneyAPI(selectedAccountId, depositAmount);

                            alert("Money Deposited Successfully!");

                            setShowDepositModal(false);
                            setDepositAmount("");
                            getAllAccounts();

                        } catch (error) {
                            console.log(error);
                            alert("Deposit Failed!");
                        }
                    }}
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

            </div>
        </>
    );
}

export default App;