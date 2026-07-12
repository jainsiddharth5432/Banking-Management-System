package com.bank.bankingmanagementsystem.repository;

import com.bank.bankingmanagementsystem.entity.Account;
import com.bank.bankingmanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUser(User user);

}