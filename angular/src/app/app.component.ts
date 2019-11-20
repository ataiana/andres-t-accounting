import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

export enum Ttype {
    Debit = 'debit',
    Credit = 'credit'
}

export interface Transaction {
    id: number,
    type: Ttype,
    amount: number,
    effectiveDate: string
}

export interface AllTransactions {
    success: boolean,
    result: Transaction[]
}

export interface Balance {
    success: boolean,
    result: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [],
})
export class AppComponent implements OnInit {

    transactions: Transaction[] = [];
    balance = 0;

    constructor(private title: Title, private http: HttpClient) {
        this.title.setTitle('Accounting');
    }

    ngOnInit(): void {
        this.http.get<AllTransactions>('/transaction')
        .subscribe(
            (res: AllTransactions) => this.transactions = res.result
        );

        this.http.get<Balance>('/transaction/balance')
        .subscribe(
            (res: Balance) => this.balance = res.result
        );

    }

}
