function AccountTable({
                          accounts,
                          editAccount,
                          deleteAccount,
                          depositMoney,
                          withdrawMoney,
                          transferMoney,
                      }) {

    return (

        <>
            <h2 className="text-center mt-5 mb-4">
                All Accounts
            </h2>

            <div className="table-responsive mt-4">
                <table className="table table-striped table-hover table-bordered align-middle text-center">

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Account Number</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {accounts.map((account) => (

                    <tr key={account.id}>

                        <td>{account.id}</td>

                        <td>{account.accountHolderName}</td>

                        <td>{account.accountNumber}</td>

                        <td>{account.balance}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2 mb-2"
                                onClick={() => editAccount(account)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm me-2 mb-2"
                                onClick={() => deleteAccount(account.id)}
                            >
                                Delete
                            </button>

                            <button
                                className="btn btn-success btn-sm me-2 mb-2"
                                onClick={() => depositMoney(account.id)}
                            >
                                Deposit
                            </button>

                            <button
                                className="btn btn-secondary btn-sm me-2 mb-2"
                                onClick={() => withdrawMoney(account.id)}
                            >
                                Withdraw
                            </button>

                            <button
                                className="btn btn-info btn-sm mb-2"
                                onClick={() => transferMoney(account.id)}
                            >
                                Transfer
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>
            </div>

        </>

    );

}
export default AccountTable;