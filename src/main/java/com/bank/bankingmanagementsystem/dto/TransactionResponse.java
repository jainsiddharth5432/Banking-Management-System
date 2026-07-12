package com.bank.bankingmanagementsystem.dto;

import java.time.LocalDateTime;

public class TransactionResponse {

    private String transactionType;
    private double amount;
    private String fromName;
    private String toName;
    private LocalDateTime transactionDate;

    public TransactionResponse() {
    }

    public TransactionResponse(String transactionType,
                               double amount,
                               String fromName,
                               String toName,
                               LocalDateTime transactionDate) {

        this.transactionType = transactionType;
        this.amount = amount;
        this.fromName = fromName;
        this.toName = toName;
        this.transactionDate = transactionDate;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getFromName() {
        return fromName;
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    public String getToName() {
        return toName;
    }

    public void setToName(String toName) {
        this.toName = toName;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}