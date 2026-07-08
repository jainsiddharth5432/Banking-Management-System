function TransferModal({
                           show,
                           onClose,
                           onTransfer,
                           toId,
                           setToId,
                           amount,
                           setAmount,
                       }) {

    if (!show) return null;

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Transfer Money
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">

                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Receiver Account ID"
                            value={toId}
                            onChange={(e) => setToId(e.target.value)}
                        />

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-info"
                            onClick={onTransfer}
                        >
                            Transfer
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default TransferModal;