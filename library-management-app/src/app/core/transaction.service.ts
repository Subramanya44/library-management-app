import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {
    const storedTransactions = localStorage.getItem('transactions');
    this.transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
  }

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.saveToLocalStorage();
  }

  updateTransaction(updated: Transaction): void {
    const index = this.transactions.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      this.transactions[index] = updated;
      this.saveToLocalStorage();
    }
  }

  getBorrowedBooksByUser(userId: number): Transaction[] {
    return this.transactions.filter(
      tx => Number(tx.userId) === Number(userId) && !tx.returnDate
    );
  }

  borrowBook(bookId: number, userId: number): boolean {
    const alreadyBorrowed = this.transactions.some(
      tx => tx.bookId === bookId && tx.userId === userId && !tx.returnDate
    );
  
    if (alreadyBorrowed) {
      return false;
    }
  
    const newTransaction: Transaction = {
      id: this.transactions.length + 1,
      bookId,
      userId,
      borrowedDate: new Date().toISOString(),
      status: 'borrowed',
    };
  
    this.addTransaction(newTransaction);
    return true;
  }
  

  returnBook(bookId: number, userId: number): boolean {
    const transaction = this.transactions.find(
      tx => tx.bookId === bookId && tx.userId === userId && !tx.returnDate
    );
  
    if (!transaction) return false;
  
    transaction.returnDate = new Date().toISOString();
    transaction.status = 'returned';
    this.updateTransaction(transaction);
    return true;
  }
  

  private saveToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  getTransactionsByUser(userId: string): Transaction[] {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return transactions.filter((t: Transaction) => Number(t.userId) === Number(userId));
  }
  
}
