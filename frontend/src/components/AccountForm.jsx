function AccountForm({
                         name,
                         setName,
                         accountNumber,
                         setAccountNumber,
                         balance,
                         setBalance,
                         selectedAccount,
                         createAccount,
                         updateAccount
                     }) {

    return (
        <div className="card">

            <h2>
                {selectedAccount ? "Update Account" : "Create Account"}
            </h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />

            <input
                type="number"
                placeholder="Initial Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
            />

            <button
                onClick={
                    selectedAccount
                        ? updateAccount
                        : createAccount
                }
            >
                {
                    selectedAccount
                        ? "Update Account"
                        : "Create Account"
                }
            </button>

        </div>
    );
}

export default AccountForm;