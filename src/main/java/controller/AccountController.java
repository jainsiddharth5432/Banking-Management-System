package com.bank.bankingmanagementsystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;

import java.util.List;

import com.bank.bankingmanagementsystem.entity.Account;
import com.bank.bankingmanagementsystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;
    // create acc
    @PostMapping
    public Account createAccount(@Valid @RequestBody Account account) {
        return accountService.createAccount(account);
    }
    //get all Acc
    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }
    //get acc by ID
    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }
    //update acc
    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable Long id,
                                 @RequestBody Account updatedAccount) {

        return accountService.updateAccount(id, updatedAccount);
    }
    //delete acc
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
    }
    //deposite money
    @PostMapping("/{id}/deposit")
    public Account depositMoney(@PathVariable Long id,
                                @RequestParam double amount) {

        return accountService.depositMoney(id, amount);
    }
    //withdrawn money
    @PostMapping("/{id}/withdraw")
    public Account withdrawMoney(@PathVariable Long id,
                                 @RequestParam double amount) {

        return accountService.withdrawMoney(id, amount);
    }
    //transfer money
    @PostMapping("/transfer")
    public String transferMoney(
            @RequestParam Long fromId,
            @RequestParam Long toId,
            @RequestParam double amount) {

        return accountService.transferMoney(fromId, toId, amount);
    }
}