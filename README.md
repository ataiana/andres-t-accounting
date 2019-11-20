# Andrés Taiana's Test

**NodeJs/Express restApi for backend**

**Angular 8 and bootstrap for UI**

## Run Project
Run `npm start` on project's root folder. It builds the angular app inside the "/angular" folder and sends the bundle files to "/public" folder which is the default static route of the node server. Both app and api runs on **port 3000**

## API
- GET `/transaction` : Lists all transactions

Response

```javascript
{
    "success": true,
    "result": [
        {
            "id": 1,
            "type": "credit",
            "amount": "444",
            "effectiveDate": "2019-11-20T19:50:43.753Z"
        },
        {
            "id": 2,
            "type": "debit",
            "amount": "22",
            "effectiveDate": "2019-11-20T19:50:51.239Z"
        }
    ]
}
```
- GET `/transaction/:id` : Lists requested transaction

Response:
```javascript
{
    "success": true,
    "result": [
        {
            "id": 1,
            "type": "credit",
            "amount": "444",
            "effectiveDate": "2019-11-20T19:50:43.753Z"
        }
    ]
}
```

- POST `/transaction/` : Inserts new record.
    
    Request Body Params:

    | Param         | Type                         | mandatory  |
    | --------------|----------------------------| ----------|
    | type          | string: 'credit' or 'debit'  | true       |
    | amount        | number                       | true       |

    Response:

    ```javascript
    {
        "success": true,
        "result": {
            "id": 3,
            "type": "credit",
            "amount": "1233",
            "effectiveDate": "2019-11-20T20:12:31.601Z"
        }
    }
    ```
   ### Errors
   If the debit is more than money in account
   ```javascript
   {
        "success": false,
        "result": "You don't have enough money in your account"
    }
    ```

    If the amount is 0 or negative number
    ```javascript
    {
        "success": false,
        "result": "Transaction value cannot be less or equal to 0"
    }
    ```

