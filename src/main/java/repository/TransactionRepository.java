package com.bank.bankingmanagementsystem.repository;

import com.bank.bankingmanagementsystem.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
}