package com.bank.bankingmanagementsystem.service;
import com.bank.bankingmanagementsystem.exception.InsufficientBalanceException;
import com.bank.bankingmanagementsystem.repository.TransactionRepository;
import com.bank.bankingmanagementsystem.transaction.Transaction;

import com.bank.bankingmanagementsystem.dto.TransactionResponse;
import java.util.ArrayList;

import java.util.List;

import com.bank.bankingmanagementsystem.entity.Account;
import com.bank.bankingmanagementsystem.repository.AccountRepository;
import org.springframework.stereotype.Service;
import com.bank.bankingmanagementsystem.entity.User;
import com.bank.bankingmanagementsystem.repository.UserRepository;
import java.util.Optional;

@Service
public class AccountService {

    //transaction history
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository,
                          TransactionRepository transactionRepository,
                          UserRepository userRepository) {

        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    // create acc
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }
     // get all acc
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
    //get acc by ID
    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }
    //update account
    public Account updateAccount(Long id, Account updatedAccount) {

        Account account = accountRepository.findById(id).orElse(null);

        if (account != null) {
            account.setAccountHolderName(updatedAccount.getAccountHolderName());
            account.setAccountNumber(updatedAccount.getAccountNumber());
            account.setBalance(updatedAccount.getBalance());

            return accountRepository.save(account);
        }

        return null;
    }
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
    //deposite money
    public Account depositMoney(Long id, double amount) {

        Account account = accountRepository.findById(id).orElse(null);

        if (account != null) {
            account.setBalance(account.getBalance() + amount);
            Transaction transaction = new Transaction();
            transaction.setTransactionType("DEPOSIT");
            transaction.setAmount(amount);

            transaction.setToAccountId(id);
            transaction.setFromName("Bank");
            transaction.setToName("My Account");

            transactionRepository.save(transaction);
            return accountRepository.save(account);
        }

        return null;
    }
    //withdrawn money
    public Account withdrawMoney(Long id, double amount) {

        Account account = accountRepository.findById(id).orElse(null);

        if (account != null && account.getBalance() >= amount) {

            account.setBalance(account.getBalance() - amount);
            Transaction transaction = new Transaction();
            transaction.setTransactionType("WITHDRAW");
            transaction.setAmount(amount);

            transaction.setFromAccountId(id);
            transaction.setFromName("My Account");
            transaction.setToName("Cash");

            transactionRepository.save(transaction);

            return accountRepository.save(account);
        }

        throw new InsufficientBalanceException("Insufficient Balance");
    }
    //transfer money
    public String transferMoney(Long fromId, Long toId, double amount) {

        Account fromAccount = accountRepository.findById(fromId).orElse(null);
        Account toAccount = accountRepository.findById(toId).orElse(null);

        if (fromAccount != null && toAccount != null
                && fromAccount.getBalance() >= amount) {

            fromAccount.setBalance(fromAccount.getBalance() - amount);
            toAccount.setBalance(toAccount.getBalance() + amount);

            accountRepository.save(fromAccount);
            accountRepository.save(toAccount);
            Transaction transaction = new Transaction();
            transaction.setTransactionType("TRANSFER");
            transaction.setAmount(amount);

            transaction.setFromAccountId(fromId);
            transaction.setToAccountId(toId);

            transaction.setFromName("My Account");
            transaction.setToName(toAccount.getAccountHolderName());

            System.out.println("Receiver Name = " + toAccount.getAccountHolderName());
            System.out.println("Transaction ToName = " + transaction.getToName());

            transactionRepository.save(transaction);

            return "Money transferred successfully";
        }

        return "Transfer failed";
    }
    public Account getMyAccount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return accountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public List<TransactionResponse> getMyTransactions(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<Transaction> transactions =
                transactionRepository.findByFromAccountIdOrToAccountId(
                        account.getId(),
                        account.getId()
                );

        List<TransactionResponse> response = new ArrayList<>();

        for (Transaction transaction : transactions) {


            response.add(

                    new TransactionResponse(

                            transaction.getTransactionType(),
                            transaction.getAmount(),
                            transaction.getFromName(),
                            transaction.getToName(),
                            transaction.getTransactionDate()

                    )
            );
        }

        return response;
    }

}